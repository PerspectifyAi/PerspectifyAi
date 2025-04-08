"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4 text-center">
      <h1 className="text-[5rem] md:text-[8rem] font-extrabold text-blue-600 dark:text-blue-500 leading-none">
        404
      </h1>
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
        Oops! Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400 md:text-lg">
        The page you’re looking for doesn’t exist or has been moved. Please check the URL or return to the homepage.
      </p>

      <Link href="/" className="mt-6">
        <button className="group px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 rounded-md transition duration-200">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200 cursor-pointer" />
          Return to Home
        </button>
      </Link>

    </div>
  );
};

export default NotFound;
