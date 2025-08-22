import dotenv from 'dotenv';
dotenv.config();

import OpenAI from "openai";
import sql from "../config/db.js";

export const ChatGPT = async (req, res) => {
    try {
        const { prompt } = req.body;   // ✅ fixed spelling

        const { userId } = req.auth(); // from Clerk auth

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, // ✅ using env
        });

        // ✅ Use chat completion for ChatGPT-like behavior
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini", // you can change model here
            messages: [{ role: "user", content: prompt }],
        });

        const content = response.choices[0]?.message?.content?.trim();

        if (!content) {
            return res.status(500).json({ success: false, message: "Failed to generate content from AI" });
        }

        // ✅ Insert into database
        await sql`
            INSERT INTO student(user_id, prompt, content, type) 
            VALUES(${userId}, ${prompt}, ${content}, 'article')
        `;

        // ✅ Send back response
        res.json({ success: true, content });

    } catch (error) {
        console.error("Error occurred while generating the article:", error.message);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};
