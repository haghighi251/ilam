import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   const isAdmin = cookies().get('isAdmin')?.value;
   const isSchoolAdmin = cookies().get('isSchoolAdmin')?.value;

   if (request.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
   } else if (request.nextUrl.pathname.startsWith('/admin') && isAdmin) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
   }

   if (request.nextUrl.pathname.startsWith('/school-admin') && !isSchoolAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
   } else if (
      request.nextUrl.pathname.startsWith('/school-admin') &&
      isSchoolAdmin
   ) {
      return NextResponse.redirect(
         new URL('/school-admin/dashboard', request.url)
      );
   }
}
