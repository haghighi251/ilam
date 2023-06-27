import { Schema, model, models } from "mongoose";
import { ICityCoordinatesSchema } from "@/utils/types";

const CityCoordinatesSchema = new Schema<ICityCoordinatesSchema>({
  cityCoordinateUnique: {
    type: String,
    required: true,
  },
  cityUnique: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  rowNumber: {
    type: Number,
    required: false,
  },
});

const CityCoordinates =
  models.CityCoordinates ||
  model<ICityCoordinatesSchema>("CityCoordinates", CityCoordinatesSchema);

export default CityCoordinates;
