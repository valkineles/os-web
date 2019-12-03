const serviceModel = require('../models/servicos');

class ServicoController {
  async store(req, res) {
    const service = new serviceModel(req.body);

    if (service.descricao.length < 10) {
      return res.status(400).json({ success: false, message: 'A descrição deve ter mais de 10 caracteres !' });
    }

    try {
      const response = await service.save();
      return res.status(201).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const response = await serviceModel.paginate(req.filters, { page, limit });
    return res.status(200).json({ response });
  }

  async getById(req, res) {
    const response = await serviceModel.findById(req.params.id);

    return res.status(200).json({ success: true, data: response });
  }

  async update(req, res) {
    const id = req.params.id;
    let service = new serviceModel(req.body);
    service = service.toObject();

    delete service._id;

    try {
      const response = await serviceModel.findByIdAndUpdate(id, service, { new: true });

      return res.status(201).json({ success: true, data: response });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const response = await serviceModel.findByIdAndDelete(id);

    return res.status(204).json({ success: true });
  }
}

module.exports = new ServicoController();
