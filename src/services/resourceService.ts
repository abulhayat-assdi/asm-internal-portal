import { collection, getDocs, addDoc, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Resource {
    id: string; // Firestore Doc ID
    title: string;
    category: "Course Module" | "Class Routine" | "Notes" | "Assignment" | "Exam / Practice";
    uploadedByUid: string;
    uploadedByName: string;
    uploadDate: string; // Formatting to string for UI, or keep as Date object? UI expects string.
    createdAt: any; // Firestore Timestamp
    description?: string;
    fileUrl: string;
}

/**
 * Fetch all resources from Firestore
 */
export const getAllResources = async (): Promise<Resource[]> => {
    try {
        const resourcesRef = collection(db, "resources");
        const q = query(resourcesRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                category: data.category,
                uploadedByUid: data.uploadedByUid,
                uploadedByName: data.uploadedByName,
                description: data.description,
                fileUrl: data.fileUrl,
                createdAt: data.createdAt,
                // Convert timestamp to readable date string for initial UI requirement
                uploadDate: data.createdAt?.toDate ? data.createdAt.toDate().toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
            } as Resource;
        });
    } catch (error) {
        console.error("Error fetching resources:", error);
        return [];
    }
};

/**
 * Add a new resource to Firestore
 */
export const addResource = async (resource: Omit<Resource, "id" | "uploadDate" | "createdAt">): Promise<string> => {
    try {
        const resourcesRef = collection(db, "resources");
        const docRef = await addDoc(resourcesRef, {
            ...resource,
            createdAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding resource:", error);
        throw error;
    }
};
