import { NextResponse, type NextRequest } from 'next/server';

import Students from '@/schemas/Students';
import connectMongo from '@/utils/connectMongo';

export async function DELETE(request: NextRequest, { params }) {
   try {
      await connectMongo();

      if (params.id === null || params.id === undefined)
         return NextResponse.json({
            success: false,
            error: 'برای حذف صحیح، کد شناسایی دانش آموز ارسال نشده است.',
            data: null,
         });

      // Find the document to delete by studentUnique
      const studentDataFromDB = await Students.findOneAndDelete({
         studentUnique: params.id,
      });

      if (!studentDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'دانش آموزی با این کد شناسایی یافت نشد.',
            data: null,
         });

      return NextResponse.json({
         success: true,
         error: null,
         data: null,
      });
   } catch (e) {
      console.log(e);
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
