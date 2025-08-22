

import express from 'express';
import { Lightup } from '../controllers/Lightup_ai.js';


const lightroute = express.Router();


lightroute.post("/generate-lightup", Lightup);

export default lightroute;
