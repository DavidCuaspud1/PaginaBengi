const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para procesar datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de variables de sesión
app.use(session({
    secret: 'mi_clave_secreta_bengi',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

// 1. Servir archivos estáticos de la carpeta raíz
app.use(express.static(__dirname));

// 2. Ruta principal que entrega tu index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- RUTAS DE LA API PARA COMENTARIOS ---

// Obtener comentarios de la sesión
app.get('/api/comentarios', (req, res) => {
    if (!req.session.comentarios) {
        req.session.comentarios = [];
    }
    res.json(req.session.comentarios);
});

// Guardar comentario en la sesión
app.post('/api/comentarios', (req, res) => {
    const { nombres, comentario } = req.body;

    if (!nombres || !comentario) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    if (!req.session.comentarios) {
        req.session.comentarios = [];
    }

    const nuevoComentario = {
        nombres,
        comentario,
        fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    req.session.comentarios.push(nuevoComentario);

    res.status(201).json({ 
        mensaje: 'Comentario guardado en la sesión.', 
        comentarios: req.session.comentarios 
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});