import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    serverTimestamp,
    orderBy
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ClassSchedule {
    teacherId: string;
    teacherName: string;
    date: string;
    day: string;
    batch: string;
    subject: string;
    time: string;
    // Normalized status for frontend logic
    // REQUEST_TO_COMPLETE added
    status: "Completed" | "Scheduled" | "Upcoming" | "Pending" | "Today" | "Requested";
}

// Helper to normalize date string to YYYY-MM-DD
const getNormalizedDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) return dateStr;
    const dmyMatch = dateStr.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (dmyMatch) {
        const [, d, m, y] = dmyMatch;
        const day = d.padStart(2, '0');
        const month = m.padStart(2, '0');
        return `${y}-${month}-${day}`;
    }
    // Fallback: try standard Date parse
    try {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
            return d.toISOString().split('T')[0];
        }
    } catch (e) { }
    return dateStr;
};

/**
 * Fetch class schedules for a specific teacher via API (Sheets) 
 * AND Firestore (for overrides/requests)
 */
export const getClassesByTeacherId = async (teacherId: string): Promise<ClassSchedule[]> => {
    try {
        // 1. Fetch Request/Status Overrides from Firestore
        // These are actions the teacher or admin took that might not be in Sheets yet
        // OR are pending admin approval
        const firestoreClasses: any[] = [];
        try {
            const classesRef = collection(db, "classes");
            const q = query(classesRef, where("teacherUid", "==", teacherId));
            // We fetch all for this teacher to catch matching overrides
            const snapshot = await getDocs(q);
            snapshot.forEach(doc => firestoreClasses.push(doc.data()));
        } catch (e) {
            console.error("Firestore fetch error (skipping override):", e);
        }

        // 2. Fetch Base Schedule from Sheets API
        // 2. Mock Data Replacement for API (Free Plan Limitation)
        // const response = await fetch('/api/schedule', ...);

        // Mock Response Data
        const result = {
            data: [
                {
                    teacherId: teacherId,
                    teacherName: "Mock Teacher",
                    date: "2026-01-30",
                    day: "Friday",
                    time: "10:00-12:00",
                    batch: "Batch_06",
                    subject: "Test Class (Mock)",
                    status: "Scheduled" as const
                },
                {
                    teacherId: teacherId,
                    teacherName: "Mock Teacher",
                    date: "2026-02-05",
                    day: "Wednesday",
                    time: "14:00-16:00",
                    batch: "Batch_07",
                    subject: "Mock Subject",
                    status: "Scheduled" as const
                }
            ]
        };

        // const result = await response.json();
        let classes: ClassSchedule[] = Array.isArray(result.data) ? result.data : [];

        // 3. Merge & Process Logic based on Date
        const d = new Date();
        const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

        return classes.map(cls => {
            const normalizedDate = getNormalizedDate(cls.date);
            const currentStatusLower = (cls.status || "").toLowerCase().trim();

            // Check if there is a Firestore Override for this specific class slot
            // Matches Date + Time + Batch + Subject (assuming uniqueness)
            const override = firestoreClasses.find(fc =>
                getNormalizedDate(fc.date) === normalizedDate &&
                fc.startTime === cls.time.split('-')[0].trim() && // Match start time approx? 
                // Wait, Sheet time is "10.00-12.00". Firestore split logic needed.
                // Let's rely on Batch + Subject + Date primarily as unique enough for now?
                // Or string match Time?
                // Firestore stores "startTime" separately. Sheet has "Time" range.
                // Let's try exact batch/subject/date match.
                fc.batch === cls.batch &&
                fc.subject === cls.subject
            );

            let computedStatus = "Upcoming";

            // If Firestore status exists, it takes precedence (e.g. REQUEST_TO_COMPLETE, COMPLETED)
            if (override) {
                if (override.status === "REQUEST_TO_COMPLETE") {
                    computedStatus = "Requested";
                } else if (override.status === "COMPLETED") {
                    computedStatus = "Completed";
                } else if (override.status === "PENDING") {
                    // Admin might have "Rejected" (if we used explicit reject) or it's just created.
                    // If it matches Pending logic effectively.
                    computedStatus = "Requested"; // Actually if it is in Firestore as PENDING, it IS requested.
                }
            } else {
                // Default Logic if no override
                if (currentStatusLower === 'completed') {
                    computedStatus = "Completed";
                } else {
                    if (normalizedDate === today) {
                        computedStatus = "Today";
                    } else if (normalizedDate < today) {
                        computedStatus = "Pending";
                    } else {
                        computedStatus = "Upcoming";
                    }
                }
            }

            return {
                ...cls,
                status: computedStatus as any
            };
        }).sort((a, b) => {
            const dateA = getNormalizedDate(a.date);
            const dateB = getNormalizedDate(b.date);
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            return 0;
        });

    } catch (error) {
        console.error("Error fetching class schedule:", error);
        return [];
    }
};

/**
 * Request Admin to Complete a Class
 * Creates a record in Firestore 'classes' collection
 */
export const requestClassCompletion = async (
    teacherId: string,
    teacherName: string,
    scheduleItem: ClassSchedule
) => {
    try {
        const normalizedDate = getNormalizedDate(scheduleItem.date);
        // Extract start/end time from "10.00-12.00" format
        const [start, end] = scheduleItem.time.split(/[-–]/).map(t => t.trim());

        await addDoc(collection(db, "classes"), {
            teacherUid: teacherId,
            teacherName: teacherName,
            date: normalizedDate,
            startTime: start || scheduleItem.time,
            endTime: end || "",
            timeRange: scheduleItem.time, // Exact string from Sheet logic validation
            batch: scheduleItem.batch,
            subject: scheduleItem.subject,
            status: "REQUEST_TO_COMPLETE",
            completedByUid: null,
            completedAt: null,
            createdAt: serverTimestamp()
        });
        return true;
    } catch (error) {
        console.error("Error requesting completion:", error);
        throw error;
    }
};
