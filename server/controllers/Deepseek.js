
import fs from "fs";

import fetch from "node-fetch";
import axios from "axios";
dotenv.config();
import { Buffer } from 'buffer'; // If not globally available
import dotenv from 'dotenv';
dotenv.config();

import sql from "../config/db.js";
// import fs from 'fs';
// import pdf from 'pdf-parse/lib/pdf-parse.js';
import { clerkClient } from "@clerk/express";

import { v2 as cloudinary } from 'cloudinary'

export const generateDeepSeek = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate input data
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Missing required fields: prompt and length" });
    }



    // Get Clerk user ID
    const { userId } = req.auth();


    if (!userId) {

      return res.status(400).json({ success: false, message: "User ID not found" });
    }

    // Fetch DeepSeek response
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        // "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,

      }),
    });

    const data = await response.json();


    // Extract content properly (DeepSeek vs GPT-style)
    const choice = data?.choices?.[0];
    let content = null;

    if (choice?.message?.content && choice.message.content.trim() !== "") {
      content = choice.message.content;
    } else if (choice?.message?.reasoning) {
      content = choice.message.reasoning;
    }



    if (!content) {
      return res.status(500).json({ success: false, message: "Failed to generate content from AI" });
    }

    // Insert into DB
    await sql`
      INSERT INTO student(user_id, prompt, content, type) 
      VALUES(${userId}, ${prompt}, ${content}, 'article')
    `;

    res.json({ success: true, content });
  } catch (error) {
    console.error("Error occurred while generating the article:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};












export const generateImageDeepSeek = async (req, res) => {
  try {
    const { prompt } = req.body;
    const { userId } = req.auth();

    // if (!prompt || !userId) {
    //   return res.status(400).json({ success: false, message: "Missing prompt or userId" });
    // }

      console.log("this is prompt",prompt)

    // Call Hugging Face
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
        responseType: "arraybuffer",
      }
    );

      console.log("this is an api key ", process.env.HF_API_KEY)
    const contentType = response.headers["content-type"];
    if (contentType.includes("application/json")) {
      const errorMsg = JSON.parse(response.data.toString());
      throw new Error(errorMsg.error);
    }

    // Convert to base64
    const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;

    // Optional: upload to Cloudinary
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    // Optional: insert into DB
    // await sql`INSERT INTO student(user_id, prompt, content, type) VALUES(${userId}, ${prompt}, ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};