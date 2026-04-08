'use client';

import { useState, useEffect } from 'react';
import { getArticles, addArticle, updateArticle, deleteArticle } from '@/lib/data';
import styles from '../especialidades/page.module.css';

export default function AdminRevista() {
    const [articles, setArticles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        author: '',
        category: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setArticles(getArticles());
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                excerpt: item.excerpt,
                content: item.content,
                image: item.image,
                author: item.author || '',
                category: item.category || ''
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                excerpt: '',
                content: '',
                image: '',
                author: '',
                category: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingItem) {
            updateArticle(editingItem.id, formData);
        } else {
            addArticle(formData);
        }

        loadData();
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
            deleteArticle(id);
            loadData();
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Revista</h1>
                    <p>Gestiona los artículos del blog</p>
                </div>
                <button className={styles.addBtn} onClick={() => openModal()}>
                    + Nuevo Artículo
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Título</th>
                            <th>Categoría</th>
                            <th>Autor</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={item.image} alt={item.title} className={styles.thumbnail} />
                                </td>
                                <td><strong>{item.title}</strong></td>
                                <td>{item.category || '-'}</td>
                                <td>{item.author || '-'}</td>
                                <td>{formatDate(item.date)}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button
                                            className={styles.editBtn}
                                            onClick={() => openModal(item)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingItem ? 'Editar Artículo' : 'Nuevo Artículo'}</h2>
                            <button className={styles.closeBtn} onClick={closeModal}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Título *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Extracto *</label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    rows={2}
                                    placeholder="Breve descripción del artículo"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Contenido *</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    rows={8}
                                    placeholder="Contenido completo del artículo..."
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>URL de Imagen destacada *</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Autor</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Categoría</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="">Seleccionar...</option>
                                        <option value="Guías">Guías</option>
                                        <option value="Consejos">Consejos</option>
                                        <option value="Destinos">Destinos</option>
                                        <option value="Noticias">Noticias</option>
                                        <option value="Salud">Salud</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    {editingItem ? 'Guardar Cambios' : 'Publicar Artículo'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
