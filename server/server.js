

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
// app.use("/api/chatgpt" ,   requireAuth(),  chatGpt);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});








/*
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { Buffer } from "buffer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.get("/", async (req, res) => {
  res.send("🚀 Express server is running with Clerk + Neon DB!");

})

// POST /api/generate-image
app.post("/api/generate-image", async (req, res) => {

  try {


    const { prompt } = req.body;


    console.log("this is the req bosy ", req.body);

    if (!prompt) {
      console.log("Missing required field: prompt");
      return res.status(400).json({ success: false, message: "Missing required field: prompt" });
    }



    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post("https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5", formData, {
      headers: {

        // 'x-api-key': process.env.HF_API_KEY,
        'x-api-key': process.env.CLIPDROP_API_KEY
      },

      responseType: 'arraybuffer', // receive image data
    });
    s
    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);


    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("Error occurred while generating the image:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
*/
