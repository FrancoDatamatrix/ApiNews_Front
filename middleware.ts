import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("csrf_access_token")?.value;

  if (currentUser && request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/app", request.url));
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/app/login", request.url));
  }

  // Allow the request to proceed if none of the above conditions match
  return NextResponse.next();
}

export const config = {
  matcher: ["/register", "/"], // Ajusta las rutas según tu aplicación
};
