import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import IUsersSchema from '@/schemas/Users';
import connectMongo from '@/utils/connectMongo';

export const options: NextAuthOptions = {
   providers: [
      CredentialsProvider({
         id: 'admins-login',
         name: 'Admins',
         credentials: {
            username: {
               label: 'Username',
               type: 'text',
               placeholder: 'نام کاربری',
            },
            password: {
               label: 'Password',
               type: 'password',
               placeholder: 'رمز عبور',
            },
         },
         async authorize(credentials) {
            //This is where you need to retrieve the user from your database
            await connectMongo();

            // We have to check if the request is for a new user or not.
            const user = await IUsersSchema.findOne({
               $or: [
                  { mobile: credentials?.username },
                  { username: credentials?.username },
                  { email: credentials?.username },
               ],
            });
            if (
               (credentials?.username === user.username ||
                  credentials?.username === user.mobile ||
                  credentials?.username === user.email) &&
               credentials?.password === user.password
            ) {
               return user;
            } else {
               return null;
            }
         },
      }),
      CredentialsProvider({
         id: 'users-login',
         name: 'Users',
         credentials: {
            mobile: {
               label: 'تلفن همراه',
               type: 'text',
               placeholder: '۰۹۱۲۳۴۵۶۷۸۹',
            },
            activationCode: {
               label: 'کد فعال سازی',
               type: 'text',
               placeholder: 'کد فعال سازی',
            },
         },
         async authorize(credentials) {
            //This is where you need to retrieve the user from your database

            // We have to check if the request is for a new user or not.
            const user = await IUsersSchema.findOne({
               $or: [{ mobile: credentials?.mobile }],
            });
            if (
               credentials?.mobile === user.mobile &&
               credentials?.activationCode === user.activationCode
            ) {
               return user;
            } else {
               return null;
            }
         },
      }),
   ],
};
