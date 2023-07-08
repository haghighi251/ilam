
export interface Iuser {
  user: {
    user_id: string | undefined;
    mobile?: string | undefined;
    usernameOrEmail?: string | undefined;
    isDriver: boolean | undefined;
  };
  isLoggedIn: boolean;
}

export type ResponseDataType = {
  success: boolean;
  error?: string;
  data?: any;
};

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
