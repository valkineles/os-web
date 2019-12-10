require('dotenv-flow').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// * aqui neste ponto existia a conexão com o mongoDB. Movi o código daqui para o arquivo ./mongoose/index.js
// * logo abaixo, fazemos o require deste aquivo, assim que o script chegar neste ponto,
// * o código que está no aquivo será interpretado, observe que NÃO informei o index.js no require.
// * O require procura por um arquivo index.js automaticamente !!
require('./mongoose');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

require('./routes/apiRoutes')(server);

// console.log(process.env.DATABASE_URL_FIREBASE);
// const port = 3300;
// server.listen(port, () => {
//   console.log(`*-*-*-*-*-  Servidor ativo , rodando na porta: ${port} *-*-*-*-*-*-*`);
// });

module.exports = server;
