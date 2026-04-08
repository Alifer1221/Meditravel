'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import styles from './ChatAssistant.module.css';

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isAdminTyping, setIsAdminTyping] = useState(false); // Typing state

    // Resume/Restart State
    const [showResumeOption, setShowResumeOption] = useState(false);

    // Cache buster log
    useEffect(() => { console.log("ChatAssistant Loaded - Icon Version: Doctor Silhouette v4 BASE64"); }, []);

    const [pendingSessionId, setPendingSessionId] = useState(null);

    // Registration State
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const messagesEndRef = useRef(null);
    const pathname = usePathname();

    // Check localStorage on mount
    useEffect(() => {
        const storedId = localStorage.getItem('chat_session_id');
        if (storedId) {
            setPendingSessionId(storedId);
            setShowResumeOption(true);
        }
    }, []);

    // Hide chat on admin pages
    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Poll for messages (Only if active session)
    useEffect(() => {
        if (!sessionId) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/chat?sessionId=${sessionId}`, { cache: 'no-store' });

                if (res.status === 404) {
                    // Session invalid/expired (e.g. DB clear) -> Reset to show Form
                    localStorage.removeItem('chat_session_id');
                    setSessionId(null);
                    setMessages([]);
                    return;
                }

                if (res.ok) {
                    const data = await res.json();

                    // Handle API response Structure { messages: [], isAdminTyping: boolean }
                    if (data.messages && Array.isArray(data.messages)) {
                        setMessages(data.messages);
                        setIsAdminTyping(data.isAdminTyping);
                    } else if (Array.isArray(data)) {
                        // Fallback for old API structure (just array)
                        setMessages(data);
                    }
                }
            } catch (error) {
                // Silent fail
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 2000); // Polling 2s
        return () => clearInterval(interval);
    }, [sessionId]);

    useEffect(() => {
        if (isOpen && sessionId) {
            scrollToBottom();
        }
    }, [messages, isOpen, isAdminTyping, sessionId]); // Scroll when typing changes too

    const handleResume = () => {
        setSessionId(pendingSessionId);
        setShowResumeOption(false);
    };

    const handleRestart = () => {
        localStorage.removeItem('chat_session_id');
        setPendingSessionId(null);
        setSessionId(null);
        setShowResumeOption(false);
        setMessages([]);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsRegistering(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'register',
                    name: regName,
                    email: regEmail
                })
            });
            const data = await res.json();
            if (data.success) {
                setSessionId(data.sessionId);
                localStorage.setItem('chat_session_id', data.sessionId);
            }
        } catch (error) {
            console.error(error);
        }
        setIsRegistering(false);
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || !sessionId) return;

        const text = inputText;
        setInputText('');

        try {
            await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'message',
                    sessionId,
                    text,
                    sender: 'user'
                })
            });
            // Poll will update state
        } catch (error) {
            console.error("Failed to send message");
        }
    };

    return (
        <>
            {/* Floating Bubble */}
            <button className={styles.fab} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <img
                        src="/doctor-icon-final.png"
                        alt="Chat Médico Online"
                        width="65"
                        height="65"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                )}
                {!isOpen && (sessionId || pendingSessionId) && <span className={styles.badge}></span>}
            </button>

            {/* Chat Window */}
            <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <div className={styles.agentInfo}>
                        <div className={styles.avatar}>👨‍⚕️</div>
                        <div className={styles.agentName}>
                            <h4>Soporte</h4>
                            <span>{isAdminTyping ? 'Escribiendo...' : (sessionId ? 'En línea' : 'Bienvenido')}</span>
                        </div>
                    </div>
                </div>

                {
                    showResumeOption ? (
                        /* Resume/Restart Selection */
                        <div className={styles.registerContainer}>
                            <p className={styles.welcomeText}>
                                Hola de nuevo. ¿Deseas continuar tu conversación anterior?
                            </p>
                            <div className={styles.resumeActions}>
                                <button onClick={handleResume} className={styles.resumeButton}>
                                    Continuar Chat
                                </button>
                                <button onClick={handleRestart} className={styles.restartButton}>
                                    Iniciar Nuevo
                                </button>
                            </div>
                        </div>
                    ) : !sessionId ? (
                        /* Registration Form */
                        <div className={styles.registerContainer}>
                            <p className={styles.welcomeText}>
                                Por favor ingresa tus datos para iniciar una conversación privada con un asesor.
                            </p>
                            <form onSubmit={handleRegister} className={styles.registerForm}>
                                <input
                                    required
                                    type="text"
                                    placeholder="Tu Nombre"
                                    value={regName}
                                    onChange={(e) => setRegName(e.target.value)}
                                    className={styles.input}
                                />
                                <input
                                    required
                                    type="email"
                                    placeholder="Tu Correo"
                                    value={regEmail}
                                    onChange={(e) => setRegEmail(e.target.value)}
                                    className={styles.input}
                                />
                                <button type="submit" className={styles.registerButton} disabled={isRegistering}>
                                    {isRegistering ? 'Conectando...' : 'Iniciar Chat'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        /* Active Chat */
                        <>
                            <div className={styles.messagesContainer}>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`${styles.message} ${msg.sender === 'admin' || msg.sender === 'system' ? styles.admin : styles.user}`}
                                    >
                                        {msg.text}
                                    </div>
                                ))}
                                {isAdminTyping && (
                                    <div className={styles.typingIndicator}>
                                        <div className={styles.dot}></div>
                                        <div className={styles.dot}></div>
                                        <div className={styles.dot}></div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <form onSubmit={handleSend} className={styles.inputArea}>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Escribe tu consulta..."
                                    className={styles.input}
                                />
                                <button type="submit" className={styles.sendButton}>➤</button>
                            </form>
                        </>
                    )
                }
            </div >
        </>
    );
}
