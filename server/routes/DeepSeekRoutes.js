import express from 'express';
import { generateDeepSeek, generateDeepSeekImage, } from '../controllers/Deepseek.js';


const Deepseekrouter = express.Router();


Deepseekrouter.post("/generate-deepseek", generateDeepSeek);

Deepseekrouter.post("/generate_image", generateDeepSeekImage);

export default Deepseekrouter;
