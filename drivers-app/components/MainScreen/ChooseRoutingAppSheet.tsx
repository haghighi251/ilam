import {
   Actionsheet,
   Box,
   Center,
   Pressable,
   Text,
   useDisclose,
} from 'native-base';

const ChooseRoutingAppSheet: React.FC = () => {
   const { isOpen, onOpen, onClose } = useDisclose();
   console.log(isOpen);
   return (
      <Center>
         <Pressable
            onPress={() => console.log('pressed')}
            shadow={15}
         ></Pressable>
         <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
               <Box w="100%" h={60} px={4} justifyContent="center">
                  <Text
                     fontSize="16"
                     color="gray.500"
                     _dark={{
                        color: 'gray.300',
                     }}
                  >
                     Albums
                  </Text>
               </Box>
               <Actionsheet.Item>Delete</Actionsheet.Item>
               <Actionsheet.Item isDisabled>Share</Actionsheet.Item>
               <Actionsheet.Item>Play</Actionsheet.Item>
               <Actionsheet.Item>Favourite</Actionsheet.Item>
               <Actionsheet.Item>Cancel</Actionsheet.Item>
            </Actionsheet.Content>
         </Actionsheet>
      </Center>
   );
};
export default ChooseRoutingAppSheet;
