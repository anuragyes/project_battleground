import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

import sql from "../config/db.js";

export const generateDeepSeek = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate input data
    if (!prompt ) {
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
