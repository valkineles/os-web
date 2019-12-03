const userModel = require('../models/usuarios');

// * aqui neste ponto, existia um OBJETO LITERAL.
// * fiz uma refatoração para utilizar o conceito de classe.
// * no final do módulo, exportamos uma nova instância desta classe, ou seja, um objeto.
class UsuarioController {
  async store(req, res) {
    try {
      // * criamos um novo objeto UserModel, com base nos dados que foram estraídos do token
      const user = new userModel(req.tokenData);

      // * inserimos o novo usuário no mongoDB Atlas
      const userCreated = await user.save();

      // * se ocorreu tudo com sucesso , retorna o status 201 com um JSON do usuário criado.
      return res.status(201).json({ success: true, data: userCreated });
    } catch (error) {
      return res.status(401).json({ success: false, errorCode: error.code, message: error.message });
    }
  }

  async getAll(req, res) {
    const { page = 1, limit = 5 } = req.query;
    const response = await userModel.paginate(req.filters, { page, limit });
    return res.status(200).json({ response });
  }

  async getById(req, res) {
    const response = await userModel.findById(req.params.id);

    return res.status(200).json({ success: true, data: response });
  }

  async update(req, res) {
    const id = req.params.id;
    let user = new userModel(req.body);
    user = user.toObject();

    delete user._id;

    try {
      const response = await userModel.findByIdAndUpdate(id, user, { new: true });

      return res.status(201).json({ success: true, data: response });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const response = await userModel.findByIdAndDelete(id);

    return res.status(204).json({ success: true });
  }
}

module.exports = new UsuarioController();
