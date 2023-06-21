import { Schema, model, models } from "mongoose";
import { IDriversSchema } from "@/utils/types";

const DriversSchema = new Schema<IDriversSchema>({
  driverUnique: {
    type: String,
    required: true,
    unique: true,
  },
  schoolUniqueId: [
    {
      type: String,
      required: true,
      unique: true,
    },
  ],
  schoolAdminUnique: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    default: null,
  },
});

const Drivers =
  models.Drivers || model<IDriversSchema>("Drivers", DriversSchema);

export default Drivers;
