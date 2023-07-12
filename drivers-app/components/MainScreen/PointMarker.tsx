import { Ionicons } from '@expo/vector-icons';
import { Marker } from '@splicer97/react-native-osmdroid';
import { Box, HStack, Text } from 'native-base';

const PointMarker: React.FC = ({ schoolData, students }) => {
   return (
      <>
         {/* School Marker */}
         {schoolData.latitude ? (
            <Marker
               coordinate={{
                  latitude: Number(schoolData.latitude),
                  longitude: Number(schoolData.longitude),
               }}
            >
               <Box bg="one" p={0.5} borderRadius={15}>
                  <HStack space={0.5} alignItems="center">
                     <Box bg="white" p={0.5} borderRadius={15}>
                        <Text
                           fontFamily="body"
                           fontWeight="Light"
                           fontStyle="normal"
                           fontSize="xs"
                        >
                           {schoolData.name}
                        </Text>
                     </Box>
                     <Ionicons
                        name="school"
                        size={16}
                        color="black"
                        {...Marker}
                     />
                  </HStack>
               </Box>
            </Marker>
         ) : null}
         {/* Students Marker */}
         {students.length > 0
            ? students.map((student) => (
                 <Marker
                    coordinate={{
                       latitude: Number(student.homeLatitude),
                       longitude: Number(student.homeLongitude),
                    }}
                 >
                    <Box bg="three" p={0.5} borderRadius={15}>
                       <HStack space={0.5} alignItems="center">
                          <Box bg="white" p={0.5} borderRadius={15}>
                             <Text
                                fontFamily="body"
                                fontWeight="Light"
                                fontStyle="normal"
                                fontSize="xs"
                             >
                                {student.name}
                             </Text>
                          </Box>
                          <Ionicons
                             name="person-circle-outline"
                             size={18}
                             color="black"
                             {...Marker}
                          />
                       </HStack>
                    </Box>
                 </Marker>
              ))
            : null}
      </>
   );
};
export default PointMarker;
