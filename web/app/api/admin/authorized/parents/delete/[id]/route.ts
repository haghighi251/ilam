import { NextResponse, type NextRequest } from 'next/server';

import Parents from '@/schemas/Parent';
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
      const parentDataFromDB = await Parents.findOneAndDelete({
         parentUniqueId: params.id,
      });

      if (!parentDataFromDB)
         return NextResponse.json({
            success: false,
            error: 'اولیا ای با این کد شناسایی یافت نشد.',
            data: null,
         });
      else {
         await Users.findOneAndUpdate(
            { uniqueCode: parentDataFromDB.userUniqueCode },
            { $set: { status: false } },
            { new: true }
         );
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
