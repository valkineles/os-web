const mongoose = require('mongoose');

console.log(process.env.MONGOOSE_CONNECTION_STRING);
mongoose
  .connect(process.env.MONGOOSE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conectado ao MongoDB Atlas !');
  })
  .catch(error => {
    console.log('erro ao conectar no MongoDB : ', error);
  });

module.exports = mongoose;
