const clientModel = require('../models/clientes');

class ClienteController {
  async store(req, res) {
    const client = new clientModel(req.body);

    if (client.nome.length < 10) {
      return res.status(400).json({ success: false, message: 'o nome deve ter mais de 10 caracteres !' });
    }

    try {
      const response = await client.save(); // clientModel.create(client);
      return res.status(201).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const response = await clientModel.paginate(req.filters, { page, limit });
    return res.status(200).json({ response });
  }

  async getById(req, res) {
    const response = await clientModel.findById(req.params.clientId);

    return res.status(200).json({ success: true, data: response });
  }

  async update(req, res) {
    const id = req.params.id;
    let client = new clientModel(req.body);
    client = client.toObject();

    delete client._id;

    try {
      const response = await clientModel.findByIdAndUpdate(id, client, { new: true });

      return res.status(201).json({ success: true, data: response });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const response = await clientModel.findByIdAndDelete(id);

    return res.status(204).json({ success: true });
  }
}

module.exports = new ClienteController();
