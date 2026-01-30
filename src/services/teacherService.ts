import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Teacher {
    id: string; // Firestore Doc ID
    teacherId: string; // Custom ID like ID-101
    name: string;
    designation: string;
    about: string;
    phone: string;
    email: string;
    profileImageUrl?: string;
    isAdmin: boolean;
}

/**
 * Fetch all teachers from Firestore
 */
export const getAllTeachers = async (): Promise<Teacher[]> => {
    try {
        const teachersRef = collection(db, "teachers");
        const snapshot = await getDocs(teachersRef);

        const teachers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Teacher));

        // Sort by name client-side to avoid Firestore index requirements
        return teachers.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }
};

/**
 * Add a new teacher to Firestore
 */
export const addTeacher = async (data: {
    teacherId: string;
    name: string;
    designation: string;
    about: string;
    phone: string;
    email: string;
    profileImageUrl?: string;
    isAdmin?: boolean;
}): Promise<string> => {
    try {
        const teachersRef = collection(db, "teachers");
        const docRef = await addDoc(teachersRef, {
            teacherId: data.teacherId,
            name: data.name,
            designation: data.designation,
            about: data.about || "",
            phone: data.phone,
            email: data.email,
            profileImageUrl: data.profileImageUrl || "",
            isAdmin: data.isAdmin || false,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding teacher:", error);
        throw error;
    }
};

/**
 * Update an existing teacher in Firestore
 */
export const updateTeacher = async (
    id: string,
    data: Partial<Omit<Teacher, 'id'>>
): Promise<void> => {
    try {
        const teacherRef = doc(db, "teachers", id);
        await updateDoc(teacherRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("Error updating teacher:", error);
        throw error;
    }
};

/**
 * Delete a teacher from Firestore
 */
export const deleteTeacher = async (id: string): Promise<void> => {
    try {
        const teacherRef = doc(db, "teachers", id);
        await deleteDoc(teacherRef);
    } catch (error) {
        console.error("Error deleting teacher:", error);
        throw error;
    }
};


