import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
export const userAuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // Get the token from the request headers
  const token = request.headers.authorization?.split(" ")[1]; // Bearer <token> so we split by space and get the token

  // If the token is not present, return an error
  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  // If the token is invalid, return an error
  if (!decodedToken) {
    return response.status(401).json({ message: "Unauthorized. Invalid token." });
  }

  // If the token is valid, add the user to the request object
  request.user = decodedToken

  // Call the next middleware
  next();
};
