import { NextRequest, NextResponse } from "next/server";

// GET ALL ARTICLES
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const pageSize = searchParams.get("pageSize");

  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?pagination[pageSize]=${pageSize}&populate=*`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        identifier: `${process.env.NEXT_AUTH_STRAPI_EMAIL}`,
        password: `${process.env.NEXT_AUTH_STRAPI_PASSWORD}`,
      },
    });
    const responseData = await response.json();

    return new NextResponse(JSON.stringify(responseData));
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
    );
  }
};
