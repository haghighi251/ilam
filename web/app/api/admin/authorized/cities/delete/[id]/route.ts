import { NextResponse, type NextRequest } from 'next/server';

import Cities from '@/schemas/Cities';
import CityCoordinates from '@/schemas/CityCoordinates';
import connectMongo from '@/utils/connectMongo';

export async function DELETE(request: NextRequest, { params }) {
   try {
      await connectMongo();
      // const body = await request.json();
      console.log(params);

      if (params.id === null || params.id === undefined)
         return NextResponse.json({
            success: false,
            error: 'برای حذف صحیح، آی دی ارسال نشده است.',
            data: null,
         });

      // Find the document to delete by cityUnique
      const cityDataFromDB = await Cities.findOneAndDelete({
         cityUnique: params.id,
      });

      if (!cityDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'شهری با این کد شناسایی یافت نشد.',
            data: null,
         });
      else {
         // Find the coordinate records relating to the city
         await CityCoordinates.deleteMany({ cityUnique: params.id });
      }

      return NextResponse.json({
         success: true,
         error: null,
         data: null,
      });
   } catch (e) {
      console.log(e);
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
