const maintenanceModel = require('../models/maintenance');

class ManutencaoController {
  async store(req, res) {
    const maintenance = new maintenanceModel(req.body);

    try {
      const response = await maintenance.save();
      return res.status(201).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    const { page = 1, limit = 5 } = req.query;

    //const response = await maintenanceModel.find().populate('cliente');

    const response = await maintenanceModel.paginate(req.filters, { page, limit, populate: { path: 'cliente' } });
    console.log(response);
    return res.status(200).json({ response });
  }

  async getById(req, res) {
    const response = await maintenanceModel.findById(req.params.id);

    return res.status(200).json({ success: true, data: response });
  }

  async update(req, res) {
    const id = req.params.id;
    let maintenance = new maintenanceModel(req.body);
    maintenance = maintenance.toObject();

    delete maintenance._id;

    try {
      const response = await maintenanceModel.findByIdAndUpdate(id, maintenance, { new: true });

      return res.status(201).json({ success: true, data: response });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const response = await maintenanceModel.findByIdAndDelete(id);

    return res.status(204).json({ success: true });
  }
}

module.exports = new ManutencaoController();
