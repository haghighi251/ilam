import { NextResponse, type NextRequest } from 'next/server';

import School from '@/schemas/School';
import connectMongo from '@/utils/connectMongo';
import { ISchoolSchema } from '@/utils/types';

export async function POST(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (
         body.name === null ||
         body.name === undefined ||
         body.cityUnique === null ||
         body.cityUnique === undefined
      )
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });

      // We have to check if the request is for a new school or not.
      const schoolDataFromDB = await School.findOne({
         name: body.name,
         latitude: body.latitude,
         longitude: body.longitude,
         cityUnique: body.cityUnique,
      });

      if (schoolDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'این مدرسه قبلا وارد شده است.',
            data: null,
         });

      const randomNumber = Math.floor(Math.random() * 1000000)
         .toString()
         .padStart(6, '0');

      const newSchool: ISchoolSchema = new School({
         name: body.name,
         schoolUniqueId: randomNumber,
         latitude: body.latitude,
         longitude: body.longitude,
         cityUnique: body.cityUnique,
      });

      await newSchool
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
