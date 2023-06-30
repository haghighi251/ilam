import { NextResponse, type NextRequest } from 'next/server';

import Students from '@/schemas/Students';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest) {
   try {
      await connectMongo();

      // Fetch all Students
      const studentsDataFromDB = await Students.find();

      return NextResponse.json({
         success: true,
         error: null,
         data: studentsDataFromDB,
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
