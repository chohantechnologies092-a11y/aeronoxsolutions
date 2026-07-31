import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, referrer } = body;

    // We can extract IP and basic Geo location from Vercel headers if deployed on Vercel
    // Or headers from standard proxies
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const country = request.headers.get("x-vercel-ip-country") || "Unknown";
    const city = request.headers.get("x-vercel-ip-city") || "Unknown";
    const region = request.headers.get("x-vercel-ip-country-region") || "Unknown";

    // Skip tracking for admin routes or local dev if desired
    if (path?.startsWith("/admin")) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const event = {
      path: path || "/",
      referrer: referrer || "",
      ip: ip.split(",")[0], // sometimes x-forwarded-for is a comma separated list
      country: decodeURIComponent(country),
      city: decodeURIComponent(city),
      region: decodeURIComponent(region),
      timestamp: new Date().toISOString(),
    };

    // Store in Firestore
    await db.collection("analytics_events").add(event);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking Error:", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
