const { Schema, model } = require('mongoose');
const mongoo_paginate = require('mongoose-paginate-v2');

const serviceModel = new Schema(
  {
    descricao: { type: String, required: true },
    preco: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

serviceModel.plugin(mongoo_paginate);

module.exports = model('service', serviceModel);
