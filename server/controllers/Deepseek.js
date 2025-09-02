
import axios from "axios";
import FormData from "form-data";
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

import fetch from "node-fetch";
import sql from "../config/db.js"; // your NeonDB client

export const generateDeepSeek = async (req, res) => {
  try {
    // 1️⃣ Validate request body
    if (!req.body) {
      return res.status(400).json({ success: false, message: "Request body is missing" });
    }

    const { prompt } = req.body;
      // const  prompt = "sunrise"

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ success: false, message: "Missing required field: prompt" });
    }

    console.log("Prompt received:", prompt);

    // 2️⃣ Get Clerk user ID
    const { userId } = req.auth?.(); // adjust based on your middleware
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }
    console.log("User ID:", userId);

    // 3️⃣ Call DeepSeek API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("DeepSeek API response:", JSON.stringify(data, null, 2));

    // 4️⃣ Extract content
    let content = null;

    // GPT-style (choices array)
    if (data?.choices?.[0]?.message?.content) {
      content = data.choices[0].message.content;
    }
    // DeepSeek direct message
    else if (data?.message?.content) {
      content = data.message.content;
    }

    if (!content || content.trim() === "") {
      return res.status(500).json({ success: false, message: "Failed to generate content from AI" });
    }

    console.log("Generated content length:", content.length);

    // 5️⃣ Optional: truncate to avoid DB errors
    const safeContent = content.slice(0, 10000); // first 10,000 chars

    // 6️⃣ Insert into DB
    await sql`
      INSERT INTO student(user_id, prompt, content, type) 
      VALUES(${userId}, ${prompt}, ${safeContent}, 'article')
    `;

    // 7️⃣ Return generated content
    res.json({ success: true, content: safeContent });

  } catch (error) {
    console.error("Error generating DeepSeek content:", error);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};



const IMAGINE_API_KEY = process.env.IMAGINE_API_KEY;
export const generateDeepSeekImage = async (req, res) => {
  try {
    const { prompt } = req.body;
   

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("style", "realistic"); // REQUIRED

    const headers = {
      Authorization: `Bearer ${process.env.IMAGINE_API_KEY}`, // ✅ Correct token
      ...formData.getHeaders(),
    };


        console.log("this is api key :" ,process.env.IMAGINE_API_KEY )
    // Axios call
    const response = await axios.post(
      "https://api.vyro.ai/v2/image/generations",
      formData,
      { headers, responseType: "arraybuffer" }
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
