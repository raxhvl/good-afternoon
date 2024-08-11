import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({
    name: "Music of the Spheres NFT",
    description: "A Good afternoon on chain experiment",
    image: "https://good-afternoon.vercel.app/ticket.jpg",
    external_url: "https://good-afternoon.vercel.app/ticket.jpg",
    creator: "John Doe",
    created_at: "2024-08-10T12:00:00Z",
  });
}
