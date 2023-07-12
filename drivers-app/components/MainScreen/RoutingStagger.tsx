import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import {
   Box,
   Button,
   HStack,
   Link,
   Stagger,
   Text,
   useDisclose,
} from 'native-base';

const RoutingStagger: React.FC = ({ schoolData, students }) => {
   const { isOpen, onToggle } = useDisclose();
   return (
      <Box position="absolute" bottom={5} right={5}>
         <Box alignItems="center">
            <Stagger
               visible={isOpen}
               initial={{
                  opacity: 0,
                  scale: 0,
                  translateY: 34,
               }}
               animate={{
                  translateY: 0,
                  scale: 1,
                  opacity: 1,
                  transition: {
                     type: 'spring',
                     mass: 0.8,
                     stagger: {
                        offset: 30,
                        reverse: true,
                     },
                  },
               }}
               exit={{
                  translateY: 34,
                  scale: 0.5,
                  opacity: 0,
                  transition: {
                     duration: 100,
                     stagger: {
                        offset: 30,
                        reverse: true,
                     },
                  },
               }}
            >
               {/* School Location Button */}
               {schoolData.name ? (
                  <Link
                     bg="one"
                     p={0.5}
                     borderRadius={15}
                     my={2}
                     href={`geo:${schoolData.latitude},${schoolData.longitude}`}
                     isExternal
                  >
                     <HStack space={0.5} alignItems="center">
                        <Box bg="white" px={1} py={0.5} borderRadius={15}>
                           <Text
                              fontFamily="body"
                              fontWeight="Bold"
                              fontStyle="normal"
                              fontSize="sm"
                           >
                              {schoolData.name}
                           </Text>
                        </Box>
                        <Ionicons name="school" size={24} color="black" />
                     </HStack>
                  </Link>
               ) : null}

               {/* Students Location Buttons */}
               {students.length > 0
                  ? students.map((student, index) => (
                       <Link
                          key={index}
                          bg="three"
                          p={0.5}
                          borderRadius={15}
                          my={2}
                          href={`geo:${student.homeLatitude},${student.homeLongitude}`}
                       >
                          <HStack space={0.5} alignItems="center">
                             <Box bg="white" px={1} py={0.5} borderRadius={15}>
                                <Text
                                   fontFamily="body"
                                   fontWeight="Bold"
                                   fontStyle="normal"
                                   fontSize="sm"
                                >
                                   {student.name}
                                </Text>
                             </Box>
                             <Ionicons
                                name="person-circle-outline"
                                size={24}
                                color="black"
                             />
                          </HStack>
                       </Link>
                    ))
                  : null}
            </Stagger>
         </Box>
         <HStack justifyContent="center">
            <Button borderRadius="full" shadow={2} onPress={onToggle} bg="two">
               <HStack space={2} alignItems="center">
                  <Text
                     fontFamily="body"
                     fontWeight="Bold"
                     fontStyle="normal"
                     fontSize="sm"
                     color="white"
                  >
                     مسیریابی
                  </Text>
                  <FontAwesome5 name="route" size={18} color="white" />
               </HStack>
            </Button>
         </HStack>
      </Box>
   );
};
export default RoutingStagger;
