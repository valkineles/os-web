const express = require('express');
const getFilters = require('../../middlewares/filters');
const routes = express.Router();

const productCtrl = require('../../controllers/produtosCtrl');

routes.post('/', productCtrl.store);
routes.get('/', getFilters, productCtrl.getAll);
routes.get('/:id', productCtrl.getById);
routes.put('/:id', productCtrl.update);
routes.delete('/:id', productCtrl.delete);

module.exports = routes;
