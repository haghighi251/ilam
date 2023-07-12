import { NextResponse, type NextRequest } from 'next/server';

import Drivers from '@/schemas/Drivers';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest, { params }) {
   try {
      await connectMongo();

      // Get the driver with user unique code
      const driverDataFromDB = await Drivers.findOne({
         userUniqueCode: params.id,
      });

      return NextResponse.json({
         success: true,
         error: null,
         data: driverDataFromDB,
      });
   } catch (e) {
      console.error(e);
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
