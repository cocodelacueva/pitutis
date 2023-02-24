const express = require('express');
const session = require('express-session')
const { PORT, SESIONSECRETKEY } = require('./config/index');
const MODE = process.env.NODE_ENV || 'production';

const functionsRoutes = require('./src/routes/functions.routes');
const frontRoutes = require('./src/routes/front.routes');
const { usserSesion } = require('./src/middleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sesiones
app.use(session({secret: SESIONSECRETKEY, resave: true, saveUninitialized: true}))


// Establece ejs como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

// Archivos estáticos
app.use(express.static(__dirname + '/src/views/public'));

// routes
app.use('/functions', usserSesion, functionsRoutes);
app.use('/', usserSesion, frontRoutes);

app.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT} in ${MODE} mode`);
});