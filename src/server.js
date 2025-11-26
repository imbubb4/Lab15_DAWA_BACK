const app = require('./app');
const sequelize = require('./config/database');

require('dotenv').config();
require('./models/Product');
require('./models/Role');
require('./models/User');
require('./models');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida');

    // Sincroniza modelos con la BD (crea/actualiza tablas)
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
