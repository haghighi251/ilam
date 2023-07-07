import { Box, ScrollView, Text, VStack } from 'native-base';
import React from 'react';

const TermsAndConditionsScreen: React.FC = () => {
   return (
      <Box bg="one" flex={1}>
         <Text
            position="absolute"
            top={70}
            left={6}
            zIndex={2}
            fontFamily="body"
            fontWeight="Bold"
            fontStyle="normal"
            fontSize="xl"
            color="black"
         >
            قوانین و مقررات
         </Text>
         <ScrollView>
            <VStack bg="one" space={5} flex={1} p={6}>
               <Box bg="white" borderRadius={10} p={10} shadow={2} mt={140}>
                  <Text
                     fontFamily="body"
                     fontWeight="Bold"
                     fontStyle="normal"
                     fontSize="xl"
                     color="black"
                  >
                     قوانین و مقررات
                  </Text>
                  <Text
                     fontFamily="body"
                     fontWeight="Light"
                     fontStyle="normal"
                     fontSize="sm"
                     color="black"
                  >
                     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                     و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                     روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                     شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
                     بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                     درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
                     طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                     ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                     ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
                     موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                     زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی
                     سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                     گیرد.
                  </Text>
                  <Text
                     fontFamily="body"
                     fontWeight="Light"
                     fontStyle="normal"
                     fontSize="sm"
                     color="black"
                  >
                     لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                     و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه
                     روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای
                     شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف
                     بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
                     درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
                     طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه
                     ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                     ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری
                     موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
                     زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی
                     سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
                     گیرد.
                  </Text>
               </Box>
            </VStack>
         </ScrollView>
      </Box>
   );
};

export default TermsAndConditionsScreen;
