const express = require('express');
const getFilters = require('../../middlewares/filters');
const routes = express.Router();

const userCtrl = require('../../controllers/usuariosCtrl');

routes.post('/', userCtrl.store);
routes.get('/', getFilters, userCtrl.getAll);
routes.get('/:id', userCtrl.getById);
routes.put('/:id', userCtrl.update);
routes.delete('/:id', userCtrl.delete);

module.exports = routes;
