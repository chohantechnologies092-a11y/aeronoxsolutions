import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { sendLeadNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, websiteUrl, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    // Save to messages collection
    await db.collection("messages").add({
      name,
      email,
      phone: phone || "",
      service: service || "General Inquiry",
      budget: budget || "",
      websiteUrl: websiteUrl || "",
      message,
      createdAt: new Date().toISOString(),
    });

    // Save to leads collection so it also appears under Leads in Admin Panel
    await db.collection("leads").add({
      name,
      email,
      phone: phone || "N/A",
      service: service || "General Inquiry",
      budget: budget || "",
      message: message || "",
      websiteUrl: websiteUrl || "",
      status: "new",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Send email notification
    await sendLeadNotificationEmail({
      name,
      email,
      phone,
      service,
      budget,
      message,
      websiteUrl,
      source: "Website Detailed Contact Form",
    }).catch((err) => console.error("Error triggering lead notification email:", err));

    // Output submission details to server log
    console.log("----------------------------------------");
    console.log("📨 NEW CONTACT FORM SUBMISSION RECEIVED");
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Service: ${service || "N/A"}`);
    console.log(`Budget:  ${budget || "N/A"}`);
    console.log(`Message: ${message}`);
    console.log("----------------------------------------");

    // Success response
    return NextResponse.json(
      { success: true, message: "Contact message processed successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "An internal server error occurred while processing your message." },
      { status: 500 }
    );
  }
}
