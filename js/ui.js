// Funcion para pintar en pantalla los testimonios
export function renderizarTestimonios(usuarios, contenedor) {
    if (!contenedor) return;

    // Limpiamos el contenedor antes de renderizar
    contenedor.innerHTML = '';

    const muestra = usuarios.slice(0, 3);

    muestra.forEach(usuario => {
        const card = document.createElement('article');

        card.innerHTML = `
            <h3>${usuario.name}</h3>
            <p>Trabaja en: <strong>${usuario.company?.name}</strong></p>
            <small>${usuario.email}</small>
        `;

        contenedor.appendChild(card);
    });
}

// Funcion para validar formulario
export function validarFormulario(evento) {
    evento.preventDefault();// Detenemos recarga de la pagina

    const formulario = evento.target;
    
    // Obtenemos los valores limpiando espacios en blanco extras con .trim()
    const nombre = document.querySelector('#nombre').value.trim();
    const email = document.querySelector('#email').value.trim();

    // Validamos que los campos no estén vacíos
    if (!nombre || !email) {
        alert('Todos los campos son obligatorios');
        return;
    }    
    
    // Validamos que el email tenga un formato correcto básico
    if (!email.includes('@')) {
        alert('El email no es válido.');
        return; 
    }

    // Si todo está correcto se envia el formulario.
    console.log('Formulario validado con éxito', { nombre, email });
}