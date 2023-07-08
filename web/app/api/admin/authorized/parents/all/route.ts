import { NextResponse, type NextRequest } from 'next/server';

import Parents from '@/schemas/Parent';
import connectMongo from '@/utils/connectMongo';

export async function GET(request: NextRequest) {
   try {
      await connectMongo();

      // Fetch all Parents
      const parentsDataFromDB = await Parents.find();

      return NextResponse.json({
         success: true,
         error: null,
         data: parentsDataFromDB,
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
