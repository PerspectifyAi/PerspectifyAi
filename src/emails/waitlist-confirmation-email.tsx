import React from 'react';

interface WaitlistConfirmationProps {
  userName: string;
}

export function WaitlistConfirmationEmail({ userName }: WaitlistConfirmationProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px', color: '#333', lineHeight: 1.6 }}>
      <h1 style={{ color: '#6B46C1', marginBottom: '16px' }}>
        You weren’t meant to be average—and neither was your money. 💸
      </h1>
      <p>Welcome, {userName}.</p>
      <p>
        You didn’t just join a waitlist. You stepped into a system built to reprogram how you think, move,
        and win with money.
      </p>
      <p>
        At <strong>PerspectifyAI</strong>, we don’t hand out tips—we build new identities.
      </p>
      <p>
        This isn’t financial advice. It’s behavioural transformation backed by AI mentorship, psychology,
        and execution systems.
      </p>
      <p>
        This is the groundwork. From here on, every move becomes more strategic, more intentional—and more powerful.
      </p>
      <p><strong>Let’s raise the standard. 🔑</strong></p>
      <p>
        <em>P.S. This is just the beginning. Stay locked in—we’ll be rewarding early action in ways most people won’t see coming. 🚀</em>
      </p>

      <h3 style={{ marginTop: '30px', marginBottom: '10px' }}>Follow us and stay in the loop:</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li>
          📸 <a href="https://www.instagram.com/perspectifyai?igsh=ZTFiZzduYzZjdGk0&utm_source=qr" style={{ color: '#3182CE', textDecoration: 'none' }}>Instagram</a>
        </li>
        <li>
          🎥 <a href="https://www.tiktok.com/@chris.perspectifier?_t=ZN-8wWMUr8EfZ8&_r=1" style={{ color: '#3182CE', textDecoration: 'none' }}>TikTok</a>
        </li>
        <li>
          💼 <a href="https://www.linkedin.com/company/perspectifyai/" style={{ color: '#3182CE', textDecoration: 'none' }}>LinkedIn (Company)</a>
        </li>
        <li>
          👤 <a href="https://www.linkedin.com/in/isaiah-williams-1443a628b" style={{ color: '#3182CE', textDecoration: 'none' }}>Isaiah Williams</a> | 
          <a href="https://www.linkedin.com/in/christopher-tate-367915302" style={{ color: '#3182CE', marginLeft: '8px', textDecoration: 'none' }}>Christopher Tate</a>
        </li>
        <li>
          🐦 <a href="https://x.com/perspectifyai?s=21" style={{ color: '#3182CE', textDecoration: 'none' }}>X (Twitter)</a>
        </li>
      </ul>
      <p style={{ marginTop: '20px', fontStyle: 'italic' }}>
        — Isaiah + Chris<br />
        Founders of PerspectifyAI
      </p>
    </div>
  );
}
