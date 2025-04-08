import React from "react";

interface WelcomeEmailProps {
  userName: string;
}

export default function WelcomeEmail({ userName }: WelcomeEmailProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}>
      <h1>Welcome, {userName} 👋</h1>
      <p>We&apos;re excited to have you on board with <strong>Perspectifi</strong>.</p>
      <p>Let us know if you need anything!</p>
      <p>— The Perspectifi Team</p>
    </div>
  );
}
