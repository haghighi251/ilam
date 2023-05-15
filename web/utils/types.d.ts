import { Document } from "mongoose";

export interface Iuser {
  user: {
    user_id: string | undefined;
    mobile: string | undefined;
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
  timestamps?: unknown;
  status: boolean;
  activationCode: string;
  _doc: any;
}

// UserOptions schema structure that is used in MongoDB schemas.
export interface IUsersOptionsSchema extends Document {
  uid: IUsersSchema._id;
  key: string;
  value: string | null;
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
