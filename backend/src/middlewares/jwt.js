// * toda a conexão com o Firebase Admin, foi movida para o arquivo ../firebase-admin/index.js
// * com isso, em qualquer lugar que precisarmos conectar ao firebase, basta importar o aquivo.
const firebaseAdmin = require('../firebase-admin');

async function jwtValidate(req, res, next) {
  try {
    // * busca o header da requisição. mais expecificamente o header authorizarion
    // * logo em seguida, fazemos um guard, para verificar se existe e se está no formato correto (Bearer token)
    const headers = req.headers.authorization ? req.headers.authorization.split(' ') : false;
    if (!headers || headers[0].toLowerCase() !== 'bearer') {
      return res.status(400).json({ success: false, message: 'Header não informado ou no formato inválido!' });
    }

    const token = headers[1] || '';
    if (!token) {
      return res.status(400).json({ success: false, message: 'Header no formato inválido!' });
    }

    // * utilizamos o Firebase Admin para decodificar o token e retornar os dados contidos no payload
    const tokenData = await firebaseAdmin.auth().verifyIdToken(token);
    if (!tokenData) {
      return res.status(401).json({ success: false, message: 'Usuário não autorizado !' });
    }

    req.tokenData = tokenData;

    next();
  } catch (error) {
    return res.status(401).json({ success: false, errorCode: error.code, message: error.message });
  }
}

module.exports = jwtValidate;
