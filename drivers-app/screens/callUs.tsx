import { Ionicons } from '@expo/vector-icons';
import { Box, Button, HStack, Text, VStack } from 'native-base';
import React from 'react';

const CallUsScreen: React.FC = () => {
   return (
      <Box bg="one" flex={1}>
         <Text
            position="absolute"
            top={70}
            left={6}
            zIndex={2}
            fontFamily="body"
            fontWeight="Bold"
            fontStyle="normal"
            fontSize="xl"
            color="black"
         >
            تماس با ما
         </Text>

         <VStack bg="one" space={5} flex={1} p={6}>
            <HStack space={5} alignItems="center" mt={140}>
               <VStack
                  bg="white"
                  borderRadius={10}
                  shadow={2}
                  h="65"
                  justifyContent="center"
                  flex={1}
                  px={5}
               >
                  <Text
                     fontFamily="body"
                     fontWeight="Bold"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     تلفن پشتیبانی
                  </Text>
                  <Text
                     fontFamily="body"
                     fontWeight="Bold"
                     fontStyle="normal"
                     fontSize="md"
                     color="black"
                  >
                     0 9 1 2 3 4 5 6 7 8 9
                  </Text>
               </VStack>
               <Button borderRadius={10} shadow={9} w="65" h="65" bg="three">
                  <Ionicons name="call" size={24} color="black" />
               </Button>
            </HStack>
         </VStack>
      </Box>
   );
};

export default CallUsScreen;
