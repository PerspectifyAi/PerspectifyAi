import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY as string,
  characteristics: ["userId"], // Track based on Clerk userId
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // Allow 10 collections per hour
      interval: 3600, // 1 hour
      capacity: 10, // Max burst capacity
    }),
  ],
});

export default aj;
