import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Define protected routes
    const isProtected = path.startsWith('/admin');
    const isLogin = path === '/admin/login';

    // Check for admin session cookie
    const token = request.cookies.get('admin_session');

    // If trying to access admin pages (not login) without token
    if (isProtected && !isLogin && !token) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If trying to access login page WITH token, redirect to dashboard
    if (isLogin && token) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
