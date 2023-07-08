import { NextResponse, type NextRequest } from 'next/server';

import School from '@/schemas/School';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest) {
   try {
      await connectMongo();

      // Fetch all School
      const schoolsDataFromDB = await School.find();

      return NextResponse.json({
         success: true,
         error: null,
         data: schoolsDataFromDB,
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
