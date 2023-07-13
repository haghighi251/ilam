import { NextResponse, type NextRequest } from 'next/server';

import SchoolAdmin from '@/schemas/SchoolAdmin';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest, { params }) {
   try {
      await connectMongo();
      // Fetch the SchoolAdmin data from DB.
      const schoolAdminDataFromDB = await SchoolAdmin.findOne({
         schoolAdminUnique: params.uniqueCode,
      });
      return NextResponse.json({
         success: true,
         error: null,
         data: schoolAdminDataFromDB,
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