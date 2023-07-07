import { Box, Button, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import StudentItemCheckBox from '../components/AttendanceScreen/StudentItemCheckBox';

const styles = StyleSheet.create({
   mapContainer: {
      width: '100%',
      height: '73%',
      overflow: 'hidden',
   },
});
const AttendanceScreen: React.FC = () => {
   const data = [
      { id: '1', name: 'سپهر' },
      { id: '2', name: 'علی' },
      { id: '3', name: 'سهند' },
      { id: '4', name: 'حمید' },
      // Add more items as needed
   ];
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
            حضور غیاب مسافران
         </Text>
         <VStack bg="one" space={5} flex={1} p={6}>
            <Box bg="white" borderRadius={10} p={10} shadow={2} mt={140}>
               <Text
                  fontFamily="body"
                  fontWeight="Bold"
                  fontStyle="normal"
                  fontSize="xl"
                  color="black"
               >
                  راننده عزیز لطفا دانش آموزان حاضر را تیک بزنید.
               </Text>
            </Box>
            {data.map((item) => (
               <StudentItemCheckBox id={item.id} name={item.name} />
            ))}
            <Button borderRadius={10} py={5} shadow={2}>
               <Text
                  fontFamily="body"
                  fontWeight="Bold"
                  fontStyle="normal"
                  fontSize="xl"
               >
                  ثبت
               </Text>
            </Button>
         </VStack>
      </Box>
   );
};

export default AttendanceScreen;
