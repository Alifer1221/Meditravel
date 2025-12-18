import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Hardcoded credentials as requested
        if (username.trim() === 'alifer1221' && password.trim() === 'Camila1221..') {

            // Create response first
            const response = NextResponse.json({ success: true });

            // Set cookie on the response object
            response.cookies.set('admin_session', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });

            return response;
        }

        return NextResponse.json({ success: false, message: 'Credenciales inválidas' }, { status: 401 });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ success: false, message: 'Error del servidor: ' + error.message }, { status: 500 });
    }
}
