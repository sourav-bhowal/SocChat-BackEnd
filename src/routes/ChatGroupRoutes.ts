import { Router } from "express";
import ChatGroupController from "../controllers/ChatGroupController.js";
import { userAuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { body } from "express-validator";

// Chat group routes
const chatGroupRouter = Router();

// Create a chat group
chatGroupRouter.post(
  "/create",
  userAuthMiddleware,
  [
    body("name").isString().withMessage("Invalid name").isLength({ min: 3 }),
    body("description").isString().withMessage("Invalid description"),
    body("password").isString().withMessage("Invalid password"),
  ],
  ChatGroupController.createChatGroup
);

// Get all chat groups
chatGroupRouter.get(
  "/get-all-chat-groups",
  userAuthMiddleware,
  ChatGroupController.getAllChatGroups
);

// Get a chat group by id
chatGroupRouter.get("/:id", userAuthMiddleware, ChatGroupController.getChatGroupById);

// Update a chat group
chatGroupRouter.put("/:id", userAuthMiddleware, ChatGroupController.updateChatGroup);

// Delete a chat group
chatGroupRouter.delete("/:id", userAuthMiddleware, ChatGroupController.deleteChatGroup);

// Export the chat group router
export default chatGroupRouter;
