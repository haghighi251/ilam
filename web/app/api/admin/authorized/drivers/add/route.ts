import { NextResponse, type NextRequest } from 'next/server';

import Drivers from '@/schemas/Drivers';
import Users from '@/schemas/Users';
import connectMongo from '@/utils/connectMongo';
import { IDriversSchema } from '@/utils/types';

export async function POST(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (
         body.mobile === null ||
         body.mobile === undefined ||
         body.schoolUniqueId === null ||
         body.schoolUniqueId === undefined
      )
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });

      // We have to check if the request is for a new driver or not.
      const driverDataFromDB = await Drivers.findOne({ mobile: body.mobile });

      if (driverDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'این راننده قبلا وارد شده است.',
            data: null,
         });

      // To merge the user data with the driver data based on mobile number.
      const userDataFromDB = await Users.findOne({ mobile: body.mobile });

      const randomNumber = Math.floor(Math.random() * 1000000)
         .toString()
         .padStart(6, '0');

      const newDriver: IDriversSchema = new Drivers({
         userUniqueCode: userDataFromDB.userUniqueCode,
         driverUniqueId: randomNumber,
         schoolUniqueId: body.schoolUniqueId,
      });

      await newDriver
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
