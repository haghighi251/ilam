import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
   Avatar,
   Box,
   Button,
   Divider,
   HStack,
   Popover,
   Pressable,
   Text,
   VStack,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/Redux/store';
import { actionLogout, user } from '../../services/Redux/userReducer';
import { Iuser } from '../../utils/types';
const ProfilePictureButton: React.FC = () => {
   const dispatch: AppDispatch = useDispatch();
   // dispatch(actionLogout());
   const currentUser: Iuser = useSelector(user);
   return (
      <Box
         borderRadius="full"
         zIndex={2}
         position="absolute"
         top={55}
         left={6}
         shadow={10}
         p={1}
         bg="two"
      >
         <Popover
            trigger={(triggerProps) => {
               return (
                  <Pressable {...triggerProps}>
                     <Avatar
                        bg="white"
                        source={{
                           uri: user.picture || null,
                        }}
                        w={51}
                        h={51}
                     >
                        <MaterialCommunityIcons
                           name="face-man-profile"
                           size={24}
                           color="black"
                        />
                     </Avatar>
                  </Pressable>
               );
            }}
         >
            <Popover.Content accessibilityLabel="خروج" w="129" bg="one">
               <Popover.Arrow bg="one" />
               <VStack p={1}>
                  <HStack justifyContent="flex-end">
                     <Text
                        fontFamily="body"
                        fontWeight="Bold"
                        fontStyle="normal"
                        fontSize="sm"
                     >
                        عملیات
                     </Text>
                  </HStack>
                  <Divider bg="black" mb={3} />
                  <Button
                     endIcon={
                        <Ionicons
                           name="log-out-outline"
                           size={24}
                           color="black"
                        />
                     }
                     py={1}
                     onPress={() => {
                        dispatch(actionLogout());
                     }}
                  >
                     <Text
                        fontFamily="body"
                        fontWeight="Bold"
                        fontStyle="normal"
                        fontSize="sm"
                     >
                        خروج
                     </Text>
                  </Button>
               </VStack>
            </Popover.Content>
         </Popover>
      </Box>
   );
};
export default ProfilePictureButton;
