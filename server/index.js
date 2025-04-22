const cors = require('cors');
const express = require('express');
const { sequelize } = require('../models');  // Asegúrate de importar sequelize
const routes = require('../routes');

const server = express();
server.use(cors());
server.options('*', cors());

server.use(express.json());
server.use('/api', routes);

// Sincronizar las tablas antes de iniciar el servidor
sequelize.sync({ force: false }) // Cambia a 'true' si quieres que las tablas se reinicien en cada ejecución
  .then(() => {
    console.log('✅ Tablas sincronizadas con la base de datos');
    
    // Inicia el servidor solo después de la sincronización
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar tablas:', err.message);
  });

module.exports = server;


