import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

// Controller for chat groups
class ChatGroupController {
  // Create a chat group
  static async createChatGroup(request: Request, response: Response) {
    try {
      // Get the body of the request
      const body = request.body;
      // Get the user from the request
      const user = request.user;

      // If the user is not present, return an error
      if (!user) {
        return response.status(401).json({ message: "Unauthorized" });
      }

      // Create the chat group
      const chatGroup = await prisma.chatGroup.create({
        data: {
          name: body.name,
          description: body.description,
          password: body.password,
          userId: user.id,
        },
      });

      // Return the chat group
      return response.status(201).json({
        message: "Chat group created successfully",
        chatGroup,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Internal server error. Failed to create chat group.",
        error: error,
      });
    }
  }

  // Get all chat groups
  static async getAllChatGroups(request: Request, response: Response) {
    try {
      const chatGroups = await prisma.chatGroup.findMany({
        where: {
          userId: request.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return response
        .status(200)
        .json({ chatGroups, message: "Chat groups fetched successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  // Get a chat group by id
  static async getChatGroupById(request: Request, response: Response) {
    try {
      const chatGroup = await prisma.chatGroup.findUnique({
        where: { id: request.params.id },
      });
      return response
        .status(200)
        .json({ chatGroup, message: "Chat group fetched successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  // Update a chat group
  static async updateChatGroup(request: Request, response: Response) {
    try {
      const chatGroup = await prisma.chatGroup.update({
        where: { id: request.params.id },
        data: request.body,
      });
      return response
        .status(200)
        .json({ chatGroup, message: "Chat group updated successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete a chat group
  static async deleteChatGroup(request: Request, response: Response) {
    try {
      const chatGroup = await prisma.chatGroup.delete({
        where: { id: request.params.id },
      });
      return response
        .status(200)
        .json({ chatGroup, message: "Chat group deleted successfully" });
    } catch (error) {
      return response.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ChatGroupController;
