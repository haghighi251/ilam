import { NextResponse, type NextRequest } from 'next/server';

import School from '@/schemas/School';
import connectMongo from '@/utils/connectMongo';

export async function DELETE(request: NextRequest, { params }) {
   try {
      await connectMongo();

      if (params.id === null || params.id === undefined)
         return NextResponse.json({
            success: false,
            error: 'برای حذف صحیح، کد شناسایی یا نام مدرسه ارسال نشده است.',
            data: null,
         });

      // Find the document to delete by schoolUnique
      const schoolDataFromDB = await School.findOneAndDelete({
         schoolUniqueId: params.id,
      });

      if (!schoolDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'مدرسه با این کد شناسایی یافت نشد.',
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
