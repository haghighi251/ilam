import { Schema, model, models } from 'mongoose';

import { IStudentsSchema } from '@/utils/types';

const StudentsSchema = new Schema<IStudentsSchema>({
   userUniqueCode: {
      type: String,
      required: true,
   },

   studentUnique: {
      type: String,
      required: true,
      unique: true,
   },
   schoolUniqueId: {
      type: String,
      required: true,
      unique: true,
   },

   driverUnique: {
      type: String,
      required: true,
      unique: true,
   },
   parentUnique: {
      type: String,
      required: true,
      unique: true,
   },
});

const Students =
   models.Students || model<IStudentsSchema>('Students', StudentsSchema);

export default Students;
