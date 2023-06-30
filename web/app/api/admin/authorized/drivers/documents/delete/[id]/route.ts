import { NextResponse, type NextRequest } from 'next/server';

import DriversDocuments from '@/schemas/DriversDocuments';
import connectMongo from '@/utils/connectMongo';

export async function DELETE(request: NextRequest, { params }) {
   try {
      await connectMongo();

      if (params.id === null || params.id === undefined)
         return NextResponse.json({
            success: false,
            error: 'برای حذف صحیح، کد شناسایی مدرک ارسال نشده است.',
            data: null,
         });

      // Find the document to delete by driverDocumentUnique
      const driverDocumentDataFromDB = await DriversDocuments.findOneAndDelete({
         driverDocumentUnique: params.id,
      });

      if (!driverDocumentDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'مدرکی با این کد شناسایی یافت نشد.',
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
