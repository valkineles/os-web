const express = require('express');
const jwtValidate = require('../middlewares/jwt');

function routesApiV1(server) {
  const v1 = express.Router();

  v1.use('/clients', jwtValidate, require('./v1/clientes'));
  v1.use('/products', jwtValidate, require('./v1/produtos'));
  v1.use('/services', jwtValidate, require('./v1/servicos'));
  v1.use('/users', jwtValidate, require('./v1/usuarios'));
  v1.use('/maintenance', jwtValidate, require('./v1/manutencao'));

  server.use('/api/v1', v1);
}

module.exports = routesApiV1;
