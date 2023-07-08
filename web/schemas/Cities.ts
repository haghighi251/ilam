import { Schema, model, models } from "mongoose";
import { ICitiesSchema } from "@/utils/types";

const CitiesSchema = new Schema<ICitiesSchema>({
  cityName: {
    type: String,
    required: true,
    unique: true,
  },
  cityUnique: {
    type: String,
    required: true,
    unique: true,
  },
  provinceUnique: {
    type: String,
    required: true,
  },
  speedMin: {
    type: String,
    required: false,
  },
  speedMax: {
    type: String,
    required: false,
  },
});

const Cities = models.Cities || model<ICitiesSchema>("Cities", CitiesSchema);

export default Cities;
