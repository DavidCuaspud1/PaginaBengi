import { validarFormulario } from './ui.js';
import { cargarTema, alternarTema } from './theme.js';


const formulario = document.querySelector('#form');

// Evento: envio del formulario 
if (formulario) {
    formulario.addEventListener('submit', validarFormulario);
}

// Cargar el tema tan pronto inicia la aplicación
document.addEventListener('DOMContentLoaded', () => {
    cargarTema();

    const temaBtn = document.getElementById('modoOscuro');
    if (temaBtn) {
        temaBtn.addEventListener('click', alternarTema);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const listaComentarios = document.getElementById('lista-comentarios');

    // Función para obtener y mostrar comentarios guardados en la sesión
    const cargarComentarios = async () => {
        try {
            const respuesta = await fetch('/api/comentarios');
            const comentarios = await respuesta.json();

            // Limpiar el contenedor antes de renderizar
            listaComentarios.innerHTML = '';

            if (comentarios.length === 0) {
                listaComentarios.innerHTML = '<p class="text-muted text-center">No hay comentarios guardados en esta sesión aún.</p>';
                return;
            }

            // Recorrer los comentarios e insertarlos dinámicamente
            comentarios.reverse().forEach(c => {
                const card = document.createElement('div');
                card.className = 'card mb-3 shadow-sm';
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold text-primary">${c.nombres}</h5>
                        <p class="card-text">${c.comentario}</p>
                        <small class="text-muted">${c.fecha || ''}</small>
                    </div>
                `;
                listaComentarios.appendChild(card);
            });
        } catch (error) {
            console.error('Error al cargar comentarios:', error);
        }
    };

    // Evento al enviar el formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombres = document.getElementById('nombres').value;
        const comentario = document.getElementById('comentario').value;

        try {
            const respuesta = await fetch('/api/comentarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombres, comentario })
            });

            if (respuesta.ok) {
                form.reset(); // Limpiar el formulario
                cargarComentarios(); // Recargar la lista de comentarios
            } else {
                alert('Ocurrió un error al guardar el comentario.');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    });

    // Cargar los comentarios guardados al abrir/recargar la página
    cargarComentarios();
});