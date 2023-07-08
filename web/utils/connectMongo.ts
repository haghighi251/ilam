"use server";
import mongoose from "mongoose";

const connectMongo = async () => mongoose.connect(process.env.MONGO!);

export default connectMongo;
