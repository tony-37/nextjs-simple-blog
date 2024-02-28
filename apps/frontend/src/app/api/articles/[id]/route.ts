import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: number;
  };
};

// GET SINGLE ARTICLE
export const GET = async (request: NextRequest, { params }: Params) => {
  const { id } = params;
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles/${id}?populate=*`;

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
