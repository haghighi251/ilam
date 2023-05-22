import { Schema, model, models } from "mongoose";
import { IDriversDocumentsSchema } from "@/utils/types";

const DriversDocumentsSchema = new Schema<IDriversDocumentsSchema>(
  {
    driverUnique: {
      type: String,
      required: true,
    },
    documentName: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DriversDocuments =
  models.DriversDocuments ||
  model<IDriversDocumentsSchema>("DriversDocuments", DriversDocumentsSchema);

export default DriversDocuments;
