import { Schema, model, models } from "mongoose";
import { ISchoolSchema } from "@/utils/types";

const SchoolSchema = new Schema<ISchoolSchema>({
  name: {
    type: String,
    required: true,
  },
  schoolUniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  cityUnique: {
    type: String,
    required: true,
  },
});

const School = models.School || model<ISchoolSchema>("School", SchoolSchema);

export default School;
