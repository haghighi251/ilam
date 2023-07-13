export { default } from 'next-auth/middleware';
export const config = {
   matcher: ['/admin/:path*', '/school-admin/:path*'],
   // matcher: ['/admin/dashboard/:path*', '/dashboard/:path*'],
};
