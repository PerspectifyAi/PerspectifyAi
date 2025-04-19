import React from "react";

interface WelcomeEmailProps {
  userName: string;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6", color: "#333" }}>
      <h1>Welcome, {userName} 👋</h1>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        We’re not another finance app. We’re a framework for transformation.
      </p>
      <p style={{ fontSize: "16px" }}>
        <strong>Master Your Money. Rewire Your Habits. Transform Your Reality.</strong>
      </p>
      <p style={{ fontSize: "14px" }}>
        <strong>PERSPECTIFYAI</strong><br />
        Set goals, track progress, learn faster, and grow — all guided by intelligent tools designed for real-world impact.
      </p>

      <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #ccc" }} />

      <p>We&apos;re excited to have you on board with <strong>Perspectifi</strong>.</p>
      <p>Let us know if you need anything!</p>

      <p>
        👉 <a href="https://www.perspectifyai.com/waitlist" style={{ color: "#0070f3", textDecoration: "none" }}>
          Join our waitlist</a> to get early-bird offers, exclusive perks, and exciting rewards!
      </p>

      <hr style={{ margin: "24px 0", border: "none", borderTop: "1px solid #ccc" }} />

      <p><strong>Talk to the Founders:</strong> <a href="mailto:Founders@Perspectifyai.com">Founders@Perspectifyai.com</a></p>
      <p><strong>Partner with us:</strong> <a href="mailto:Partners@Perspectifyai.com">Partners@Perspectifyai.com</a></p>
      <p><strong>Contact support:</strong> <a href="mailto:Support@Perspectifyai.com">Support@Perspectifyai.com</a></p>
      <p><strong>Community support:</strong> <a href="mailto:Community@Perspectifyai.com">Community@Perspectifyai.com</a></p>

      <p style={{ marginTop: "32px" }}>— The Perspectifi Team</p>
    </div>
  );
};
