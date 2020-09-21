const jwt = require('jsonwebtoken');
const Usuario = require('../usuarios/Usuario');

module.exports = async function (req, res, next) {
  //obtener token del header
  const token = req.header('x-auth-token');

  //check si no lo tiene
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no provisto ' });
  }

  //verificar token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findOne({
      _id: decoded.user.id
    });

    req.token = token;
    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token no valido ' });
  }
};
