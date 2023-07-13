import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from './store';

import { ISchoolAdminSchema } from '@/utils/types';

// Define the initial state using its data type
const initialState: ISchoolAdminSchema = {
   schoolAdminUnique: undefined,
   schoolUniqueId: undefined,
};

export const schoolAdminReducer = createSlice({
   name: 'schoolAdmin',
   initialState,
   reducers: {
      setSchoolAdmin: (
         state: Draft<any>,
         action: PayloadAction<ISchoolAdminSchema>
      ): Draft<any> => {
         return (state = action.payload);
      },
      deleteSchoolAdmin: (state: Draft<any>): Draft<any> => {
         return (state = {
            schoolAdminUnique: undefined,
            schoolUniqueId: undefined,
         });
      },
   },
});

export const { setSchoolAdmin, deleteSchoolAdmin } = schoolAdminReducer.actions;
export const schoolAdmin = (state: RootState) => state;

export default schoolAdminReducer.reducer;
