// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Paths that require an authenticated user
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

// Paths that should be open to everyone (sign-in & sign-up)
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If this is a public page, just continue
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // If it's protected and the user is not signed in, redirect to sign-in
  if (isProtectedRoute(req) && !userId) {
    return redirectToSignIn();
  }

  // Everything else (including static assets, API routes, etc.)
  return NextResponse.next();
});

// Skip Clerk for static files and Next internals
export const config = {
  matcher: [
    // all routes except Next internals & static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // API & TRPC
    "/(api|trpc)(.*)",
  ],
};
