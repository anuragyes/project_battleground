

import { Buffer } from 'buffer'; // If not globally available
import dotenv from 'dotenv';
dotenv.config();

import OpenAI from "openai";
import axios from 'axios';
import FormData from 'form-data';

import sql from "../config/db.js";
// import fs from 'fs';
// import pdf from 'pdf-parse/lib/pdf-parse.js';
import { clerkClient } from "@clerk/express";

import { v2 as cloudinary } from 'cloudinary'

const AI = new OpenAI({
  apiKey: process.env.GOOGLE_GEMINI_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateGoogle = async (req, res) => {
  try {


    const { prompt } = req.body;

    // Validate input data: Ensure prompt and length are provided
    if (!prompt) {

      return res.status(400).json({ success: false, message: "Missing required fields: prompt" });
    }


    // Your logic for handling the AI request and database insertion
    const { userId } = req.auth(); // Get the user ID from Clerk authentication


    if (!userId) {

      return res.status(400).json({ success: false, message: "User ID not found" });
    };



    // Make the request to the AI API (Google Gemini)
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,

    });

    const content = response.choices[0]?.message?.content; // Safe access to content


    console.log(content)

    if (!content) {

      return res.status(500).json({ success: false, message: "Failed to generate content from AI" });
    }



    // Insert the generated content into the database
    await sql`INSERT INTO student(user_id, prompt, content, type) VALUES(${userId}, ${prompt}, ${content}, 'article')`;


    // Send the generated article back to the user
    res.json({ success: true, content });

  } catch (error) {
    console.error("Error occurred while generating the article:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};








export const generateImage = async (req, res) => {
  try {


    const { prompt } = req.body;

    console.log("this si ", prompt);


    if (!prompt) {
      console.log("Missing required field: prompt");
      return res.status(400).json({ success: false, message: "Missing required field: prompt" });
    }



    const formData = new FormData();
    formData.append('prompt', prompt);

    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
      headers: {

        'x-api-key': process.env.CLIPDROP_API_KEY,
      },

      responseType: 'arraybuffer', // receive image data
    });

    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

      console.log("this is data conentn",data.content)


    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("Error occurred while generating the image:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};




/*








export const generateblog = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Check for missing input
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: prompt",
      });
    }

    const { userId } = req.auth(); // Clerk authentication
    const plan = req.plan;
    let free_usage = req.free_usage;

    // Check usage limit for free users
    if (plan !== 'premium' && free_usage >= 10) {
      return res.status(403).json({
        success: false,
        message: "Limit reached. Upgrade plan to continue.",
      });
    }

    // Call the AI model (Gemini)
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 400,
    });

    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({
        success: false,
        message: "AI failed to generate content.",
      });
    }

    // Save result to DB
    await sql`
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog')
    `;

    // Update usage count
    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.status(200).json({ success: true, content });

  } catch (error) {
    console.error("Error generating blog:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};







export const RemoveImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;

    // Validate image file
    const image = req.file;
    if (!image) {
      console.log("Missing image file");
      return res.status(400).json({ success: false, message: "Missing image file" });
    }

    // Check plan: only premium users can access
    if (plan !== 'premium') {
      console.log("This feature is only available for premium subscriptions.");
      return res.status(403).json({ success: false, message: "Upgrade your plan to use this feature." });
    }

    // Upload the image to Cloudinary with background removal
    const result = await cloudinary.uploader.upload(image.path, {
      transformation: [{
        effect: "background_removal",
        background_removal: "cloudinary_ai" // recommended value by Cloudinary
      }]
    });

    const secure_url = result.secure_url;

    // Save result to DB
    await sql`
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')
    `;

    res.json({ success: true, content: secure_url });

  } catch (error) {
    console.error("Error removing image background:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};






export const RemoveImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;
    const { object } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ success: false, message: "Missing image file" });
    }

    if (!object || typeof object !== 'string') {
      return res.status(400).json({ success: false, message: "Missing or invalid 'object'" });
    }

    if (plan !== 'premium') {
      return res.status(403).json({ success: false, message: "Upgrade your plan to use this feature." });
    }

    // Step 1: Upload image
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      folder: 'object-removal'
    });

    // Step 2: Generate a transformation URL with e_gen_remove
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        { effect: `gen_remove:${object}` }
      ],
      resource_type: 'image',
      secure: true
    });

    // Step 3: Save to DB
    await sql`
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES (
        ${userId},
        ${`Removed object '${object}' from image`},
        ${transformedUrl},
        'image'
      )
    `;

    // Respond with the transformed image URL
    res.json({ success: true, content: transformedUrl });

  } catch (error) {
    console.error("Error removing image object:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};


export const ReviewResume = async (req, res) => {
  try {
    const { userId } = req.auth();
    const plan = req.plan;
    const resume = req.file;

    // Check for resume file
    if (!resume) {
      console.log("Missing resume file");
      return res.status(400).json({ success: false, message: "Missing resume file" });
    }

    // Check for premium access
    if (plan !== 'premium') {
      console.log("This feature is only available for premium subscriptions.");
      return res.status(403).json({ success: false, message: "Upgrade your plan to use this feature." });
    }

    // File size check (5MB max)
    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: "Resume file size exceeds allowed limit (5MB)." });
    }

    // Read the resume file and extract text
    const dataBuffer = fs.readFileSync(resume.path); // Consider using async readFile in production
    const pdfData = await pdf(dataBuffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement.\n\nResume Content:\n\n${pdfData.text}`;

    // Call the AI model (assumes Google Gemini wrapper is setup as AI.chat.completions.create)
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 800,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return res.status(500).json({ success: false, message: "AI failed to generate review." });
    }

    // Save to DB
    await sql`
      INSERT INTO creations(user_id, prompt, content, type)
      VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resumereview')
    `;

    res.json({ success: true, content });

  } catch (error) {
    console.error("Error reviewing resume:", error.message);
    res.status(500).json({ success: false, message: error.message || "Internal server error" });
  }
};
*/