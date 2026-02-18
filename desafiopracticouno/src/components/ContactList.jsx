
// Este componente maneja la lista completa de contactos
// Contiene 
//   El formulario para agregar nuevos contactos
//   La lista de contactos (favoritos primero)
//   Llama al componente <Contact /> para renderizar cada contacto

import { useState } from 'react';
import Contact from './Contact';
import './ContactList.css';

function ContactList() {
    //   lista de contactos
    // Cada contacto tiene: { id, nombre, apellido, telefono, favorito }
    const [contactos, setContactos] = useState([
        { id: 1, nombre: 'María', apellido: 'García', telefono: '7890-1234', favorito: true },
        { id: 2, nombre: 'Carlos', apellido: 'López', telefono: '7654-3210', favorito: false },
        { id: 3, nombre: 'Ana', apellido: 'Martínez', telefono: '7321-9876', favorito: false },
    ]);

    //  Estado: campos del formulario 
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
    });

    //   mensaje de error de validación 
    const [error, setError] = useState('');

    //   cambios en el formulario 
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
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
            favorito: false,
        };

        setContactos([...contactos, nuevoContacto]);
        setForm({ nombre: '', apellido: '', telefono: '' }); // Limpia el formulario
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

    //   ordena de favoritos primero, luego el resto 
    const contactosOrdenados = [
        ...contactos.filter((c) => c.favorito),
        ...contactos.filter((c) => !c.favorito),
    ];

    // Render
    return (
        <div className="contactlist-container">
            <h1 className="contactlist-titulo">📋 Lista de Contactos</h1>

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

                {/* Mensaje de error de validación */}
                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn-agregar">
                    ➕ Agregar Contacto
                </button>
            </form>

            {/*  Lista de contactos  */}
            <div className="contactlist-lista">
                {contactosOrdenados.length === 0 ? (
                    <p className="lista-vacia">No hay contactos registrados, deberías de agregar uno</p>
                ) : (
                    contactosOrdenados.map((contacto) => (
                        <Contact
                            key={contacto.id}
                            contact={contacto}
                            onEliminar={eliminarContacto}
                            onToggleFavorito={toggleFavorito}
                        /* IVAN: Pasar la prop onEditar cuando
                           implementes la funcionalidad de edición */
                        />
                    ))
                )}
            </div>

            {/*
         Ivan Implementa lo siguiente 

            Busqueda de contactos, agrega:
             Un campo de búsqueda (input) encima de la lista
             Filtrar los contactos en tiempo real por nombre, apellido
            o número de teléfono mientras el usuario escribe
             Crea un estado: const [busqueda, setBusqueda] = useState('')
             Filtra contactosOrdenados antes de renderizar

           una edición de contactos
             Agrega una función editarContacto(id, nuevosDatos) que
            actualice el contacto en el estado usando setContactos
             Pasarla como prop onEditar al componente <Contact />

            Contador de contactos
            mostrar debajo del título cuántos contactos hay en total
            y cuántos son favoritos
        */}
        </div>
    );
}

export default ContactList;
