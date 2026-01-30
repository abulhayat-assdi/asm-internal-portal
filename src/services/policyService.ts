import { collection, getDocs, addDoc, query, orderBy, Timestamp, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Policy {
    id: string;
    title: string;
    date: string; // Display date string
    version: string;
    fileUrl: string;
    createdAt?: any;
}

export interface MeetingMinute {
    id: string;
    title: string;
    date: string; // Display date string
    meetingNumber: string;
    fileUrl: string;
    createdAt?: any;
}

/**
 * Fetch all policies from Firestore
 */
export const getAllPolicies = async (): Promise<Policy[]> => {
    try {
        const policiesRef = collection(db, "policies");
        const q = query(policiesRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                version: data.version,
                fileUrl: data.fileUrl,
                createdAt: data.createdAt,
                // Use createdAt for date display, fallback to today
                date: data.createdAt?.toDate ? data.createdAt.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            } as Policy;
        });
    } catch (error) {
        console.error("Error fetching policies:", error);
        return [];
    }
};

/**
 * Fetch all meeting minutes from Firestore
 */
export const getAllMeetingMinutes = async (): Promise<MeetingMinute[]> => {
    try {
        const meetingsRef = collection(db, "meeting_minutes");
        const q = query(meetingsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                meetingNumber: data.meetingNumber,
                fileUrl: data.fileUrl,
                createdAt: data.createdAt,
                // Use createdAt for date display, fallback to today
                date: data.createdAt?.toDate ? data.createdAt.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            } as MeetingMinute;
        });
    } catch (error) {
        console.error("Error fetching meeting minutes:", error);
        return [];
    }
};

/**
 * Add a new policy
 */
export const addPolicy = async (data: {
    title: string;
    version: string;
    fileUrl: string;
}): Promise<string> => {
    try {
        const policiesRef = collection(db, "policies");
        const docRef = await addDoc(policiesRef, {
            title: data.title,
            version: data.version,
            fileUrl: data.fileUrl,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding policy:", error);
        throw error;
    }
};

/**
 * Add a new meeting minute
 */
export const addMeetingMinute = async (data: {
    title: string;
    meetingNumber: string;
    fileUrl: string;
}): Promise<string> => {
    try {
        const meetingsRef = collection(db, "meeting_minutes");
        const docRef = await addDoc(meetingsRef, {
            title: data.title,
            meetingNumber: data.meetingNumber,
            fileUrl: data.fileUrl,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding meeting minute:", error);
        throw error;
    }
};

