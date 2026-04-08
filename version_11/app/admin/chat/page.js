'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function AdminChatPage() {
    const [sessions, setSessions] = useState([]);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null); // Ref to store timer

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // 1. Fetch List of Sessions
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await fetch('/api/chat?admin=true');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setSessions(data);
                }
            } catch (error) {
                console.error("Error fetching sessions");
            }
        };

        fetchSessions();
        const interval = setInterval(fetchSessions, 3000);
        return () => clearInterval(interval);
    }, []);

    // 2. Fetch Active Chat History
    useEffect(() => {
        if (!selectedSessionId) return;

        const fetchHistory = async () => {
            try {
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'get_history',
                        sessionId: selectedSessionId
                    })
                });
                const data = await res.json();
                if (Array.isArray(data)) {
                    setSelectedMessages(data);
                }
            } catch (error) {
                // Fail
            }
        };

        fetchHistory();
        const interval = setInterval(fetchHistory, 2000);
        return () => clearInterval(interval);

    }, [selectedSessionId]);

    // Scroll on new message
    useEffect(() => {
        scrollToBottom();
    }, [selectedMessages]);

    // 3. Handle Input & Typing Indicator
    const handleInputChange = (e) => {
        setInputText(e.target.value);

        if (!selectedSessionId) return;

        // Clear existing timer
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Send "typing: true" (Optimized: only sending if not already sent recently could be better, but acceptable for demo)
        // Ideally we check a flag like 'isTypingSent' but ensuring 'true' is sent is fine.
        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'typing', sessionId: selectedSessionId, status: true })
        }).catch(() => { });

        // Set timer to send "typing: false" after 2s of inactivity
        typingTimeoutRef.current = setTimeout(() => {
            fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'typing', sessionId: selectedSessionId, status: false })
            }).catch(() => { });
        }, 2000);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || !selectedSessionId) return;

        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

        const text = inputText;
        setInputText('');

        try {
            await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'message',
                    sessionId: selectedSessionId,
                    text: text,
                    sender: 'admin'
                })
            });
            // Refetch will happen on interval
        } catch (error) {
            console.error("Error sending");
        }
    };

    return (
        <div className={styles.container}>
            {/* Sidebar: Session List */}
            <div className={styles.userList}>
                <div className={styles.listHeader}>Usuarios Activos</div>
                <div className={styles.sessionsContainer}>
                    {sessions.map((session) => (
                        <div
                            key={session.sessionId}
                            className={`${styles.sessionItem} ${selectedSessionId === session.sessionId ? styles.active : ''}`}
                            onClick={() => setSelectedSessionId(session.sessionId)}
                        >
                            <span className={styles.userName}>{session.user.name}</span>
                            <span className={styles.userEmail}>{session.user.email}</span>
                            <div className={styles.preview}>
                                {session.lastMessage?.text || '...'}
                            </div>
                        </div>
                    ))}
                    {sessions.length === 0 && (
                        <div style={{ padding: '20px', color: '#94a3b8', textAlign: 'center' }}>
                            No hay conversaciones activas.
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={styles.chatArea}>
                {!selectedSessionId ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>💬</div>
                        <h3>Selecciona una conversación</h3>
                        <p>Haz clic en un usuario para ver el historial y responder.</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.chatHeader}>
                            <h2>Chat en vivo</h2>
                        </div>

                        <div className={styles.messagesScroll}>
                            {selectedMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`${styles.messageRow} ${msg.sender === 'admin' ? styles.admin : styles.user}`}
                                >
                                    <div className={styles.bubble}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSend} className={styles.inputWrapper}>
                            <input
                                type="text"
                                value={inputText}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Escribe al usuario..."
                            />
                            <button type="submit" className={styles.sendBtn}>Enviar</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
