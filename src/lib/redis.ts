import { createClient } from "redis";

// Initialize Redis client
export const redis = createClient({
  url: process.env.REDIS_URL!,
});

// Log connection errors
redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Log successful connection
redis.on("connect", () => {
  console.log("Successfully connected to Redis");
});
