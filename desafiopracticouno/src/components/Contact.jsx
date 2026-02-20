
// Este componente muestra la información de un contacto individual
// Recibe las siguientes props:
//    contact: objeto con { id, nombre, apellido, telefono, favorito }
//    onEliminar: función para eliminar el contacto
//    onToggleFavorito: función para agregar/quitar de favoritos

import { useState } from 'react';
import defaultAvatar from '../assets/avatars/default-avatar.svg';
import './Contact.css';

function Contact({ contact, onEliminar, onToggleFavorito, onEditar }) {
    const [editando, setEditando] = useState(false);
    const [datosEdicion, setDatosEdicion] = useState({
        nombre: contact.nombre,
        apellido: contact.apellido,
        telefono: contact.telefono,
        foto: contact.foto || null,
    });

    const handleEdicionChange = (e) => {
        setDatosEdicion({ ...datosEdicion, [e.target.name]: e.target.value });
    };

    const handleFotoEdicionChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setDatosEdicion({ ...datosEdicion, foto: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const guardarEdicion = () => {
        // Validar que los campos no estén vacíos
        if (!datosEdicion.nombre.trim() || !datosEdicion.apellido.trim() || !datosEdicion.telefono.trim()) {
            alert('Por favor, completa todos los campos');
            return;
        }

        onEditar(contact.id, datosEdicion);
        setEditando(false);
    };

    const cancelarEdicion = () => {
        setDatosEdicion({
            nombre: contact.nombre,
            apellido: contact.apellido,
            telefono: contact.telefono,
            foto: contact.foto || null,
        });
        setEditando(false);
    };

    return (
        <div className={`contact-card ${contact.favorito ? 'favorito' : ''}`}>
            {/* Indica visualmente de el contacto favorito */}
            {contact.favorito && (
                <span className="badge-favorito"> Favorito</span>
            )}

            {editando ? (
                // Formulario de edición inline
                <div className="contact-form-edicion">
                    <div className="foto-edicion-container">
                        <img src={datosEdicion.foto || defaultAvatar} alt="Foto contacto" className="foto-edicion" />
                        <label htmlFor={`foto-${contact.id}`} className="label-foto-edicion">
                            📷 Cambiar foto
                        </label>
                        <input
                            id={`foto-${contact.id}`}
                            type="file"
                            accept="image/*"
                            onChange={handleFotoEdicionChange}
                            className="input-archivo-edicion"
                        />
                    </div>

                    <div className="form-grupo-edicion">
                        <label htmlFor={`nombre-${contact.id}`}>Nombre</label>
                        <input
                            id={`nombre-${contact.id}`}
                            type="text"
                            name="nombre"
                            value={datosEdicion.nombre}
                            onChange={handleEdicionChange}
                        />
                    </div>

                    <div className="form-grupo-edicion">
                        <label htmlFor={`apellido-${contact.id}`}>Apellido</label>
                        <input
                            id={`apellido-${contact.id}`}
                            type="text"
                            name="apellido"
                            value={datosEdicion.apellido}
                            onChange={handleEdicionChange}
                        />
                    </div>

                    <div className="form-grupo-edicion">
                        <label htmlFor={`telefono-${contact.id}`}>Teléfono</label>
                        <input
                            id={`telefono-${contact.id}`}
                            type="tel"
                            name="telefono"
                            value={datosEdicion.telefono}
                            onChange={handleEdicionChange}
                        />
                    </div>

                    <div className="contact-acciones-edicion">
                        <button className="btn-guardar" onClick={guardarEdicion}>
                            ✅ Guardar
                        </button>
                        <button className="btn-cancelar" onClick={cancelarEdicion}>
                            ❌ Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                // Vista normal del contacto
                <>
                    {/* Foto del contacto */}
                    <div className="contact-foto-container">
                        <img 
                            src={contact.foto || defaultAvatar} 
                            alt={`${contact.nombre} ${contact.apellido}`}
                            className="contact-foto"
                        />
                    </div>

                    {/* Información del contacto */}
                    <div className="contact-info">
                        <h3 className="contact-nombre">
                            {contact.nombre} {contact.apellido}
                        </h3>
                        <p className="contact-telefono">{contact.telefono}</p>
                    </div>

                    {/* los botones de acción */}
                    <div className="contact-acciones">
                {/* el boton para agregar/quitar de favoritos */}
                <button
                    className={`btn-favorito ${contact.favorito ? 'activo' : ''}`}
                    onClick={() => onToggleFavorito(contact.id)}
                    title={contact.favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                    {contact.favorito ? '★ Quitar favorito' : '☆ Favorito'}
                </button>

                {/* el boton para editar el contacto */}
                <button
                    className="btn-editar"
                    onClick={() => setEditando(true)}
                    title="Editar contacto"
                >
                    ✏️ Editar
                </button>

                {/* boton para eliminar el contacto */}
                <button
                    className="btn-eliminar"
                    onClick={() => onEliminar(contact.id)}
                    title="Eliminar contacto"
                >
                    🗑 Eliminar
                </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Contact;
