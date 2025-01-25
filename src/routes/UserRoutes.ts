import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { body } from "express-validator";

// User routes
const userRouter = Router();

// Login route
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("name").isString().withMessage("Invalid name").isLength({ min: 3 }),
    body("provider").isString().withMessage("Invalid provider"),
    body("providerId").isString().withMessage("Invalid providerId"),
    body("image").isString().withMessage("Invalid image"),
  ],
  UserController.login
);

// Export the user router
export default userRouter;
