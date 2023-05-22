import { Schema, model, models } from "mongoose";
import { ICitiesSchema } from "@/utils/types";

const CitiesSchema = new Schema<ICitiesSchema>({
  citiesUnique: {
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
    required: true,
  },
  speedMax: {
    type: String,
    required: true,
  },
});

const Cities = models.Cities || model<ICitiesSchema>("Cities", CitiesSchema);

export default Cities;
