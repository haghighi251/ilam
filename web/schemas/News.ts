import { Schema, model, models } from "mongoose";
import { INewsSchema } from "@/utils/types";

const NewsSchema = new Schema<INewsSchema>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const News = models.News || model<INewsSchema>("News", NewsSchema);

export default News;
