"use server";

import { Resend } from "resend";
import { createElement } from "react";
import { NewsletterSubscriptionEmail } from "@/templates/newsletter-subscription";
import { z } from "zod";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the newsletter subscription schema
const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function subscribeToNewsletter(email: string) {
  // Validate email
  const validatedFields = newsletterSchema.safeParse({ email });

  if (!validatedFields.success) {
    throw new Error("Invalid email address. Please check your input.");
  }

  const { email: validatedEmail } = validatedFields.data;

  try {
    // Here you might want to add the email to your newsletter database or service
    // For example, you could use a service like Mailchimp, ConvertKit, etc.
    // This is a placeholder for that functionality
    console.log(`Subscribing ${validatedEmail} to newsletter`);

    // For demonstration purposes, we'll just send a confirmation email
    const data = await resend.emails.send({
      from: `Nkengbeza Derick <${
        process.env.RESEND_FROM_EMAIL || "noreply@example.com"
      }>`,
      to: validatedEmail,
      subject: "Welcome to my Newsletter!",
      react: createElement(NewsletterSubscriptionEmail, {
        email: validatedEmail,
      }),
    });

    return { success: true, data };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw new Error("Failed to subscribe. Please try again later.");
  }
}
