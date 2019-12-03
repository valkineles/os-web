const { Schema, model } = require('mongoose');
const mongoo_paginate = require('mongoose-paginate-v2');

const productModel = new Schema(
  {
    descricao: { type: String, required: true },
    preco: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

productModel.plugin(mongoo_paginate);

module.exports = model('product', productModel);
