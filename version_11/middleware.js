import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Define protected routes
    const isProtected = path.startsWith('/admin');
    const isLogin = path === '/admin/login';

    // Check for admin session cookie
    const token = request.cookies.get('admin_session');

    // Authorization Logic
    if (isProtected && !isLogin) {
        if (!token) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        const role = token.value;

        // Block 'chat_only' users from accessing anything except /admin/chat
        if (role === 'chat_only' && path !== '/admin/chat') {
            return NextResponse.redirect(new URL('/admin/chat', request.url));
        }
    }

    // Role-based login redirection
    if (isLogin && token) {
        const role = token.value;
        if (role === 'chat_only') {
            return NextResponse.redirect(new URL('/admin/chat', request.url));
        }
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
