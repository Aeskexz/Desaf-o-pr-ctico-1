
// Este componente maneja la lista completa de contactos
// Contiene 
//   El formulario para agregar nuevos contactos
//   La lista de contactos (favoritos primero)
//   Llama al componente <Contact /> para renderizar cada contacto

import { useState } from 'react';
import Contact from './Contact';
import defaultAvatar from '../assets/avatars/default-avatar.svg';
import './ContactList.css';

function ContactList() {
    //   lista de contactos
    // Cada contacto tiene: { id, nombre, apellido, telefono, favorito, foto }
    const [contactos, setContactos] = useState([
        { id: 1, nombre: 'María', apellido: 'García', telefono: '7890-1234', favorito: true, foto: null },
        { id: 2, nombre: 'Carlos', apellido: 'López', telefono: '7654-3210', favorito: false, foto: null },
        { id: 3, nombre: 'Ana', apellido: 'Martínez', telefono: '7321-9876', favorito: false, foto: null },
    ]);

    //  Estado: campos del formulario 
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        foto: '',
    });

    //   mensaje de error de validación 
    const [error, setError] = useState('');

    //   Estado para búsqueda de contactos
    const [busqueda, setBusqueda] = useState('');

    //   cambios en el formulario 
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //   maneja la carga de foto (como base64)
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setForm({ ...form, foto: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    //   Agrega un nuevo contacto 
    const agregarContacto = (e) => {
        e.preventDefault();

        // Validación básica donde todos los campos son obligatorios
        if (!form.nombre.trim() || !form.apellido.trim() || !form.telefono.trim()) {
            setError('Por favor, completa todos los campos.');
            return;
        }

        const nuevoContacto = {
            id: Date.now(),
            nombre: form.nombre.trim(),
            apellido: form.apellido.trim(),
            telefono: form.telefono.trim(),
            foto: form.foto || null,
            favorito: false,
        };

        setContactos([...contactos, nuevoContacto]);
        setForm({ nombre: '', apellido: '', telefono: '', foto: '' }); // Limpia el formulario
        setError('');
    };

    //  Elimina un contacto por ID 
    const eliminarContacto = (id) => {
        setContactos(contactos.filter((c) => c.id !== id));
    };

    //  Alterna favorito de un contacto
    const toggleFavorito = (id) => {
        setContactos(
            contactos.map((c) =>
                c.id === id ? { ...c, favorito: !c.favorito } : c
            )
        );
    };

    //  Edita un contacto por ID
    const editarContacto = (id, nuevosDatos) => {
        setContactos(
            contactos.map((c) =>
                c.id === id ? { ...c, ...nuevosDatos } : c
            )
        );
    };

    //   ordena de favoritos primero, luego el resto 
    const contactosOrdenados = [
        ...contactos.filter((c) => c.favorito),
        ...contactos.filter((c) => !c.favorito),
    ];

    //   Filtra contactos por búsqueda (nombre, apellido o teléfono)
    const contactosFiltrados = contactosOrdenados.filter((c) => {
        const termino = busqueda.toLowerCase();
        return (
            c.nombre.toLowerCase().includes(termino) ||
            c.apellido.toLowerCase().includes(termino) ||
            c.telefono.includes(termino)
        );
    });

    //   Calcula estadísticas de contactos
    const totalContactos = contactos.length;
    const totalFavoritos = contactos.filter((c) => c.favorito).length;

    // Render
    return (
        <div className="contactlist-container">
            <h1 className="contactlist-titulo">Lista de Contactos</h1>
            <p className="contactos-contador">
                Total: {totalContactos} | Favoritos: {totalFavoritos}
            </p>

            {/*  Formulario para agregar contacto  */}
            <form className="contactlist-form" onSubmit={agregarContacto}>
                <h2 className="form-titulo">Agregar nuevo contacto</h2>

                <div className="form-fila">
                    <div className="form-grupo">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            placeholder="Ej: Juan"
                            value={form.nombre}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-grupo">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            id="apellido"
                            type="text"
                            name="apellido"
                            placeholder="Ej: Pérez"
                            value={form.apellido}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-grupo">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            id="telefono"
                            type="tel"
                            name="telefono"
                            placeholder="Ej: 7890-1234"
                            value={form.telefono}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-grupo-foto">
                    <label htmlFor="foto">📷 Foto de perfil</label>
                    <input
                        id="foto"
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        className="input-archivo"
                    />
                    {form.foto && (
                        <div className="preview-foto">
                            <img src={form.foto} alt="Preview" className="img-preview" />
                        </div>
                    )}
                </div>

                {/* Mensaje de error de validación */}
                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn-agregar">
                    ➕ Agregar Contacto
                </button>
            </form>

            {/*  Campo de búsqueda  */}
            <div className="contactlist-busqueda">
                <input
                    type="text"
                    placeholder="🔍 Buscar por nombre, apellido o teléfono..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="busqueda-input"
                />
            </div>

            {/*  Lista de contactos  */}
            <div className="contactlist-lista">
                {contactosFiltrados.length === 0 ? (
                    <p className="lista-vacia">
                        {busqueda && contactos.length > 0
                            ? 'No hay contactos que coincidan con tu búsqueda'
                            : 'No hay contactos registrados, deberías de agregar uno'}
                    </p>
                ) : (
                    contactosFiltrados.map((contacto) => (
                        <Contact
                            key={contacto.id}
                            contact={contacto}
                            onEliminar={eliminarContacto}
                            onToggleFavorito={toggleFavorito}
                            onEditar={editarContacto}
                        />
                    ))
                )}
            </div>


        </div>
    );
}

export default ContactList;
