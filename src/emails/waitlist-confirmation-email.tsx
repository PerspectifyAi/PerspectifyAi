import React from 'react';

interface WaitlistConfirmationProps {
  userName: string;
}

export function WaitlistConfirmationEmail({ userName }: WaitlistConfirmationProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px', color: '#333' }}>
      <h1 style={{ color: '#6B46C1', marginBottom: '16px' }}>
        👍 Hi {userName},
      </h1>
      <p style={{ marginBottom: '12px' }}>
        You’ve successfully joined the PerspectifyAI waitlist! We’ll notify you as soon as early access begins.
      </p>
      <p style={{ marginBottom: '12px' }}>
        In the meantime, feel free to join our community on Telegram for sneak peeks:
      </p>
      <a
        href="https://t.me/+KLl14sGMX9lmOGQ9"
        style={{
          display: 'inline-block',
          backgroundColor: '#3182CE',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 600
        }}
      >
        🔗 Join on Telegram
      </a>
    </div>
  );
}
