

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import googleRoute from "./routes/Google_api_route.js";
import deepseekRoute from "./routes/DeepSeekRoutes.js";
// import chatGpt from "./routes/Chatgpt.js";
import lightroute from "./routes/Light.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // frontend URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Clerk middleware
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Express server is running with Clerk + Neon DB!");
});

// Protected AI routes
app.use("/api/googleai", requireAuth(), googleRoute);
app.use("/api/deepseek", requireAuth(), deepseekRoute);
app.use("/api/lightup", requireAuth(), lightroute);
// app.use("/api/chatgpt" ,   requireAuth(),  chatGpt);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});


// /api/lightup/generate-lightup