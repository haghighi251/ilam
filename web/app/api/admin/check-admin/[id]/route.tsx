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
      return NextResponse.json({
         success: true,
         error: null,
         data: userDataFromDB,
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
