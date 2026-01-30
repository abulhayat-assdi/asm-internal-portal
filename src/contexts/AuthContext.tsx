"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { AuthContextType, UserProfile } from "@/types/auth";
import * as authService from "@/services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                // Fetch user profile from Firestore
                const profile = await authService.getUserProfile(firebaseUser.uid);
                setUserProfile(profile);
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithEmail = async (email: string, password: string) => {
        setLoading(true);
        try {
            await authService.loginWithEmail(email, password);
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            await authService.loginWithGoogle();
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await authService.logout();
        } finally {
            setLoading(false);
        }
    };

    const sendPasswordReset = async (email: string) => {
        await authService.sendPasswordReset(email);
    };

    const value: AuthContextType = {
        user,
        userProfile,
        loading,
        loginWithEmail,
        loginWithGoogle,
        logout,
        sendPasswordReset,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
