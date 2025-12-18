import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ChatSession from '@/models/ChatSession';

// Fallback in-memory store (for when DB is not configured)
let memorySessions = {};

export const dynamic = 'force-dynamic';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    const sessionId = searchParams.get('sessionId');

    // Attempt DB Connection
    const db = await dbConnect();

    if (isAdmin) {
        let sessionList = [];
        if (db) {
            // DB Fetch
            const docs = await ChatSession.find().sort({ lastActive: -1 }).lean();
            sessionList = docs.map(doc => ({
                sessionId: doc.sessionId,
                user: doc.user,
                lastMessage: doc.messages[doc.messages.length - 1],
                unreadCount: 0,
                lastActive: doc.lastActive
            }));
        } else {
            // Memory Fetch
            sessionList = Object.entries(memorySessions).map(([id, data]) => ({
                sessionId: id,
                user: data.user,
                lastMessage: data.messages[data.messages.length - 1],
                unreadCount: 0,
                lastActive: data.lastActive
            })).sort((a, b) => b.lastActive - a.lastActive);
        }
        return NextResponse.json(sessionList);
    }

    if (sessionId) {
        let sessionData = null;

        if (db) {
            sessionData = await ChatSession.findOne({ sessionId }).lean();
        } else {
            sessionData = memorySessions[sessionId];
        }

        if (sessionData) {
            return NextResponse.json({
                messages: sessionData.messages,
                isAdminTyping: sessionData.isAdminTyping || false
            });
        } else {
            // Session not found in DB -> 404 to trigger frontend re-registration
            return NextResponse.json({ message: 'Session not found' }, { status: 404 });
        }
    }

    return NextResponse.json([]);
}

export async function POST(request) {
    const body = await request.json();
    const { action, sessionId, name, email, text, sender, status } = body;
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    const db = await dbConnect();

    // 1. REGISTER
    if (action === 'register') {
        const sessionId = Date.now().toString() + Math.random().toString(36).substring(7);

        // Initial welcome message
        const welcomeMessage = {
            id: Date.now(),
            text: `Hola ${name}, bienvenido a nuestro soporte. ¿En qué podemos ayudarte hoy?`,
            sender: 'system',
            timestamp: Date.now()
        };

        if (db) {
            // Check if user with this email already exists
            let existingSession = await ChatSession.findOne({ "user.email": email });

            if (existingSession) {
                // Reuse existing session: Reset messages and update info
                existingSession.messages = [welcomeMessage];
                existingSession.user.name = name; // Update name in case it changed
                existingSession.user.ip = ip;
                existingSession.lastActive = Date.now();
                existingSession.isAdminTyping = false;

                await existingSession.save();

                return NextResponse.json({
                    success: true,
                    sessionId: existingSession.sessionId,
                    message: 'Session resumed and reset'
                });
            } else {
                // Create new session if email not found
                await ChatSession.create({
                    sessionId,
                    user: { name, email, ip },
                    messages: [welcomeMessage],
                    lastActive: Date.now(),
                    isAdminTyping: false
                });
                return NextResponse.json({ success: true, sessionId });
            }
        } else {
            // Fallback for memory (dev mode without DB)
            // Note: In memory, we might not efficiently search by email given the structure, 
            // but the main goal is DB deduplication.
            memorySessions[sessionId] = {
                sessionId,
                user: { name, email, ip },
                messages: [welcomeMessage],
                lastActive: Date.now(),
                isAdminTyping: false
            };
            return NextResponse.json({ success: true, sessionId });
        }
    }

    // 2. MESSAGE
    if (action === 'message') {
        if (!sessionId) {
            return NextResponse.json({ success: false, message: 'No session ID' }, { status: 400 });
        }

        const newMessage = {
            id: Date.now(),
            sender,
            text,
            timestamp: Date.now()
        };

        if (db) {
            // DB Update
            let session = await ChatSession.findOne({ sessionId });

            if (!session) {
                // Resurrection Logic (DB)
                if (sender === 'user') {
                    session = await ChatSession.create({
                        sessionId,
                        user: { name: 'Visitante (Recuperado)', email: '...', ip },
                        messages: [],
                        lastActive: Date.now(),
                        isAdminTyping: false
                    });
                } else {
                    return NextResponse.json({ success: false, message: 'Session not found' }, { status: 404 });
                }
            }

            session.messages.push(newMessage);
            session.lastActive = Date.now();
            if (sender === 'admin') session.isAdminTyping = false;
            await session.save();

        } else {
            // Memory Update
            if (!memorySessions[sessionId]) {
                // Resurrection Logic (Memory)
                if (sender === 'user') {
                    memorySessions[sessionId] = {
                        user: { name: 'Visitante (Recuperado)', email: '...', ip },
                        messages: [],
                        lastActive: Date.now(),
                        isAdminTyping: false
                    };
                } else {
                    return NextResponse.json({ success: false, message: 'Session expired' }, { status: 404 });
                }
            }
            memorySessions[sessionId].messages.push(newMessage);
            memorySessions[sessionId].lastActive = Date.now();
            if (sender === 'admin') memorySessions[sessionId].isAdminTyping = false;
        }

        return NextResponse.json({ success: true, message: newMessage });
    }

    // 3. TYPING STATUS
    if (action === 'typing') {
        if (db) {
            await ChatSession.findOneAndUpdate({ sessionId }, { isAdminTyping: status });
        } else {
            if (sessionId && memorySessions[sessionId]) {
                memorySessions[sessionId].isAdminTyping = status;
            }
        }
        return NextResponse.json({ success: true });
    }

    // 4. HISTORY (Redundant with GET logic but kept for compatibility)
    if (action === 'get_history') {
        let messages = [];
        if (db) {
            const session = await ChatSession.findOne({ sessionId }).lean();
            messages = session ? session.messages : [];
        } else {
            messages = memorySessions[sessionId] ? memorySessions[sessionId].messages : [];
        }
        return NextResponse.json(messages);
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
}
