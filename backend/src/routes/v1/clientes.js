const express = require('express');
const getFilters = require('../../middlewares/filters');
const routes = express.Router();

const clientCtrl = require('../../controllers/clientesCtrl');

routes.post('/', clientCtrl.store);
routes.get('/', getFilters, clientCtrl.getAll);
routes.get('/:clientId', clientCtrl.getById);
routes.put('/:id', clientCtrl.update);
routes.delete('/:id', clientCtrl.delete);

module.exports = routes;
