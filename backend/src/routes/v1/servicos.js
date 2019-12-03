const express = require('express');
const getFilters = require('../../middlewares/filters');
const routes = express.Router();

const serviceCtrl = require('../../controllers/servicosCtrl');

routes.post('/', serviceCtrl.store);
routes.get('/', getFilters, serviceCtrl.getAll);
routes.get('/:id', serviceCtrl.getById);
routes.put('/:id', serviceCtrl.update);
routes.delete('/:id', serviceCtrl.delete);

module.exports = routes;
