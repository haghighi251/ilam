import { NextResponse, type NextRequest } from 'next/server';

import SchoolAdmin from '@/schemas/SchoolAdmin';
import Users from '@/schemas/Users';
import connectMongo from '@/utils/connectMongo';

export async function PATCH(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      if (
         body.mobile === null ||
         body.mobile === undefined ||
         body.uniqueCode === null ||
         body.uniqueCode === undefined
      ) {
         return NextResponse.json({
            success: false,
            error: 'اطلاعات برای ثبت صحیح نمی باشد.',
            data: null,
         });
      }

      const userData = await Users.findOneAndUpdate(
         { uniqueCode: body.uniqueCode },
         {
            $set: {
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
               status: body.status,
               activationCode: body.activationCode,
            },
         },
         { new: false }
      );
      if (
         userData &&
         userData.isSchoolAdmin === true &&
         body.isSchoolAdmin === false
      ) {
         await SchoolAdmin.findOneAndDelete({
            schoolAdminUnique: body.uniqueCode,
         });
      }

      if (!userData) {
         return NextResponse.json({
            success: false,
            error: 'کاربری با این شناسه وجود ندارد.',
            data: null,
         });
      }

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
