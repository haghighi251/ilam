import { Schema, model, models } from "mongoose";
import { IProvincesSchema } from "@/utils/types";

const ProvincesSchema = new Schema<IProvincesSchema>({
  provinceUnique: {
    type: String,
    required: true,
    unique: true,
  },
});

const Provinces =
  models.Provinces || model<IProvincesSchema>("Provinces", ProvincesSchema);

export default Provinces;
