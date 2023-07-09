import { NextResponse, type NextRequest } from 'next/server';

import Students from '@/schemas/Students';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest, { params }) {
   try {
      await connectMongo();
      // Fetch the Students
      const studentDataFromDB = await Students.find({
         driverUnique: params.id,
      });
      return NextResponse.json({
         success: true,
         error: null,
         data: studentDataFromDB,
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
