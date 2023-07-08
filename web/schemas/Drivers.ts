import { Schema, model, models } from 'mongoose';

import { IDriversSchema } from '@/utils/types';

const DriversSchema = new Schema<IDriversSchema>({
   userUniqueCode: {
      type: String,
      required: true,
   },
   driverUniqueId: {
      type: String,
      required: true,
      unique: true,
   },
   schoolUniqueId: {
      type: String,
      required: true,
   },
   driverDocuments: [
      {
         type: String,
         default: null,
      },
   ],
   students: [
      {
         type: String,
         default: null,
      },
   ],
   score: {
      type: String,
      default: null,
   },
});

const Drivers =
   models.Drivers || model<IDriversSchema>('Drivers', DriversSchema);

export default Drivers;
