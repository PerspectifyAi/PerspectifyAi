import { Inngest } from "inngest";

// Create a new instance of Inngest with proper types
export const inngest = new Inngest({
  id: "finance-platform", // Unique app ID
  name: "PERSPECTIFYAI",
  retryFunction: async (attempt: number): Promise<{ delay: number; maxAttempts: number }> => ({
    delay: Math.pow(2, attempt) * 1000, 
    maxAttempts: 2,
  }),
});
