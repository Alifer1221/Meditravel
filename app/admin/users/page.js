'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/chat?admin=true')
            .then(res => res.json())
            .then(data => {
                setUsers(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const downloadExcel = () => {
        if (!users.length) return;

        // CSV Header
        const headers = ['Nombre', 'Email', 'IP', 'Última Actividad', 'Mensajes'];

        // CSV Rows
        const rows = users.map(user => [
            user.user.name,
            user.user.email,
            user.user.ip || 'N/A',
            new Date(user.lastActive).toLocaleString(),
            user.lastMessage ? user.lastMessage.text.replace(/,/g, ' ') : 'Sin mensajes'
        ]);

        // Combine
        const csvContent = [headers, ...rows]
            .map(e => e.join(","))
            .join("\n");

        // Create Blob and Download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "usuarios_base_datos.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Base de Datos de Usuarios</h1>
                <button onClick={downloadExcel} className={styles.exportBtn}>
                    📥 Descargar Excel
                </button>
            </div>

            {loading ? (
                <p>Cargando datos...</p>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>IP</th>
                                <th>Última Actividad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((session, index) => (
                                <tr key={session.sessionId || index}>
                                    <td>{session.user.name}</td>
                                    <td>{session.user.email}</td>
                                    <td>{session.user.ip || '-'}</td>
                                    <td>{new Date(session.lastActive).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && <p className={styles.empty}>No hay usuarios registrados aún.</p>}
                </div>
            )}
        </div>
    );
}
