import express from 'express';
import { generateDeepSeek, generateDeepSeekImage, } from '../controllers/Deepseek.js';


const Deepseekrouter = express.Router();


Deepseekrouter.post("/generate-deepseek", generateDeepSeek);

Deepseekrouter.post("/generate_image", generateDeepSeekImage);

export default Deepseekrouter;

``



// PORT ḌEEPSEEK = http://localhost:5000/api/deepseek/generate-deepseek.
//  port to image = http://localhost:5000/api/generate_deep_image/generate_image



// PORT GOOGLETEXT = http://localhost:5000/api/googleai/generate-googleai
//port to generate the image =  http://localhost:5000/api/genterateimg/generate-img