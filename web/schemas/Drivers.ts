import { Schema, model, models } from 'mongoose';

import { IDriversSchema } from '@/utils/types';

const DriversSchema = new Schema<IDriversSchema>({
   name: {
      type: String,
      required: true,
   },
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
   score: {
      type: String,
      default: null,
   },
});

const Drivers =
   models.Drivers || model<IDriversSchema>('Drivers', DriversSchema);

export default Drivers;
