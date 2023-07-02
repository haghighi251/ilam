import { Alert, Button, FormControl, HStack, Input, Text, VStack } from "native-base";
import React, { FormEvent } from "react";

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
  const handleMobileChange = (text) => {
    setMobileChanges(text);
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
        onChangeText={(text) => handleMobileChange(text)}
        required
      />
      {error && (
        <Alert w="100%" status={error} px="5" mt="5">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={0} justifyContent="space-between">
                <Text fontSize="md" color="coolGray.800">
                {error}
                </Text>
                <Alert.Icon mt="1" />
            </HStack>
          </VStack>
        </Alert>
      )}

      <Button
        isLoading={isLoading}
        spinnerPlacement="end"
        isLoadingText="در حال ارسال"
        bg="two"
        mt="5"
        type="submit"
        onPress={handleFormSubmit}
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
