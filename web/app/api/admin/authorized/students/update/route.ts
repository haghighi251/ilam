import { NextResponse, type NextRequest } from 'next/server';

import Students from '@/schemas/Students';
import connectMongo from '@/utils/connectMongo';

export async function PATCH(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();
      console.log(body);

      if (
         body.name === null ||
         body.name === undefined ||
         body.nationalCode === undefined ||
         body.nationalCode === undefined
      ) {
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });
      }

      const studentData = await Students.findOneAndUpdate(
         { studentUnique: body.studentUnique },
         {
            $set: {
               name: body.name,
               nationalCode: body.nationalCode,
               schoolUniqueId: body.schoolUniqueId,
               driverUnique: body.driverUnique,
               parentUnique: body.parentUnique,
            },
         },
         { new: true }
      );

      if (!studentData) {
         return NextResponse.json({
            success: false,
            error: 'دانش آموزی ای با این شناسه وجود ندارد.',
            data: null,
         });
      }

      return NextResponse.json({
         success: true,
         error: null,
         data: studentData,
      });
   } catch (e) {
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
