import { NextResponse, type NextRequest } from 'next/server';

import Cities from '@/schemas/Cities';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest, { params }) {
   try {
      await connectMongo();
      // Fetch all Cities
      const cityDataFromDB = await Cities.findOne({
         cityUnique: params.id,
      });
      return NextResponse.json({
         success: true,
         error: null,
         data: cityDataFromDB,
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
