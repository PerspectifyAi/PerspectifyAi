import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";
import type { User } from "@prisma/client";

export const checkUser = async (): Promise<User | null> => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    // Create full name safely
    const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ");

    // Create new user
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: fullName,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error);
    return null;
  }
};
