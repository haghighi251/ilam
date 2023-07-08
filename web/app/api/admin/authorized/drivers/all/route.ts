import { NextResponse, type NextRequest } from 'next/server';

import Drivers from '@/schemas/Drivers';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest) {
   try {
      await connectMongo();

      // Fetch all Drivers
      const driversDataFromDB = await Drivers.find();

      return NextResponse.json({
         success: true,
         error: null,
         data: driversDataFromDB,
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
