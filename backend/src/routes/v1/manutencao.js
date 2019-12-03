const express = require('express');
const getFilters = require('../../middlewares/filters');
const routes = express.Router();

const maintenanceCtrl = require('../../controllers/manutencaoCtrl');

routes.post('/', maintenanceCtrl.store);
routes.get('/', getFilters, maintenanceCtrl.getAll);
routes.get('/:id', maintenanceCtrl.getById);
routes.put('/:id', maintenanceCtrl.update);
routes.delete('/:id', maintenanceCtrl.delete);

module.exports = routes;
