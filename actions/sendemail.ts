"use server";

import { Resend } from "resend";
import { createElement } from "react";
import { ContactFormEmail } from "@/templates/contact-form-email";
import { ContactFormConfirmation } from "@/templates/contact-form-confirmation";
import { z } from "zod";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export async function sendEmail(formData: ContactFormData) {
  // Validate form data
  const validatedFields = contactFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    throw new Error("Invalid form data. Please check your inputs.");
  }

  const { name, email, subject, message } = validatedFields.data;

  try {
    // Send notification email to the admin
    const adminData = await resend.emails.send({
      from: `Contact Form <${
        process.env.RESEND_FROM_EMAIL || "noreply@example.com"
      }>`,
      to: process.env.ADMIN_EMAIL || "nkengbderick@gmail.com",
      subject: `Contact Form Submission: ${subject}`,
      react: createElement(ContactFormEmail, {
        name,
        email,
        subject,
        message,
      }),
    });

    // Send confirmation email to the user
    const userData = await resend.emails.send({
      from: `Nkengbeza Derick <${
        process.env.RESEND_FROM_EMAIL || "noreply@example.com"
      }>`,
      to: email,
      subject: "Thanks for contacting me!",
      react: createElement(ContactFormConfirmation, {
        name,
      }),
    });

    return { success: true, adminData, userData };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
}
