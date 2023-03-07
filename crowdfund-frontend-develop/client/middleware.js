//all the functions here run before route change all happen
import { NextResponse } from "next/server";
import { protectedRoutes, authRoutes } from "./src/constants";
export default function middleware(req) {
  const token = req.cookies.get("token")?.value;
  // (req.nextUrl.pathname.startsWith("/"));
  for (let i = 0; i < protectedRoutes.length; i++) {
    if (req.nextUrl.pathname.startsWith(protectedRoutes[i]) && !token) {
      req.cookies.delete("token");
      const response = NextResponse.redirect(new URL("/login", req.url));
      req.cookies.delete("token");
      return response;
    }
  }
  // if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
  //   req.cookies.delete("token");
  //   const response = NextResponse.redirect(new URL("/login", req.url));
  //   req.cookies.delete("token");
  //   return response;
  // }
  if (authRoutes.includes(req.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
