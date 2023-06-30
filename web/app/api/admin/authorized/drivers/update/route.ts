import { NextResponse, type NextRequest } from 'next/server';

import Drivers from '@/schemas/Drivers';
import connectMongo from '@/utils/connectMongo';

export async function PATCH(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (
         body.driverUniqueId === null ||
         body.driverUniqueId === undefined ||
         body.score === null ||
         body.score === undefined
      ) {
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });
      }

      const driverData = await Drivers.findOneAndUpdate(
         { uniqueCode: body.driverUniqueId },
         { $set: { score: body.score } },
         { new: true }
      );

      if (!driverData) {
         return NextResponse.json({
            success: false,
            error: 'مشخصات راننده تغییر نکرد.',
            data: null,
         });
      }

      return NextResponse.json({
         success: true,
         error: null,
         data: driverData,
      });
   } catch (e) {
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
