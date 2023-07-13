import { Schema, model, models } from 'mongoose';

import { ISchoolAdminSchema } from '@/utils/types';

const SchoolAdminSchema = new Schema<ISchoolAdminSchema>({
   schoolAdminUnique: {
      type: String,
      required: true,
      unique: true,
   },
   schoolUniqueId: {
      type: String,
      required: true,
   },
});

const SchoolAdmin =
   models.SchoolAdmin ||
   model<ISchoolAdminSchema>('SchoolAdmin', SchoolAdminSchema);

export default SchoolAdmin;
