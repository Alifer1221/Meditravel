import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, date, time } = body; // date is ISO string

        // MOCK MODE: If credentials are not set, simulate success for testing
        if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.warn("⚠️  Mock Mode: Missing Google Credentials. Returning fake success.");

            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            return NextResponse.json({
                success: true,
                meetLink: "https://meet.google.com/mock-link-abc-123",
                mock: true
            });
        }

        // 1. Authenticate with Google
        // Handle various Private Key formats (Vercel env vars can be tricky with newlines)
        const rawKey = process.env.GOOGLE_PRIVATE_KEY || '';
        let privateKey = rawKey;

        // If it contains literal "\n" characters (common when pasting into Vercel web UI), replace them
        if (privateKey.includes('\\n')) {
            privateKey = privateKey.replace(/\\n/g, '\n');
        }

        // Ensure it's wrapped in correct headers if missing (unlikely if user pasted full file, but good safety)
        if (!privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
            // Attempt to fix or just log warning (but let it fail downstream if really bad)
            console.warn("Private Key might be malformed");
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: privateKey,
            },
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });

        const calendar = google.calendar({ version: 'v3', auth });

        // 2. Calculate Start/End Times
        // Assuming 'time' is like "09:00 AM" and 'date' is a full date string
        // We need to construct a strict ISO Date object

        // Parse the selected date and time to create start/end Date objects
        const startDateTime = new Date(date);
        // Note: The frontend should ideally send a full ISO string for the start time
        // But for now let's parse the simple mock time if needed, or rely on frontend sending correct combined date

        // Let's assume frontend sends correct "date" (YYYY-MM-DD) and "time" (HH:MM)
        // For simplicity, let's construct it here:
        const [timeStr, modifier] = time.split(' ');
        let [hours, minutes] = timeStr.split(':');
        if (hours === '12') hours = '00';
        if (modifier === 'PM') hours = parseInt(hours, 10) + 12;

        startDateTime.setHours(hours, minutes, 0, 0);

        const endDateTime = new Date(startDateTime);
        endDateTime.setMinutes(endDateTime.getMinutes() + 30); // 30 min duration

        // 3. Create Google Calendar Event
        const eventResponse = await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
            calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
            // conferenceDataVersion: 1, // REMOVED to prevent "Invalid conference type value"
            requestBody: {
                summary: `Consulta MedicTravel: ${name}`,
                description: `Consulta inicial con ${name} (${email}).`,
                start: { dateTime: startDateTime.toISOString() },
                end: { dateTime: endDateTime.toISOString() },
                // attendees: [{ email: email }], // REMOVED: Service Accounts cannot invite attendees
                // conferenceData: REMOVED to prevent error. Service Account cannot auto-generate Meet links on personal calendars.
            },
        });

        // Use hangoutLink if available, otherwise use the Event Link (htmlLink)
        const meetLink = eventResponse.data.hangoutLink || eventResponse.data.htmlLink;

        // 4. Send Email Confirmation
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Or use SMTP settings
                auth: {
                    user: process.env.EMAIL_USER, // Your sending email
                    pass: process.env.EMAIL_PASS, // App Password
                },
            });

            await transporter.sendMail({
                from: '"MedicTravel Team" <citas@medictravel.com>',
                to: email,
                subject: 'Confirmación de Cita / Appointment Confirmation',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h1 style="color: #005c97;">Confirmación de Cita</h1>
                        <p>Hola <strong>${name}</strong>,</p>
                        <p>Tu cita ha sido agendada exitosamente.</p>
                        <p><strong>Fecha:</strong> ${startDateTime.toLocaleDateString()}</p>
                        <p><strong>Hora:</strong> ${time}</p>
                        
                        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; font-weight: bold;">Ver Cita en Calendario / Join:</p>
                            <a href="${meetLink}" style="color: #005c97; font-size: 16px;">Click aquí para ver detalles</a>
                        </div>

                        <p>Si necesitas reprogramar, por favor contáctanos.</p>
                        <hr>
                        <p>Hello <strong>${name}</strong>,</p>
                        <p>Your appointment has been successfully scheduled.</p>
                        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p style="margin: 0; font-weight: bold;">View Appointment / Join:</p>
                            <a href="${meetLink}" style="color: #005c97; font-size: 16px;">Click here for details</a>
                        </div>
                    </div>
                `,
            });
        }

        return NextResponse.json({ success: true, meetLink });

    } catch (error) {
        console.error('Scheduling Error:', error);
        // Return the specific error message to help the user debug (e.g., "Invalid Credentials", "Not Found")
        const errorMessage = error.message || 'Unknown error occurred';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
}
