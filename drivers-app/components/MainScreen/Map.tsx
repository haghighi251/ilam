import { Ionicons } from '@expo/vector-icons';
import polyline from '@mapbox/polyline';
import MapView, {
   Marker,
   Polygon,
   Polyline,
} from '@splicer97/react-native-osmdroid';
import axios from 'axios';
import { Center } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Loading from '../Loading';

const Map: React.FC = () => {
   const [routeCoordinates, setRouteCoordinates] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const getRouteCoordinates = async () => {
         try {
            const response = await axios.get(
               `https://router.project-osrm.org/route/v1/driving/49.574106,37.295253;49.597625,37.303880?overview=full`
            );

            const { data } = response;
            if (data.code === 'Ok') {
               const { routes } = data;
               if (routes.length > 0) {
                  const { geometry } = routes[0];
                  const decodedPoints = await decodePolyline(geometry);
                  setRouteCoordinates(decodedPoints);
                  setIsLoading(false);
               }
            }
         } catch (error) {
            console.error('Error fetching route:', error);
         }
      };

      getRouteCoordinates();
   }, []);

   // This function will decode the points from the project-osrm routing API service
   const decodePolyline = async (encoded) => {
      const decoded = await polyline.decode(encoded);

      const coordinates = await decoded.map((point) => ({
         latitude: point[0],
         longitude: point[1],
      }));

      return coordinates;
   };

   return (
      <Center w="100%" bg="one" flex={1}>
         {isLoading ? (
            <Loading text={'در حال بارگذاری'} />
         ) : (
            <MapView
               style={styles.map}
               initialRegion={{
                  latitude: 37.2806,
                  longitude: 49.5832,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
               }}
            >
               {/* Routing - This Part will draw lines based on the points that we get from project-osrm routing API service */}
               {routeCoordinates.length > 0 && (
                  <Polyline
                     coordinates={routeCoordinates}
                     strokeWidth={2}
                     strokeColor="blue"
                  />
               )}

               {/* Polygon is for highlighting a zone */}
               <Polygon
                  coordinates={[
                     // Coordinates for the city borders of Rasht, Guilan, Iran
                     { latitude: 37.2806, longitude: 49.5832 },
                     { latitude: 37.2785, longitude: 49.5898 },
                     { latitude: 37.2742, longitude: 49.5963 },
                     { latitude: 37.2781, longitude: 49.6022 },
                     { latitude: 37.2823, longitude: 49.6013 },
                     { latitude: 37.2875, longitude: 49.5972 },
                     { latitude: 37.2903, longitude: 49.5881 },
                     { latitude: 37.2862, longitude: 49.5812 },
                     { latitude: 37.2806, longitude: 49.5832 },
                  ]}
                  strokeColor="red"
                  strokeWidth={2}
                  fillColor="rgba(255, 0, 0, 0.2)" // Red color with 20% opacity
               />
               {/* Marker will show a point on the map */}
               <Marker
                  coordinate={{ latitude: 37.303898, longitude: 49.597526 }}
               >
                  <Ionicons name="school" size={24} color="black" {...Marker} />
               </Marker>
            </MapView>
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