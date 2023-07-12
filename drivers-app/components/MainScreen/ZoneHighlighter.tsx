import { Polygon } from '@splicer97/react-native-osmdroid';

const ZoneHighlighter: React.FC = () => {
   return (
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
   );
};
export default ZoneHighlighter;
