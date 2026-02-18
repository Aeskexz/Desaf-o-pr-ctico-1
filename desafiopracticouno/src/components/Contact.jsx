
// Este componente muestra la información de un contacto individual
// Recibe las siguientes props:
//    contact: objeto con { id, nombre, apellido, telefono, favorito }
//    onEliminar: función para eliminar el contacto
//    onToggleFavorito: función para agregar/quitar de favoritos

import './Contact.css';

function Contact({ contact, onEliminar, onToggleFavorito }) {
    return (
        <div className={`contact-card ${contact.favorito ? 'favorito' : ''}`}>
            {/* Indica visualmente de el contacto favorito */}
            {contact.favorito && (
                <span className="badge-favorito"> Favorito</span>
            )}

            {/* Información del contacto */}
            <div className="contact-info">
                <h3 className="contact-nombre">
                    {contact.nombre} {contact.apellido}
                </h3>
                <p className="contact-telefono">📞 {contact.telefono}</p>
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

                {/* boton para eliminar el contacto */}
                <button
                    className="btn-eliminar"
                    onClick={() => onEliminar(contact.id)}
                    title="Eliminar contacto"
                >
                    🗑 Eliminar
                </button>
            </div>

            {/* 
         ivan Agregale funcionalidad de EDITAR contacto
          Agregale un botón "Editar" junto a los botones existentes
           que al hacer clic, muestre un formulario inline (o modal) con los
            campos precargados: nombre, apellido y teléfono
          Agregar una prop "onEditar" que reciba el id y los nuevos datos
         que valide que los campos no estén vacíos antes de guardar
          */}
        </div>
    );
}

export default Contact;
