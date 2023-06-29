import { NextResponse, type NextRequest } from 'next/server';

import School from '@/schemas/School';
import connectMongo from '@/utils/connectMongo';

export async function PATCH(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();
      console.log(body);

      if (
         body.name === null ||
         body.name === undefined ||
      ) {
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });
      }

      const provinceData = await School.findOneAndUpdate(
         { schoolUniqueId: body.schoolUniqueId },
         { $set: { 
              name: body.name,
              latitude: body.latitude,
              longitude: body.longitude,
          } },
         { new: true }
      );

      if (!provinceData) {
         return NextResponse.json({
            success: false,
            error: 'مدرسه ای با این شناسه وجود ندارد.',
            data: null,
         });
      }

      return NextResponse.json({
         success: true,
         error: null,
         data: provinceData,
      });
   } catch (e) {
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
