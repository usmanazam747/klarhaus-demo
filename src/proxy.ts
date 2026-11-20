import { NextResponse, type NextRequest } from "next/server";

// Every page lives under /de or /en; anything without a locale goes to German.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (/^\/(de|en)(\/|$)/.test(pathname)) return;
  const wantsEnglish = request.headers.get("accept-language")?.toLowerCase().startsWith("en");
  request.nextUrl.pathname = `/${wantsEnglish ? "en" : "de"}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
