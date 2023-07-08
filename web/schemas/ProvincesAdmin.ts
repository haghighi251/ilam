import { Schema, model, models } from "mongoose";
import { IProvincesAdminSchema } from "@/utils/types";

const ProvincesAdminSchema = new Schema<IProvincesAdminSchema>(
  {
    rovincessAdminUnique: {
      type: String,
      required: true,
      unique: true,
    },
    provinceUnique: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ProvincesAdmin =
  models.ProvincesAdmin ||
  model<IProvincesAdminSchema>("ProvincesAdmin", ProvincesAdminSchema);

export default ProvincesAdmin;
