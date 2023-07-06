import {
   Avatar,
   Box,
   Center,
   Divider,
   FlatList,
   HStack,
   Text,
   VStack,
   View,
} from 'native-base';

const BestDrivers: React.FC = () => {
   const data = [
      { id: '1', text: 'Item 1' },
      { id: '2', text: 'Item 2' },
      { id: '3', text: 'Item 3' },
      { id: '4', text: 'Item 4' },
      { id: '5', text: 'Item 5' },
      // Add more items as needed
   ];
   const renderItem = ({ item }) => (
      <View mr={5}>
         <Center h="81" bg="white" rounded="md" shadow={3} my={3} px={3}>
            <HStack
               space={3}
               justifyContent="center"
               flexDirection="row-reverse"
            >
               <Center>
                  <Avatar
                     alignSelf="center"
                     bg="two"
                     size="lg"
                     source={{
                        uri: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                     }}
                  >
                     AK
                  </Avatar>
               </Center>
               <VStack space={0} my="auto">
                  <Text
                     fontFamily="body"
                     fontWeight="Bold"
                     fontStyle="normal"
                     fontSize="sm"
                  >
                     فلانی فلانی پور
                  </Text>
                  <Divider my="1" color="black" />
                  <Box>
                     <Text
                        fontFamily="body"
                        fontWeight="Bold"
                        fontStyle="normal"
                        fontSize="xs"
                        color="black"
                     >
                        امتیاز: ۴.۸ از ۱۰
                     </Text>
                  </Box>
               </VStack>
            </HStack>
         </Center>
      </View>
   );
   return (
      <Box>
         <Text
            fontFamily="body"
            fontWeight="Bold"
            fontStyle="normal"
            fontSize="xl"
            color="black"
            px={5}
            mt={3}
         >
            رانندگان برتر
         </Text>
         <FlatList
            data={data}
            horizontal
            inverted
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
         />
      </Box>
   );
};
export default BestDrivers;
