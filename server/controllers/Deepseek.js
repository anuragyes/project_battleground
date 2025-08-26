

import FormData from "form-data"; // correct Node.js FormData
import fetch from "node-fetch";
import axios from "axios";
dotenv.config();
import { Buffer } from 'buffer'; // If not globally available
import dotenv from 'dotenv';
dotenv.config();

import sql from "../config/db.js";
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






/*






const IMAGINE_API_KEY = process.env.IMAGINE_API_KEY;
export const generateDeepSeekImage = async (req, res) => {
  try {

     const { prompt } = req.body;
      console.log("this si ", prompt);
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("style", "realistic");
    formData.append("aspect_ratio", "1:1");

     if (!prompt) {
      console.log("Missing required field: prompt");
      return res.status(400).json({ success: false, message: "Missing required field: prompt" });
    }


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
*/



const IMAGINE_API_KEY = process.env.IMAGINE_API_KEY;

export const generateDeepSeekImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("style", "realistic");       // REQUIRED   

    const headers = {
      Authorization: `Bearer ${IMAGINE_API_KEY}`,
      ...formData.getHeaders(),
    };

    // Axios call
    const response = await axios.post(
      "https://api.vyro.ai/v2/image/generations",
      formData,
      { headers, responseType: "arraybuffer" }  // get raw image bytes
    );

    // Convert raw bytes to base64 for Cloudinary
    const base64Image = `data:image/png;base64,${Buffer.from(response.data, "binary").toString("base64")}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64Image);

    res.json({ success: true, url: uploadResult.secure_url });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: error.response?.data?.message || error.message });
  }
};
