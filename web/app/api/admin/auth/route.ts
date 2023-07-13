import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse, type NextRequest } from 'next/server';

import UsersSchema from '@/schemas/Users';
import connectMongo from '@/utils/connectMongo';

export async function POST(request: NextRequest) {
   try {
      await connectMongo();
      const body = await request.json();

      // We have to check if the request is for a new user or not.
      const user = await UsersSchema.findOne({
         $or: [
            { mobile: body.usernameOrEmail },
            { username: body.usernameOrEmail },
            { email: body.usernameOrEmail },
         ],
      });

      if (user) {
         // We added this part just for the passwords which will manually be added to the database user.password field. It should be removed after handling the user creation from admin panel.
         let hashedPassword = user.password;
         if (user.password === body.password) {
            hashedPassword = await bcrypt.hash(user.password, 10);
         }

         // We have to check the password
         const correctPassword = await bcrypt.compare(
            body.password,
            hashedPassword
         );
         if (!correctPassword) {
            return NextResponse.json({
               success: false,
               error: 'اطلاعات برای ورود صحیح نمی باشد.',
               data: null,
            });
         }

         // Setting admin cookie. It'll be used for subsequent requests.
         const token = jwt.sign(
            {
               id: user._id,
               isAdmin: user.isAdmin,
            },
            process.env.JWT!
         );
         let response = NextResponse.next();
         response.cookies.set('access_token', token);

         return NextResponse.json({
            success: true,
            error: null,
            data: {
               status: user.status,
               user_id: user._id,
               usernameOrEmail: user.username || user.mobile || user.email,
               mobile: user.mobile,
               uniqueCode: user.uniqueCode,
            },
         });
      } else {
         return NextResponse.json({
            success: false,
            error: 'کاربری با مشخصات شما پیدا نشد.',
            data: null,
         });
      }
   } catch (e) {
      console.log(e);
      return NextResponse.json({
         success: false,
         error: 'خطایی در سرور رخ داده است. لطفا لحظاتی دیگر مجددا تلاش نمایید.',
         data: null,
      });
   }
}
