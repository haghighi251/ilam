import { HStack, Heading, Spinner } from "native-base";

interface LoadingProps {
   text: string;
   }
   
const Loading: React.FC<LoadingProps> = ({ text }) => {
   
   return(
      <HStack space={2} justifyContent="center">
         <Spinner color="two" accessibilityLabel="Loading posts" />
         <Heading
            fontFamily="body"
            fontWeight="Medium"
            fontStyle="normal"
            fontSize="md"
            color="black"
         >
            {text}
         </Heading>
    </HStack>
   );
}
export default Loading;