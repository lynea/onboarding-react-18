import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();

  const password = req.cookies.get("onboarding_auth");

  const isApiRoute = url.pathname.includes("/api");

  const desiredPassword = process.env.PASSWORD;

  if (
    password !== desiredPassword &&
    !isApiRoute &&
    !url.pathname.includes("login")
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (
    password === desiredPassword &&
    !isApiRoute &&
    url.pathname.includes("login")
  ) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/login",
};
