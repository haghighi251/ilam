import { NextResponse, type NextRequest } from 'next/server';

import School from '@/schemas/School';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest, { params }) {
   try {
      await connectMongo();
      // Fetch the School
      const schoolDataFromDB = await School.findOne({
         schoolUniqueId: params.id,
      });
      return NextResponse.json({
         success: true,
         error: null,
         data: schoolDataFromDB,
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
