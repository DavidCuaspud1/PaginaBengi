// Funcion para validar formulario
export function validarFormulario(evento) {
    evento.preventDefault();// Detenemos recarga de la pagina

    const formulario = evento.target;
    
    // Obtenemos los valores limpiando espacios en blanco extras con .trim()
    const nombres = document.querySelector('#nombres').value.trim();
    const comentario = document.querySelector('#comentario').value.trim();

    // Validamos que los campos no estén vacíos
    if (!nombres || !comentario) {
        alert('Todos los campos son obligatorios');
        return;
    }    
    
    // Si todo está correcto se envia el formulario.
    console.log('Formulario validado con éxito', { nombres, comentario });
}