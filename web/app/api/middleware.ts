'use server';
import connectMongo from '@/utils/connectMongo';

const mongoose = require('mongoose');

// This middleware checks if there is an active connection to the mongoDb by mongoose.
export async function middleware() {
   if (mongoose.connection.readyState !== 1) await connectMongo();
}
