'use client';

import { useRouter } from 'next/navigation';
import {  useState } from 'react';

export default function ReferralWaitlistPage({ params }: { params: { referralId: string } }) {
  const router = useRouter();
  const referralId = params.referralId;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage before redirect
    localStorage.setItem('waitlist_name', name);
    localStorage.setItem('waitlist_email', email);
    localStorage.setItem('referred_by', referralId);

    // Redirect to sign-in
    router.push('/sign-in');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Join the Waitlist</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Continue with Sign In
        </button>
      </form>
    </div>
  );
}
