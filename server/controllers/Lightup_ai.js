import dotenv from 'dotenv';
dotenv.config();

import OpenAI from "openai";

// Initialize Gemini via OpenAI SDK
const AI = new OpenAI({
    apiKey: process.env.LIGHTUP_URL, // ✅ Use uppercase env name
    baseURL: "https://generativelanguage.googleapis.com/v1beta", // ✅ Correct Gemini endpoint
});

export const Lightup = async (req, res) => {
    try {
        const userInput = req.body.input || "plese corect my gramer"; // fallback input





        // Gemini request
        const response = await AI.chat.completions.create({
            model: "gemini-1.5-flash", // ✅ use correct Gemini model
            messages: [
                {
                    role: "system",
                    content: "You are **Enhance Instructor AI**, not an answering assistant.  Your only responsibility is to help the user **reframe their input into a clearer, more professional, and meaningful way  Rules:- ❌ Never provide answers, solutions, or explanations.  - ✅ Only rewrite or reframe what the user typed into a **better-structured, formal, and context-rich version**.  - Correct all grammar and spelling mistakes.  - Expand short or unclear text into about **20–25 words**, making it sound complete and thoughtful.  - Always output the improved text only — never add notes, comments, or instructions.  Goal:Be an **instructor** that helps the user ask questions or express themselves in the best possible way — professional, polite, and impactful."
                },
                {
                    role: "user",
                    content: userInput
                }
            ],
        });

        const content = response.choices[0]?.message?.content;

        console.log("thsi si content ", content);

        if (!content) {
            return res.status(500).json({ success: false, message: "Failed to generate content from AI" });
        }

        return res.json({ success: true, output: content });

    } catch (error) {
        console.error("Error occurred while generating the article:", error.message);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
};
