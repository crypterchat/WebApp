import { NextRequest, NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';

export async function GET(request: NextRequest) {
  try {
    // 1. Extract API key from the Authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized. Missing or invalid Authorization header. Use 'Bearer <API_KEY>'" },
        { status: 401 }
      );
    }

    const apiKey = authHeader.split(" ")[1];

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }
    const sql = neon(process.env.DATABASE_URL);

    // 2. Query Neon PostgreSQL to validate the API key
    const result = await sql`SELECT uid, status FROM api_keys WHERE key = ${apiKey} LIMIT 1`;

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Unauthorized. Invalid API Key." },
        { status: 401 }
      );
    }

    // 3. Check if the key is active
    const keyData = result[0];
    if (keyData.status !== "active") {
      return NextResponse.json(
        { error: "Forbidden. API Key is inactive or revoked." },
        { status: 403 }
      );
    }

    // 4. Return protected data
    return NextResponse.json({
      message: "Success! You have accessed a protected route.",
      data: {
        ownerUid: keyData.uid,
        keyStatus: keyData.status,
        timestamp: new Date().toISOString(),
        secretInfo: "This is some top-secret information only available to valid API keys.",
      },
    });

  } catch (error) {
    console.error("Error validating API key:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
