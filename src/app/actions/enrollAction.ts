"use server";

import nodemailer from "nodemailer";

interface EnrollFormData {
    name: string;
    phone: string;
    email: string;
    district: string;
    education: string;
    institute: string;
    interest: string;
}

export async function submitEnrollment(formData: EnrollFormData) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        console.warn("SMTP environment variables not set. Printing to console instead.");
        console.log("Enrollment Submission:", formData);
        return { success: true, message: "Enrollment received! (Dev mode: Check console)" };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email to Admin
        await transporter.sendMail({
            from: `"ASM Portal" <${process.env.SMTP_USER}>`,
            to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Default to sender if admin not set
            subject: `New Enrollment: ${formData.name}`,
            html: `
                <h1>New Student Enrollment</h1>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>District:</strong> ${formData.district}</p>
                <p><strong>Education:</strong> ${formData.education}</p>
                <p><strong>Institute:</strong> ${formData.institute}</p>
                <p><strong>Interest:</strong><br>${formData.interest}</p>
            `,
        });

        return { success: true, message: "Application submitted successfully!" };
    } catch (error: any) {
        console.error("Failed to send email:", error);
        // Exposing error to client for debugging
        return { success: false, message: `Failed: ${error.message}` };
    }
}
