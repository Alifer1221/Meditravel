'use client';

import { useState, useEffect } from 'react';
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, getSpecialties, getClinics } from '@/lib/data';
import styles from '../especialidades/page.module.css';

export default function AdminTestimonios() {
    const [testimonials, setTestimonials] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        photo: '',
        testimonial: '',
        rating: 5,
        specialty: '',
        clinic: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setTestimonials(getTestimonials());
        setSpecialties(getSpecialties());
        setClinics(getClinics());
    };

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                country: item.country,
                photo: item.photo,
                testimonial: item.testimonial,
                rating: item.rating,
                specialty: item.specialty || '',
                clinic: item.clinic || ''
            });
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                country: '',
                photo: '',
                testimonial: '',
                rating: 5,
                specialty: '',
                clinic: ''
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

        const data = {
            ...formData,
            rating: parseInt(formData.rating)
        };

        if (editingItem) {
            updateTestimonial(editingItem.id, data);
        } else {
            addTestimonial(data);
        }

        loadData();
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de eliminar este testimonio?')) {
            deleteTestimonial(id);
            loadData();
        }
    };

    const getSpecialtyName = (id) => {
        const spec = specialties.find(s => s.id === id);
        return spec ? spec.name : '-';
    };

    const getClinicName = (id) => {
        const clinic = clinics.find(c => c.id === id);
        return clinic ? clinic.name : '-';
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Testimonios</h1>
                    <p>Gestiona los testimonios de pacientes</p>
                </div>
                <button className={styles.addBtn} onClick={() => openModal()}>
                    + Nuevo Testimonio
                </button>
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>País</th>
                            <th>Rating</th>
                            <th>Especialidad</th>
                            <th>Clínica</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={item.photo} alt={item.name} className={styles.thumbnail} style={{ borderRadius: '50%' }} />
                                </td>
                                <td><strong>{item.name}</strong></td>
                                <td>{item.country}</td>
                                <td>{'★'.repeat(item.rating)}</td>
                                <td>{getSpecialtyName(item.specialty)}</td>
                                <td className={styles.descCell}>{getClinicName(item.clinic)}</td>
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
                            <h2>{editingItem ? 'Editar Testimonio' : 'Nuevo Testimonio'}</h2>
                            <button className={styles.closeBtn} onClick={closeModal}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Nombre del Paciente *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>País *</label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label>URL de Foto *</label>
                                <input
                                    type="url"
                                    value={formData.photo}
                                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Testimonio *</label>
                                <textarea
                                    value={formData.testimonial}
                                    onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                                    rows={4}
                                    placeholder="El testimonio del paciente..."
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Calificación (1-5)</label>
                                <select
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                >
                                    <option value="5">★★★★★ (5)</option>
                                    <option value="4">★★★★☆ (4)</option>
                                    <option value="3">★★★☆☆ (3)</option>
                                    <option value="2">★★☆☆☆ (2)</option>
                                    <option value="1">★☆☆☆☆ (1)</option>
                                </select>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div className={styles.formGroup}>
                                    <label>Especialidad Relacionada</label>
                                    <select
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                    >
                                        <option value="">Ninguna</option>
                                        {specialties.map(spec => (
                                            <option key={spec.id} value={spec.id}>{spec.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Clínica Relacionada</label>
                                    <select
                                        value={formData.clinic}
                                        onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                                    >
                                        <option value="">Ninguna</option>
                                        {clinics.map(clinic => (
                                            <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.formActions}>
                                <button type="button" className={styles.cancelBtn} onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    {editingItem ? 'Guardar Cambios' : 'Crear Testimonio'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
