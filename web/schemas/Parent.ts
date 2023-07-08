import { Schema, model, models } from 'mongoose';

import { IParentsSchema } from '@/utils/types';

const ParentsSchema = new Schema<IParentsSchema>({
   userUnique: {
      type: String,
      required: true,
      unique: true,
   },
   parentUnique: {
      type: String,
      required: true,
      unique: true,
   },
   studentUnique: {
      type: String,
      required: true,
      unique: true,
   },
});

const Parents =
   models.Parents || model<IParentsSchema>('Parents', ParentsSchema);

export default Parents;
