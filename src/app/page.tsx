"use client";

import { useEffect } from "react";
import Header from "@/components/header"; // Your Header component
import LandingPage from "@/components/landing-page"; // Your LandingPage component

export default function Home() {
  useEffect(() => {
    // Extract the referral code from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    // If a referral code is found in the URL, store it in localStorage
    if (ref) {
      localStorage.setItem("referralCode", ref);
    }
  }, []); // This will run once when the component mounts

  return (
    <>
      {/* Header component which might contain navigation, logo, etc. */}
      <Header />

      {/* Spacer to avoid content being hidden behind fixed header */}
      <div className="-mt-13" />

      {/* LandingPage component which contains your page content */}
      <LandingPage />
    </>
  );
}
