import { NextResponse, type NextRequest } from 'next/server';

import DriversDocuments from '@/schemas/DriversDocuments';
import connectMongo from '@/utils/connectMongo';

export async function PATCH(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (
         body.driverDocumentUnique === null ||
         body.driverDocumentUnique === undefined ||
         body.documentName === null ||
         body.documentName === undefined ||
         body.file === null ||
         body.file === undefined
      ) {
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });
      }

      const driverDocumentData = await DriversDocuments.findOneAndUpdate(
         { driverDocumentUnique: body.driverDocumentUnique },
         {
            $set: {
               documentName: body.documentName,
               file: body.file,
            },
         },
         { new: true }
      );

      if (!driverDocumentData) {
         return NextResponse.json({
            success: false,
            error: 'مدرکی با این شناسه وجود ندارد.',
            data: null,
         });
      }

      return NextResponse.json({
         success: true,
         error: null,
         data: driverDocumentData,
      });
   } catch (e) {
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
