'use client';

import { useState, useEffect } from 'react';
import { getClinics, addClinic, updateClinic, deleteClinic, getSpecialties } from '@/lib/data';
import styles from '../especialidades/page.module.css';

export default function AdminClinicas() {
    const [clinics, setClinics] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        fullDescription: '',
        image: '',
        location: '',
        specialties: [],
        rating: 5,
        reviews: 0,
        phone: '',
        email: '',
        address: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setClinics(getClinics());
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
                location: item.location || '',
                specialties: item.specialties || [],
                rating: item.rating || 5,
                reviews: item.reviews || 0,
                phone: item.contact?.phone || '',
                email: item.contact?.email || '',
                address: item.contact?.address || ''
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                description: '',
                fullDescription: '',
                image: '',
                location: '',
                specialties: [],
                rating: 5,
                reviews: 0,
                phone: '',
                email: '',
                address: ''
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
    };

    const handleSpecialtyChange = (specId) => {
        const newSpecialties = formData.specialties.includes(specId)
            ? formData.specialties.filter(id => id !== specId)
            : [...formData.specialties, specId];
        setFormData({ ...formData, specialties: newSpecialties });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: formData.name,
            description: formData.description,
            fullDescription: formData.fullDescription,
            image: formData.image,
            location: formData.location,
            specialties: formData.specialties,
            rating: parseFloat(formData.rating),
            reviews: parseInt(formData.reviews),
            contact: {
                phone: formData.phone,
                email: formData.email,
                address: formData.address
            },
            images: [formData.image]
        };

        if (editingItem) {
            updateClinic(editingItem.id, data);
        } else {
            addClinic(data);
        }

        loadData();
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta clínica?')) {
            deleteClinic(id);
            loadData();
        }
    };

    const getSpecialtyNames = (specIds) => {
        return specIds
            .map(id => {
                const spec = specialties.find(s => s.id === id);
                return spec ? spec.name : null;
            })
            .filter(Boolean)
            .join(', ');
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Clínicas</h1>
                    <p>Gestiona las clínicas asociadas del sitio</p>
                </div>
                <button className={styles.addBtn} onClick={() => openModal()}>
                    + Agregar Clínica
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Ubicación</th>
                            <th>Rating</th>
                            <th>Especialidades</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clinics.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={item.image} alt={item.name} className={styles.thumbnail} />
                                </td>
                                <td><strong>{item.name}</strong></td>
                                <td>{item.location}</td>
                                <td>⭐ {item.rating} ({item.reviews})</td>
                                <td className={styles.descCell}>
                                    {item.specialties ? getSpecialtyNames(item.specialties) : '-'}
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
                            <h2>{editingItem ? 'Editar Clínica' : 'Nueva Clínica'}</h2>
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
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Ubicación *</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Ciudad, País"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Especialidades</label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {specialties.map(spec => (
                                        <label key={spec.id} style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={formData.specialties.includes(spec.id)}
                                                onChange={() => handleSpecialtyChange(spec.id)}
                                            />
                                            {spec.name}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Rating (1-5)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        step="0.1"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Número de Reseñas</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.reviews}
                                        onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Teléfono</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Dirección</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>
                            <div className={styles.formActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    {editingItem ? 'Guardar Cambios' : 'Crear Clínica'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
