import { NextResponse, type NextRequest } from 'next/server';

import Parents from '@/schemas/Parent';
import connectMongo from '@/utils/connectMongo';
import { IParentsSchema } from '@/utils/types';

export async function POST(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (
         body.userUnique === null ||
         body.userUnique === undefined ||
         body.studentUnique === null ||
         body.studentUnique === undefined
      )
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });

      // We have to check if the request is for a new Parents or not.
      const parentDataFromDB = await Parents.findOne({
         userUnique: body.userUnique,
         studentUnique: body.studentUnique,
      });

      if (parentDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'این کاربر قبلا ثبت شده است.',
            data: null,
         });

      const randomNumber = Math.floor(Math.random() * 1000000)
         .toString()
         .padStart(6, '0');

      const newParent: IParentsSchema = new Parents({
         userUnique: body.userUnique,
         parentUnique: randomNumber,
         studentUnique: body.studentUnique,
      });

      await newParent
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
