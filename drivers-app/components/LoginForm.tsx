import { Alert, Button, FormControl, Input, Text } from "native-base";
import React, { ChangeEvent, FormEvent } from "react";

interface LoginFormProps {
  mobile: string;
  error: string;
  isLoading: boolean;
  setMobileChanges: (value: string) => void;
  handleSubmit: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  mobile,
  error,
  isLoading,
  setMobileChanges,
  handleSubmit,
}) => {
  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMobileChanges(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <FormControl mt="20" w="100%">
      <Text
        fontFamily="body"
        fontWeight="Bold"
        fontStyle="normal"
        fontSize="lg"
      >
        تلفن همراه
      </Text>
      <Input
        borderWidth="1"
        borderColor="white"
        bg="muted.50"
        size="2xl"
        placeholder="نمونه: ۰۹۱۲۳۴۵۶۷۸۹"
        fontFamily="body"
        fontWeight="Light"
        fontStyle="normal"
        fontSize="sm"
        mt="2"
        keyboardType="numeric"
        value={mobile}
        name="mobile"
        onChange={handleMobileChange}
        required
      />
      {error && (
        <Alert severity="error" className="mb-3 md:mb-6">
          {error}
        </Alert>
      )}

      <Button
        isLoading={isLoading}
        spinnerPlacement="end"
        isLoadingText="در حال ارسال"
        bg="two"
        mt="5"
        type="submit"
        onClick={handleFormSubmit}
      >
        <Text
          color="white"
          fontFamily="body"
          fontWeight="Medium"
          fontStyle="normal"
          fontSize="lg"
        >
          ارسال کد
        </Text>
      </Button>
    </FormControl>
  );
};

export default LoginForm;
