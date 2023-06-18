import type { APIRoute } from "astro";

export const post: APIRoute = async ({ params, request, cookies }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = (await request.json()) as {
      username: string;
      password: string;
    };
    console.log("🚀 ~ file: auth.ts:6 ~ constpost:APIRoute= ~ body:", body);

    if (
      body.username === import.meta.env.WEB_ADMIN_USERNAME &&
      body.password === import.meta.env.WEB_ADMIN_PASSWORD
    ) {
      cookies.set("authed", "true", {
        expires: new Date(new Date().getTime() + 3600),
      });
      return new Response(
        JSON.stringify({
          status: true,
          message: "Authentication succeed",
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response("Your username / password is wrong", {
        status: 401,
      });
    }
    2;
  }
  return new Response(null, { status: 400 });
};

export const del: APIRoute = ({ params, request, cookies }) => {
  cookies.delete("authed");
  return {
    body: JSON.stringify({
      message: "Logged out",
    }),
  };
};
