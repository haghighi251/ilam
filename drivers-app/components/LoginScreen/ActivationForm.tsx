import {
   Alert,
   Button,
   FormControl,
   HStack,
   Input,
   Text,
   VStack,
} from 'native-base';
import React from 'react';

const ActivationForm = ({
   handleActivation,
   activationCode,
   handleActivationCode,
   error,
   isLoading,
}: ActivationFormProps) => {
   return (
      <FormControl mt="20" w="100%">
         <Text
            fontFamily="body"
            fontWeight="Bold"
            fontStyle="normal"
            fontSize="lg"
         >
            کد فعالسازی
         </Text>
         <Input
            borderWidth="1"
            borderColor="white"
            bg="muted.50"
            size="2xl"
            placeholder="نمونه: 123456"
            fontFamily="body"
            fontWeight="Light"
            fontStyle="normal"
            fontSize="sm"
            mt="2"
            keyboardType="numeric"
            value={activationCode}
            name="activationCode"
            onChangeText={(text) => handleActivationCode(text)}
            required
         />
         {error && (
            <Alert w="100%" status={error} px="5" mt="5">
               <VStack space={2} flexShrink={1} w="100%">
                  <HStack
                     flexShrink={1}
                     space={0}
                     justifyContent="space-between"
                  >
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
            isLoadingText="ورود"
            bg="two"
            mt="5"
            type="submit"
            onPress={handleActivation}
         >
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
