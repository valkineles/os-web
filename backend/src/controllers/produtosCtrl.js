const productModel = require('../models/produtos');

class ProdutoController {
  async store(req, res) {
    const product = new productModel(req.body);

    if (product.descricao.length < 10) {
      return res.status(400).json({ success: false, message: 'A descrição deve ter mais de 10 caracteres !' });
    }

    try {
      const response = await product.save();
      return res.status(201).json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const response = await productModel.paginate(req.filters, { page, limit });
    return res.status(200).json({ response });
  }

  async getById(req, res) {
    const response = await productModel.findById(req.params.id);

    return res.status(200).json({ success: true, data: response });
  }

  async update(req, res) {
    const id = req.params.id;
    let product = new productModel(req.body);
    product = product.toObject();

    delete product._id;

    try {
      const response = await productModel.findByIdAndUpdate(id, product, { new: true });

      return res.status(201).json({ success: true, data: response });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const response = await productModel.findByIdAndDelete(id);

    return res.status(204).json({ success: true });
  }
}

module.exports = new ProdutoController();
