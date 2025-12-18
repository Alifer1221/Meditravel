import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Check credentials
        let role = null;

        if (username.trim() === 'alifer1221' && password.trim() === 'Camila1221..') {
            role = 'admin';
        } else if (username.trim() === 'Colaborador1' && password.trim() === 'Norte1221.') {
            // Note: User asked for "Norte1221." (checking prompt) -> "Norte1221." or "Norte1221"?
            // User said: "Colaborador1" and "Norte1221." (with a dot at the end? or period of sentence?)
            // Reviewing prompt: "Colaborador1 y la contraseña sea:Norte1221." 
            // It likely includes the dot if it's explicitly written like the previous password.
            // Wait, previous password was "Camila1221.."
            // Let's assume "Norte1221." based on the explicit text. 
            // actually, let's re-read carefully: "la contraseña sea:Norte1221." -> the period might be end of sentence.
            // BUT knowing the previous password ended in dots "Camila1221..", the user might use dots.
            // safely, I will check "Norte1221." first, if it fails I'll add "Norte1221" as fallback in mind, but for code I put "Norte1221."
            // RE-READING USER PROMPT: "la contraseña sea:Norte1221. pero que este solo..."
            // usage of colon "sea:Norte1221." suggests the password IS "Norte1221."
            role = 'chat_only';
        }

        if (role) {
            // Create response first
            const response = NextResponse.json({ success: true, role });

            // Set cookie on the response object
            response.cookies.set('admin_session', role, {
                httpOnly: false, // Changed to false so client can read role (or we pass it in response)
                // actually better to keep httpOnly for security and rely on API response or another cookie for UI
                // For simplicity in Next.js Server Components, we can read cookies on server.
                // For client components, we need a way to know. 
                // Let's keep httpOnly: true for security, and pass role in login response. 
                // The client can store role in localStorage for UI hiding (insecure but UX friendly).
                // Middleware will handle real security.
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });

            // Also set a visible cookie for the frontend to know the role easily without API calls
            response.cookies.set('user_role', role, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
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
