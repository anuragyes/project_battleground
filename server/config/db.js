// import dotenv from 'dotenv';
// dotenv.config(); // Load environment variables


// import { neon } from '@neondatabase/serverless';

// const sql = neon(`${process.env.DATABASE_URL}`);  // Using the DATABASE_URL from .env

// export default sql;


import dotenv from 'dotenv';
dotenv.config(); // Must be at the very top

import { neon } from '@neondatabase/serverless';


  console.log("Loaded DATABASE_URL:", process.env.DATABASE_NEON);

if (!process.env.DATABASE_NEON) {
  throw new Error("DATABASE_NEON is not defined in .env");
}

const sql = neon(process.env.DATABASE_NEON);

export default sql;
