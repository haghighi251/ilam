import { Button, FormControl, Input, Text } from "native-base";
import React, { useState } from "react";

const ActivationForm: React.FC = () => {
  const [mobile, setMobile] = useState("");

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
        onChange={(e) => setMobile(e.target.value)}
        required
      />
      <Button bg="two" mt="5">
        <Text
          color="white"
          fontFamily="body"
          fontWeight="Medium"
          fontStyle="normal"
          fontSize="lg"
        >
          ورود
        </Text>
      </Button>
    </FormControl>
  );
};

export default ActivationForm;
