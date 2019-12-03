const { Schema, model } = require('mongoose');
const mongoo_paginate = require('mongoose-paginate-v2');

const maintenanceModel = new Schema(
  {
    dtemissao: { type: Date, required: true },
    status: { type: String, required: true },
    total: { type: Number, required: false },
    cliente: { type: Schema.Types.ObjectId, ref: 'client' },
    produtos: [
      {
        idProduto: { type: Schema.Types.ObjectId, ref: 'product' },
        descricao: { type: String, required: true },
        preco: { type: Number, required: true },
        quantidade: { type: Number, required: true },
        total: { type: Number, required: true }
      }
    ],
    servicos: [
      {
        idServico: { type: Schema.Types.ObjectId, ref: 'service' },
        descricao: { type: String, require: true },
        preco: { type: Number, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
);

maintenanceModel.plugin(mongoo_paginate);

module.exports = model('maintenance', maintenanceModel);
