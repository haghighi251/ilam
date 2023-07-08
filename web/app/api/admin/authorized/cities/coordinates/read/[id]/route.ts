import { NextResponse, type NextRequest } from 'next/server';

import CityCoordinates from '@/schemas/CityCoordinates';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest, { params }) {
   try {
      await connectMongo();

      // Fetch all provinces
      const cityCoordinateDataFromDB = await CityCoordinates.find({
         cityUnique: params.id,
      });

      return NextResponse.json({
         success: true,
         error: null,
         data: cityCoordinateDataFromDB,
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
