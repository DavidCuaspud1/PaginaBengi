const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para procesar datos JSON y de formularios URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de variables de sesión
app.use(session({
    secret: 'mi_clave_secreta_sena', // Cambia esto por una clave más segura en producción
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } // La sesión dura 1 hora
}));

// Servir archivos estáticos (tu HTML, CSS, JS frontend)
app.use(express.static(path.join(__dirname, 'public')));

// --- RUTAS DE LA API ---

// 1. Obtener la lista de comentarios guardados en la sesión actual
app.get('/api/comentarios', (req, res) => {
    // Si la lista de comentarios no existe en la sesión, la inicializamos vacía
    if (!req.session.comentarios) {
        req.session.comentarios = [];
    }
    res.json(req.session.comentarios);
});

// 2. Guardar un nuevo comentario en la variable de sesión
app.post('/api/comentarios', (req, res) => {
    const { nombres, comentario } = req.body;

    if (!nombres || !comentario) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    if (!req.session.comentarios) {
        req.session.comentarios = [];
    }

    // Agregar el nuevo comentario a la sesión
    const nuevoComentario = {
        nombres,
        comentario,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    req.session.comentarios.push(nuevoComentario);

    res.status(201).json({ 
        mensaje: 'Comentario guardado con éxito en la sesión.', 
        comentarios: req.session.comentarios 
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});