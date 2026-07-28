import { obtenerUsuarios } from './api.js';
import { renderizarTestimonios, validarFormulario } from './ui.js';
import { cargarTema, alternarTema } from './theme.js';

// Seleccion de elementos globales
const contenedorTestimonios = document.getElementById('contenedor-testimonios');
const formulario = document.querySelector('#form');

// Evento: carga inicial de la pagina 
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obtenemos los usuarios de la API
        const usuarios = await obtenerUsuarios();
        
        // Renderizamos los testimonios (Validación segura de Array)
        if (usuarios && usuarios.length > 0) {
            renderizarTestimonios(usuarios, contenedorTestimonios);
        } else {
            console.log('No se encontraron usuarios para mostrar.');
        }
    } catch (error) {
        console.error('Error al cargar los usuarios de la API:', error);
    }
});

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