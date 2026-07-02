import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

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

    // Save to database
    await db.collection("messages").add({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    // Output submission details to server log
    console.log("----------------------------------------");
    console.log("📨 NEW CONTACT FORM SUBMISSION RECEIVED");
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
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
