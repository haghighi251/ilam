import { NextResponse, type NextRequest } from 'next/server';

import Drivers from '@/schemas/Drivers';
import Parents from '@/schemas/Parent';
import SchoolAdmin from '@/schemas/SchoolAdmin';
import Users from '@/schemas/Users';
import connectMongo from '@/utils/connectMongo';

export async function DELETE(request: NextRequest, { params }) {
   try {
      await connectMongo();

      if (params.id === null || params.id === undefined)
         return NextResponse.json({
            success: false,
            error: 'برای حذف صحیح، کد شناسایی اولیا ارسال نشده است.',
            data: null,
         });

      // Find the document to delete by id
      const userDataFromDB = await Users.findOneAndDelete({
         uniqueCode: params.id,
      });

      // Check the user is exist or not.
      if (!userDataFromDB) {
         return NextResponse.json({
            success: false,
            error: 'کاربری با این کد شناسایی یافت نشد.',
            data: null,
         });
      } else {
         // Remove the parent record if the user is parent.
         if (userDataFromDB.isSchoolAdmin === true) {
            const schoolAdminDataFromDB = await SchoolAdmin.findOne({
               schoolAdminUnique: params.id,
            });
            if (schoolAdminDataFromDB) {
               await SchoolAdmin.findOneAndDelete({
                  schoolAdminUnique: params.id,
               });
            }
         }

         // Remove the parent record if the user is parent.
         if (userDataFromDB.isParent === true) {
            const parentDataFromDB = await Parents.findOne({
               userUnique: params.id,
            });
            if (parentDataFromDB) {
               await Parents.findOneAndDelete({ userUnique: params.id });
            }
         }

         // Remove the driver record if the user is driver.
         if (userDataFromDB.isDriver === true) {
            const driverDataFromDB = await Drivers.findOne({
               userUnique: params.id,
            });
            if (driverDataFromDB) {
               await Drivers.findOneAndDelete({ userUnique: params.id });
            }
         }
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
