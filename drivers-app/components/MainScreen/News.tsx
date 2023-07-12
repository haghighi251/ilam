import AutoScroll from '@homielab/react-native-auto-scroll';
import { Box, Text } from 'native-base';

const News: React.FC = () => {
   const data = [
      { id: '1', text: 'خبر جدید و مهم' },
      { id: '2', text: 'خبر جدید و مهم' },
      { id: '3', text: 'خبر جدید و مهم' },
      { id: '4', text: 'خبر جدید و مهم' },
      { id: '5', text: 'خبر جدید و مهم' },
      // Add more items as needed
   ];

   return (
      <Box bottom={0}>
         <Text
            fontFamily="body"
            fontWeight="Bold"
            fontStyle="normal"
            fontSize="lg"
            color="black"
            px={5}
            mt={2}
         >
            اخبار
         </Text>
         <AutoScroll endPaddingWidth={0} isLTR={true}>
            <Box display="flex" flexDirection="row">
               {data.map((item) => (
                  <Text
                     fontFamily="body"
                     fontWeight="Normal"
                     fontStyle="normal"
                     fontSize="sm"
                     color="black"
                     mx={5}
                     mb={2}
                  >
                     {item.text}
                  </Text>
               ))}
            </Box>
         </AutoScroll>
      </Box>
   );
};
export default News;
