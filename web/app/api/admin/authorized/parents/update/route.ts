import { NextResponse, type NextRequest } from 'next/server';

import connectMongo from '@/utils/connectMongo';
import Parents from '@/schemas/Parent';

export async function PATCH(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (
         body.userUnique === null ||
         body.userUnique === undefined ||
         body.studentUnique === null ||
         body.studentUnique === undefined
      ) {
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });
      }

      const parentData = await Parents.findOneAndUpdate(
         { parentUnique: body.parentUnique },
         {
            $set: {
               userUnique: body.userUnique,
               studentUnique: body.studentUnique,
            },
         },
         { new: true }
      );

      if (!parentData) {
         return NextResponse.json({
            success: false,
            error: 'کاربری ای با این شناسه وجود ندارد.',
            data: null,
         });
      }

      return NextResponse.json({
         success: true,
         error: null,
         data: parentData,
      });
   } catch (e) {
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
