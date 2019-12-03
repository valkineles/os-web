const { Schema, model } = require('mongoose');
const mongoo_paginate = require('mongoose-paginate-v2');

const clientModel = new Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: false },
    apelido: { type: String }
  },
  {
    timestamps: true
  }
);

clientModel.plugin(mongoo_paginate);

module.exports = model('client', clientModel);
