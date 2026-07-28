const TEMA_KEY = 'pagina-tema';

// Función para actualizar el icono/texto del botón según el tema
function actualizarBoton(tema) {
    const temaBtn = document.getElementById('modoOscuro');
    if (temaBtn) {
        temaBtn.innerHTML = tema === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    }
}

export function cargarTema() {
    // Si no hay tema guardado, usa 'light' por defecto (o 'dark' si lo prefieres)
    const temaGuardado = localStorage.getItem(TEMA_KEY) || 'light';
    
    document.documentElement.setAttribute('data-bs-theme', temaGuardado);
    actualizarBoton(temaGuardado);
}

export function alternarTema() {
    const html = document.documentElement;
    const temaActual = html.getAttribute('data-bs-theme');
    const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-bs-theme', nuevoTema);
    localStorage.setItem(TEMA_KEY, nuevoTema);
    actualizarBoton(nuevoTema); // Actualiza el botón al instante
}