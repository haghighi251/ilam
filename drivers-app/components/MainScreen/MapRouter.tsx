import polyline from '@mapbox/polyline';
import { Polyline } from '@splicer97/react-native-osmdroid';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MapRouter: React.FC = ({ students }) => {
   const [routeCoordinates, setRouteCoordinates] = useState([]);

   // const decodePolyline = (coordinates) => {
   //    const decodedPoints = coordinates.map((coordinate) => ({
   //       latitude: coordinate[1],
   //       longitude: coordinate[0],
   //    }));

   //    return decodedPoints;
   // };
   const decodePolyline = async (encoded) => {
      const decoded = await polyline.decode(encoded);

      const coordinates = await decoded.map((point) => ({
         latitude: point[0],
         longitude: point[1],
      }));

      return coordinates;
   };
   const getStudentsHomeCoordinates = (studentsData) => {
      const coordinates = studentsData.map((student) => {
         const latitude = parseFloat(student.homeLatitude);
         const longitude = parseFloat(student.homeLongitude);
         return `${longitude},${latitude}`;
      });

      return coordinates.join(';');
   };
   useEffect(() => {
      const coordinatesString = getStudentsHomeCoordinates(students);
      const getRouteCoordinates = async () => {
         try {
            // const response = await axios.get(
            //    'https://api.openrouteservice.org/v2/directions/driving-car',
            //    {
            //       params: {
            //          api_key:
            //             '5b3ce3597851110001cf6248ff22a7a2744249538ad7e58b04b4bf76',
            //          start: '49.574106,37.295253',
            //          end: '49.597625,37.303880',
            //       },
            //    }
            // );
            // const response = await axios.get(
            //    'https://router.project-osrm.org/route/v1/driving/49.574106,37.295253;49.597625,37.303880?overview=full'
            // );
            // const { data } = response;
            // if (data.features && data.features.length > 0) {
            //    const { geometry } = data.features[0];
            //    if (geometry) {
            //       const decodedPoints = decodePolyline(geometry.coordinates);
            //       setRouteCoordinates(decodedPoints);
            //    }
            // }

            // console.log(coordinatesString);
            const response = await axios.get(
               `https://router.project-osrm.org/route/v1/driving/${coordinatesString}?overview=full`
            );

            const { data } = response;
            if (data.code === 'Ok') {
               const { routes } = data;
               if (routes.length > 0) {
                  const { geometry } = routes[0];
                  const decodedPoints = await decodePolyline(geometry);
                  setRouteCoordinates(decodedPoints);
               }
            }
         } catch (error) {
            console.error('Error fetching route:', error);
         }
      };
      if (students.length > 0) {
         getRouteCoordinates();
      }
   }, [students]);

   return (
      <Polyline
         coordinates={routeCoordinates}
         strokeWidth={2}
         strokeColor="blue"
      />
   );
};

export default MapRouter;
