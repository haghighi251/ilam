import { Schema, model, models } from "mongoose";
import { IAdminSchema } from "@/utils/types";

const AdminSchema = new Schema<IAdminSchema>({
  adminUniqueId: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
});

const Admin = models.Admin || model<IAdminSchema>("Admin", AdminSchema);

export default Admin;
