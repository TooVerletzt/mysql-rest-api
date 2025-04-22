const cors = require('cors');
const express = require('express');
const { sequelize } = require('../models');  // Asegúrate de importar sequelize
const routes = require('../routes');

const server = express();
server.use(cors());
server.options('*', cors());

server.use(express.json());
server.use('/api', routes);

sequelize.sync({ force: true }) // Esto reinicia las tablas
  .then(() => {
    console.log('✅ Tablas sincronizadas con la base de datos');
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar tablas:', err.message);
  });


