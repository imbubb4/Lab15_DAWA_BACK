const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth');

const app = express();

// CORS
const allowedOrigins = [
  'http://localhost:3000',          // frontend en desarrollo
  process.env.FRONTEND_URL,         // frontend en Vercel (producción)
].filter(Boolean);                  // saca los undefined

app.use(
  cors({
    origin: allowedOrigins,
    // si algún día necesitas cookies, acá pones credentials: true
  })
);

app.use(express.json());

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API E-commerce funcionando' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;
