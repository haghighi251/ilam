import { Schema, model, models } from 'mongoose';

import { IStudentsSchema } from '@/utils/types';

const StudentsSchema = new Schema<IStudentsSchema>({
   name: {
      type: String,
      required: true,
   },
   nationalCode: {
      type: String,
      required: true,
      unique: true,
   },
   studentUnique: {
      type: String,
      required: true,
      unique: true,
   },
   schoolUniqueId: {
      type: String,
      required: true,
   },
   driverUnique: {
      type: String,
      required: false, // Because we should first create users and the drivers should create their user by their self.
      default: null,
   },
   parentUnique: [
      {
         type: String,
         required: false, // Because we should first create users and the parents should create their user by their self.
         default: null,
      },
   ],
   homeLatitude: {
      type: String,
      required: false,
   },
   homeLongitude: {
      type: String,
      required: false,
   },
   homeDetails: {
      type: String,
      required: false,
   },
});

const Students =
   models.Students || model<IStudentsSchema>('Students', StudentsSchema);

export default Students;
