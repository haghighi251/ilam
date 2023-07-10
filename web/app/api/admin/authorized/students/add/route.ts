import { NextResponse, type NextRequest } from 'next/server';

import Students from '@/schemas/Students';
import connectMongo from '@/utils/connectMongo';
import { IStudentsSchema } from '@/utils/types';

export async function POST(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (
         body.name === null ||
         body.name === undefined ||
         body.nationalCode === null ||
         body.nationalCode === undefined
      )
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });

      // We have to check if the request is for a new Students or not.
      const studentsDataFromDB = await Students.findOne({
         name: body.name,
         nationalCode: body.nationalCode,
         schoolUniqueId: body.schoolUniqueId,
      });

      if (studentsDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'این دانش آموز قبلا ثبت شده است.',
            data: null,
         });

      const randomNumber = Math.floor(Math.random() * 1000000)
         .toString()
         .padStart(6, '0');

      const newStudent: IStudentsSchema = new Students({
         name: body.name,
         nationalCode: body.nationalCode,
         studentUnique: randomNumber,
         schoolUniqueId: body.schoolUniqueId,
         driverUnique: body.driverUnique,
         parentUnique: body.parentUnique,
         homeLatitude: body.homeLatitude,
         homeLongitude: body.homeLongitude,
         homeDetails: body.homeDetails,
      });

      await newStudent
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
