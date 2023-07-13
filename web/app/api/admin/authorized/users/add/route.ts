import { NextResponse, type NextRequest } from 'next/server';

import SchoolAdmin from '@/schemas/SchoolAdmin';
import Users from '@/schemas/Users';
import connectMongo from '@/utils/connectMongo';
import { ISchoolAdminSchema, IUsersSchema } from '@/utils/types';

export async function POST(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (body.mobile === null || body.mobile === undefined)
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });

      // We have to check if the request is for a new Users or not.
      const userDataFromDB = await Users.findOne({
         mobile: body.mobile,
      });

      if (userDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'این کاربر قبلا ثبت شده است.',
            data: null,
         });

      const randomNumber = Math.floor(Math.random() * 1000000)
         .toString()
         .padStart(6, '0');

      const newUser: IUsersSchema = new Users({
         username: body.username,
         mobile: body.mobile,
         email: body.email,
         password: body.password,
         nickname: body.nickname,
         picture: body.picture,
         isAdmin: body.isAdmin,
         isDriver: body.isDriver,
         isParent: body.isParent,
         isSchoolAdmin: body.isSchoolAdmin,
         isCityAdmin: body.isCityAdmin,
         isProvinceAdmin: body.isProvinceAdmin,
         uniqueCode: randomNumber,
         status: body.status,
         activationCode: body.activationCode,
      });
      try {
         await newUser.save();

         // To Create SchoolAdmin record in database if the user is a school admin.
         console.log(body.schoolUniqueId);
         if (body.schoolUniqueId !== '') {
            const newSchoolAdmin: ISchoolAdminSchema = new SchoolAdmin({
               schoolAdminUnique: randomNumber,
               schoolUniqueId: body.schoolUniqueId,
            });
            await newSchoolAdmin.save();
         }

         return NextResponse.json({
            success: true,
            error: null,
            data: null,
         });
      } catch (error) {
         console.error(error);
         return NextResponse.json({
            success: false,
            error: error.message,
            data: null,
         });
      }
   } catch (e) {
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
