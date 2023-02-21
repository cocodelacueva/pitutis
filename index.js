const express = require('express');
const { PORT } = require('./config/index');
const MODE = process.env.NODE_ENV || 'production';

const functionsRoutes = require('./src/routes/functions.routes');
const frontRoutes = require('./src/routes/front.routes');
const app = express();

// Establece ejs como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

// Archivos estáticos
app.use(express.static(__dirname + '/src/views/public'));

// routes
app.use('/functions', functionsRoutes);
app.use(frontRoutes);

app.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT} in ${MODE} mode`);
});