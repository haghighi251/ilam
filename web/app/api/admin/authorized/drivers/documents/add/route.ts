import { NextResponse, type NextRequest } from 'next/server';

import DriversDocuments from '@/schemas/DriversDocuments';
import connectMongo from '@/utils/connectMongo';
import { IDriversDocumentsSchema } from '@/utils/types';

export async function POST(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (
         body.driverUniqueId === null ||
         body.driverUniqueId === undefined ||
         body.documentName === null ||
         body.documentName === undefined ||
         body.file === null ||
         body.file === undefined
      )
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });

      // We have to check if the request is for a new DriverDocument or not.
      const driverDocumentDataFromDB = await DriversDocuments.findOne({
         driverUniqueId: body.driverUniqueId,
         documentName: body.documentName,
         file: body.file,
      });

      if (driverDocumentDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'این مدرک قبلا وارد شده است.',
            data: null,
         });

      const randomNumber = Math.floor(Math.random() * 1000000)
         .toString()
         .padStart(6, '0');

      const newDriversDocuments: IDriversDocumentsSchema = new DriversDocuments(
         {
            driverDocumentUnique: randomNumber,
            driverUniqueId: body.driverUniqueId,
            documentName: body.documentName,
            file: body.file,
         }
      );

      await newDriversDocuments
         .save()
         .then(() => {
            return NextResponse.json({
               success: true,
               error: null,
               data: null,
            });
         })
         .catch(() => {
            return NextResponse.json({
               success: false,
               error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
               data: null,
            });
         });

      return NextResponse.json({
         success: true,
         error: null,
         data: null,
      });
   } catch (e) {
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
