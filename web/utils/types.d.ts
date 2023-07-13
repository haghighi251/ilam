import { Document } from 'mongoose';

export interface Iuser {
   user: {
      status: boolean | undefined;
      user_id: string | undefined;
      usernameOrEmail?: string | undefined;
      mobile?: string | undefined;
      uniqueCode: string | undefined;
   };
   isLoggedIn: boolean;
}

export type ResponseDataType = {
   success: boolean;
   error?: string;
   data?: any;
};

// User schema structure that is used in MongoDB schemas.
export interface IUsersSchema extends Document {
   username?: string;
   mobile: string;
   email?: string;
   password?: string;
   nickname?: string;
   picture?: string;
   salt?: string;
   isAdmin: boolean;
   isDriver: boolean;
   isParent: boolean;
   isSchoolAdmin: boolean;
   isProvinceAdmin: boolean;
   isCityAdmin: boolean;
   uniqueCode: string;
   timestamps?: unknown;
   status: boolean;
   activationCode: string;
   _doc: any;
}

export interface IUsersOptionsSchema extends Document {
   uid: IUsersSchema._id;
   key: string;
   value: string | null;
}

export interface IAdminSchema extends Document {
   adminUniqueId: IUsersSchema.uniqueCode;
}

export interface ISchoolSchema extends Document {
   name: string;
   schoolUniqueId: string;
   cityUnique: string;
}

export interface ISchoolAdminSchema extends Document {
   schoolAdminUnique: string | undefined;
   schoolUniqueId: string | undefined;
}

export interface IDriversSchema extends Document {
   userUniqueCode: string;
   driverUniqueId: string;
   schoolUniqueId: string;
   driverDocuments: [string];
   students: [string];
   score: string;
}

export interface IStudentsSchema extends Document {
   name: string;
   nationalCode: string;
   studentUnique: string;
   schoolUniqueId: string;
   driverUnique: string;
   parentUnique: [string];
   homeLatitude: string;
   homeLongitude: string;
   homeDetails: string;
}

export interface IParentsSchema extends Document {
   parentUnique: string;
   studentUnique: [string];
}

export interface IProvincesSchema extends Document {
   provinceName: string;
   provinceUnique: string;
}

export interface ICitiesSchema extends Document {
   citiesUnique: string;
   provinceUnique: string;
   speedMin: string;
   speedMax: string;
}

export interface ILocationsSchema extends Document {
   driverUnique: string;
   latitude: string;
   longitude: string;
   speed: string;
}

export interface INewsSchema extends Document {
   title: string;
   description: string;
   image: string;
}

export interface IDriversDocumentsSchema extends Document {
   driverUnique: string;
   documentName: string;
   file: string;
}

export interface IProvincesAdminSchema extends Document {
   provinceAdminUnique: string;
   provinceUnique: string;
}

export interface ICityCoordinatesSchema extends Document {
   cityUnique: string;
   latitude: string;
   longitude: string;
   rowNumber: number;
}

// LoginForm props
export interface LoginFormProps {
   mobile: string;
   error: string | null;
   isLoading: boolean;
   setMobileChanges: (value: string) => void;
   handleSubmit: () => void;
}

export interface ActivationFormProps {
   handleActivation: () => void;
   activationCode: string;
   handleActivationCode: (value: string) => void;
   error: string | null;
   isLoading: boolean;
}
