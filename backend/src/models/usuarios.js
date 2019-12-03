const { Schema, model } = require('mongoose');
const mongoo_paginate = require('mongoose-paginate-v2');

const userModel = new Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, required: true },
    uid: { type: String, required: true },
    email: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

userModel.plugin(mongoo_paginate);

module.exports = model('user', userModel);
