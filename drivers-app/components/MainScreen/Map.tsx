import { API_URL } from '@env';
import MapView from '@splicer97/react-native-osmdroid';
import { Center } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { user } from '../../services/Redux/userReducer';
import { Iuser } from '../../utils/types';
import Loading from '../Loading';
import MapRouter from './MapRouter';
import PointMarker from './PointMarker';
import RoutingStagger from './RoutingStagger';

const Map: React.FC = () => {
   const [driverUnique, setDriverUnique] = useState<string>('');
   const [schoolUnique, setSchoolUnique] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [students, setStudents] = useState<any[]>([]);
   const [schoolData, setSchoolData] = useState(null);
   const currentUser: Iuser = useSelector(user);

   // To get School data
   const getSchoolInformation = async (id: string) => {
      try {
         const url = `${API_URL}/api/admin/authorized/schools/read/${id}`;
         const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
         });
         const data = await response.json();
         if (response.ok) {
            if (data.data) {
               setSchoolData(data.data);
            }
         } else {
            console.error(data.error);
         }
      } catch (e) {
         console.error(e);
      }
   };
   // To get Driver Unique Code
   const getDriverInformation = async () => {
      try {
         const url = `${API_URL}/api/admin/authorized/drivers/read/${currentUser.user.uniqueCode}`;
         const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
         });
         const data = await response.json();
         if (response.ok) {
            if (data.data.driverUniqueId !== '') {
               setDriverUnique(data.data.driverUniqueId);
               // console.log('driverUnique:', data.data.driverUniqueId);
            }
            if (data.data.schoolUniqueId !== '') {
               setSchoolUnique(data.data.schoolUniqueId);
            }
         } else {
            console.error(data.error);
         }
      } catch (e) {
         console.error(e);
      }
   };

   // To get students information in drivers app
   const getStudentsInformation = async () => {
      try {
         const url = `${API_URL}/api/admin/authorized/students/filter/driver/${driverUnique}`;
         const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
         });

         if (response.ok) {
            const data = await response.json();
            // console.log('the data', data); // Log the response data
            if (data.data.length > 0) {
               setStudents(data.data);
               // console.log('the students', data.data);
            }
         } else {
            console.error('Error response:', response.status);
         }
      } catch (e) {
         console.error('Error:', e);
      }
   };
   useEffect(() => {
      getDriverInformation();
   }, []);
   useEffect(() => {
      if (driverUnique !== '') {
         getStudentsInformation();
      }
   }, [driverUnique]);

   useEffect(() => {
      if (schoolUnique !== '') {
         getSchoolInformation(schoolUnique);
      }
   }, [schoolUnique]);
   useEffect(() => {
      if (schoolData !== null) {
         setIsLoading(false);
      }
   }, [schoolData]);
   return (
      <Center w="100%" bg="one" flex={1}>
         {isLoading ? (
            <Loading text={'در حال بارگذاری'} />
         ) : (
            <>
               <MapView
                  style={styles.map}
                  initialRegion={{
                     latitude: Number(schoolData.latitude),
                     longitude: Number(schoolData.longitude),
                     latitudeDelta: 0.05,
                     longitudeDelta: 0.05,
                  }}
               >
                  {/* Routing - This Part will draw lines based on the points that we get from project-osrm routing API service */}
                  <MapRouter students={students} />

                  {/* Polygon is for highlighting a zone */}
                  {/* <ZoneHighlighter /> */}

                  {/* Marker will show a point on the map */}
                  <PointMarker schoolData={schoolData} students={students} />
               </MapView>
               <RoutingStagger schoolData={schoolData} students={students} />
            </>
         )}
      </Center>
   );
};
const styles = StyleSheet.create({
   page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   container: {
      height: 300,
      width: 300,
   },
   map: {
      flex: 1,
      width: '100%',
   },
});
export default Map;
