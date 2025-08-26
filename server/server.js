

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import googleRoute from "./routes/Google_api_route.js";
import deepseekRoute from "./routes/DeepSeekRoutes.js";
// import chatGpt from "./routes/Chatgpt.js";
import lightroute from "./routes/Light.js";
import connectCloudinary from "./config/cloudinary.js";
import Deepseekrouter from "./routes/DeepSeekRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//  conmnect to cloudninary 
await connectCloudinary();



app.use(clerkMiddleware());
// Root route
app.get("/", (req, res) => {
  res.send("🚀 Express server is running with Clerk + Neon DB!");
});

app.use(requireAuth());

// Protected AI routes
app.use("/api/googleai", requireAuth(), googleRoute);
app.use("/api/genterateimg", requireAuth(), googleRoute);




app.use("/api/genteratedeepseekimg", requireAuth(), Deepseekrouter);
app.use("/api/deepseek", requireAuth(), deepseekRoute);
app.use("/api/lightup", requireAuth(), lightroute);
app.use("/api/generate_deep_image", requireAuth(), Deepseekrouter);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});

/*
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const IMAGINE_API_KEY = process.env.IMAGINE_API_KEY;

app.post("/generate-image", async (req, res) => {
  const prompt = req.body.prompt || "A city in space";

  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("style", "realistic");
    formData.append("aspect_ratio", "1:1");

    const headers = {
      Authorization: `Bearer ${IMAGINE_API_KEY}`,
      ...formData.getHeaders(),
    };

    const response = await axios({
      method: "post",
      url: "https://api.vyro.ai/v2/image/generations",
      data: formData,
      headers,
      responseType: "arraybuffer", // Important for image bytes
    });

    // Convert to base64
    const base64Image = Buffer.from(response.data, "binary").toString("base64");
    const imageUrl = `data:image/png;base64,${base64Image}`;

    res.json({ success: true, url: imageUrl });
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      error: err.response?.data || err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
*/