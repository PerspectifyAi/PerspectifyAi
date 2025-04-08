'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, User, PenLine } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
});

export default function PartnerPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: unknown) => {
    console.log('Form submitted:', data);
    alert('Thank you for reaching out!');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-20">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-purple-400 via-white to-purple-600 bg-clip-text text-transparent">
          Partner With Us
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#1a1a1a] p-8 rounded-2xl border border-purple-500/10 shadow-lg space-y-6"
        >
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-purple-300 flex items-center gap-2">
              <User className="h-4 w-4" /> Full Name
            </label>
            <Input
              {...register('name')}
              placeholder="Jane Doe"
              className="bg-[#0f0f0f] border border-purple-500/20 focus:border-purple-500 text-white placeholder-gray-500 pl-4 py-2 rounded-xl transition focus:ring-0"
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-purple-300 flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email
            </label>
            <Input
              {...register('email')}
              placeholder="you@example.com"
              className="bg-[#0f0f0f] border border-purple-500/20 focus:border-purple-500 text-white placeholder-gray-500 pl-4 py-2 rounded-xl transition focus:ring-0"
            />
            {errors.email && (
              <p className="text-red-400 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-purple-300 flex items-center gap-2">
              <PenLine className="h-4 w-4" /> Why do you want to partner with us?
            </label>
            <Textarea
              {...register('message')}
              placeholder="Tell us about your ideas, goals, or collaboration vision..."
              rows={5}
              className="bg-[#0f0f0f] border border-purple-500/20 focus:border-purple-500 text-white placeholder-gray-500 pl-4 pt-3 rounded-xl transition focus:ring-0"
            />
            {errors.message && (
              <p className="text-red-400 text-xs">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 transition text-white font-semibold text-base py-3 rounded-xl cursor-pointer"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Partnership Request'}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
