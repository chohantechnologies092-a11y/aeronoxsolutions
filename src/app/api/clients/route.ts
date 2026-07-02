import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, logo, link } = body;

    if (!name || !logo) {
      return NextResponse.json(
        { error: "Name and logo are required" },
        { status: 400 }
      );
    }

    const newClient = await prisma.client.create({
      data: {
        name,
        logo,
        link: link || null,
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}
