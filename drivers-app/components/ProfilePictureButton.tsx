import { Avatar, Pressable } from 'native-base';

const ProfilePictureButton: React.FC = () => {
   return (
      <Pressable
         onPress={() => console.log("I'm Pressed")}
         borderRadius="full"
         zIndex={2}
         position="absolute"
         top={55}
         left={6}
         shadow={10}
         p={1}
         bg="two"
      >
         <Avatar
            bg="green.500"
            source={{
               uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
            w={51}
            h={51}
         >
            AJ
         </Avatar>
      </Pressable>
   );
};
export default ProfilePictureButton;
