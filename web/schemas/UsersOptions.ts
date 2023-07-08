import { model, Schema, models } from "mongoose";
import { IUsersOptionsSchema } from "@/utils/types";

const UsersOptionsSchema = new Schema<IUsersOptionsSchema>({
  uid: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
    unique: false,
  },
  key: {
    type: String,
    unique: false,
  },
  value: {
    type: String,
    required: true,
    unique: false,
    default: null,
  },
});

const UsersOptions =
  models.UsersOptions ||
  model<IUsersOptionsSchema>("UsersOptions", UsersOptionsSchema);

export default UsersOptions;
