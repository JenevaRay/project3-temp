import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1/codeathon');
console.log(process.env.MONGODB_URI)

const db = mongoose.connection;

export { db };
