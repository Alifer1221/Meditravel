'use client';

import { useState, useEffect } from 'react';
import { getSpecialties, addSpecialty, updateSpecialty, deleteSpecialty } from '@/lib/data';
import styles from './page.module.css';

export default function AdminEspecialidades() {
    const [specialties, setSpecialties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        fullDescription: '',
        image: '',
        procedures: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setSpecialties(getSpecialties());
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                description: item.description,
                fullDescription: item.fullDescription || '',
                image: item.image,
                procedures: item.procedures ? item.procedures.join(', ') : ''
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                description: '',
                fullDescription: '',
                image: '',
                procedures: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({
            name: '',
            description: '',
            fullDescription: '',
            image: '',
            procedures: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            ...formData,
            procedures: formData.procedures.split(',').map(p => p.trim()).filter(Boolean)
        };

        if (editingItem) {
            updateSpecialty(editingItem.id, data);
        } else {
            addSpecialty(data);
        }

        loadData();
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta especialidad?')) {
            deleteSpecialty(id);
            loadData();
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Especialidades</h1>
                    <p>Gestiona las especialidades médicas del sitio</p>
                </div>
                <button className={styles.addBtn} onClick={() => openModal()}>
                    + Agregar Especialidad
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Procedimientos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specialties.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={item.image} alt={item.name} className={styles.thumbnail} />
                                </td>
                                <td><strong>{item.name}</strong></td>
                                <td className={styles.descCell}>{item.description}</td>
                                <td>
                                    {item.procedures && item.procedures.length > 0
                                        ? `${item.procedures.length} procedimientos`
                                        : '-'
                                    }
                                </td>
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
                            <h2>{editingItem ? 'Editar Especialidad' : 'Nueva Especialidad'}</h2>
                            <button className={styles.closeBtn} onClick={closeModal}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Nombre *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Descripción corta *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={2}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Descripción completa</label>
                                <textarea
                                    value={formData.fullDescription}
                                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                                    rows={4}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>URL de Imagen *</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Procedimientos (separados por coma)</label>
                                <input
                                    type="text"
                                    value={formData.procedures}
                                    onChange={(e) => setFormData({ ...formData, procedures: e.target.value })}
                                    placeholder="Procedimiento 1, Procedimiento 2, ..."
                                />
                            </div>
                            <div className={styles.formActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    {editingItem ? 'Guardar Cambios' : 'Crear Especialidad'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
