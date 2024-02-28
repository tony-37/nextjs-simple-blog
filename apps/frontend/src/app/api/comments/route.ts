import { NextRequest, NextResponse } from "next/server";

// GET ALL COMMENTS
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get("articleId");
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments?filters[article][id][$eq]=${articleId}&sort[0]=publishedAt:desc&populate=*`;

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

// CREATE A COMMENT
export const POST = async (request: NextRequest) => {
  try {
    const requestData = await request.json();
    const requestBody = JSON.stringify({ data: requestData });
    const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/comments`;

    const response = await fetch(url, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        identifier: `${process.env.NEXT_AUTH_STRAPI_EMAIL}`,
        password: `${process.env.NEXT_AUTH_STRAPI_PASSWORD}`,
      },
      body: requestBody,
    });
    const responseData = await response.json();

    return new NextResponse(JSON.stringify(responseData));
  } catch (err) {
    return new NextResponse("Something went wrong!");
  }
};
