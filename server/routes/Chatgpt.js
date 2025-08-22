import express from 'express';
import { ChatGPT } from '../controllers/ChatGpt.js';





const chatGpt = express.Router();


chatGpt.post("/generate-ChatGpt", ChatGPT);

export default chatGpt;
