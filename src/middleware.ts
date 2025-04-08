import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes using Clerk's matcher
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
  // Add more protected paths below if needed
  // "/budget(.*)",
  // "/settings(.*)",
]);

// Clerk middleware for route protection
export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // Redirect to sign-in if the user is not authenticated and route is protected
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // Allow request to proceed
  return NextResponse.next();
});

// Middleware matcher config to skip static/internal assets
export const config = {
  matcher: [
    // Run for all routes except Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always include API routes
    "/(api|trpc)(.*)",
  ],
};
