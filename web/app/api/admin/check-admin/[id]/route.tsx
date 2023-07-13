import { NextResponse, type NextRequest } from 'next/server';

import Users from '@/schemas/Users';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest, { params }) {
   try {
      await connectMongo();
      // Fetch all Users
      const userDataFromDB = await Users.findOne({
         _id: params.id,
      });
      if (userDataFromDB.status == true) {
         return NextResponse.json({
            success: true,
            error: null,
            data: userDataFromDB,
         });
      }
      return NextResponse.json({
         success: false,
         error: 'متاسفانه کاربر غیر فعال است.',
         data: null,
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
