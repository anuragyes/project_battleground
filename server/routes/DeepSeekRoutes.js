import express from 'express';
import { generateDeepSeek, generateImageDeepSeek} from '../controllers/Deepseek.js';


const Deepseekrouter = express.Router();


Deepseekrouter.post("/generate-deepseek", generateDeepSeek);

Deepseekrouter.post("/generateimgdeepseek", generateImageDeepSeek );

export default  Deepseekrouter;
