import express from 'express';
import { generateDeepSeek } from '../controllers/Deepseek.js';


const Deepseekrouter = express.Router();


Deepseekrouter.post("/generate-deepseek", generateDeepSeek);

export default  Deepseekrouter;
