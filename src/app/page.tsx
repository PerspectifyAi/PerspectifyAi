"use client";

import React from "react";
import Header from "@/components/header";
import LandingPage from "@/components/landing-page";

export default function Home() {
  return (
    <>
      <Header />
      {/* Spacer to avoid content being hidden behind fixed header */}
      <div className="-mt-18" />
      <LandingPage />
    </>
  );
}
