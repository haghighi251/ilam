import { Schema, model, models } from "mongoose";
import { ILocationsSchema } from "@/utils/types";

const LocationsSchema = new Schema<ILocationsSchema>({
  driverUnique: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  speed: {
    type: String,
  },
});

const Locations =
  models.Locations || model<ILocationsSchema>("Locations", LocationsSchema);

export default Locations;
