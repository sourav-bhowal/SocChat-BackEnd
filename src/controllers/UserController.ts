import { Request, Response } from "express";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

// Interface for user data
interface LoginType {
  name: string;
  email: string;
  provider: string;
  providerId: string;
  image?: string;
}

// Class for user controller functions
class UserController {
  // Function to register a new user
  static async login(request: Request, response: Response) {
    // Try to login the user
    try {
      // Get the body of the request
      const body: LoginType = request.body;

      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });

      // If the user exists, return the user
      if (user) {
        // Create a token for the user
        const token = jwt.sign(
          { id: user.id, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        // Return the user and the token
        return response.status(200).json({
          token: `Bearer ${token}`,
          user,
          message: "User logged in successfully",
        });
      }
      // If user does not exist, create a new user
      else {
        const newUser = await prisma.user.create({
          data: body,
        });

        // Create a token for the new user
        const token = jwt.sign(
          { id: newUser.id, email: newUser.email, name: newUser.name },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        // Return the new user and the token
        return response.status(201).json({
          token: `Bearer ${token}`,
          user: newUser,
          message: "User created successfully",
        });
      }
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ message: "Internal server error. Please try again later." });
    }
  }
}

// Export the UserController class
export default UserController;
