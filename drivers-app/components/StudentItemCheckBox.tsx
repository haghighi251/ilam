import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Box, Checkbox, Icon, Text } from 'native-base';
import React, { useState } from 'react';

const StudentItemCheckBox: React.FC = ({ id, name }) => {
   const [bg, setBg] = useState('#fff'); // Initial background color of the box

   const handleCheckboxChange = (newValue) => {
      if (newValue) {
         setBg('#22c55e'); // Set background color when the checkbox is checked
      } else {
         setBg('#ef4444'); // Set background color when the checkbox is unchecked
      }
   };

   return (
      <Box
         display="flex"
         flexDirection="row"
         justifyContent="space-between"
         borderRadius={10}
         shadow={2}
         bg={bg}
         px={10}
         py={5}
      >
         <Checkbox
            size="md"
            value="success"
            colorScheme="success"
            icon={
               <Icon as={MaterialCommunityIcons} name="bullseye" opacity={1} />
            }
            onChange={(newValue) => handleCheckboxChange(newValue)}
         />
         <Text
            fontFamily="body"
            fontWeight="Normal"
            fontStyle="normal"
            fontSize="md"
            color="black"
         >
            {name}
         </Text>
      </Box>
   );
};

export default StudentItemCheckBox;
