/*Usuarios Admitidos para pruebas*/
const usuarios = {
  admin: { username: "admin", password: "1234", role: "admin" },
  user: { username: "user", password: "1234", role: "user" },
};

// Middleware para verificar usuario (SI EXISTE O por ende tiene algun role)
export const verificarUsuario = (req, res, next) => {
  const { username, password } = req.headers;

  const usuario = usuarios[username];
  if (!usuario || usuario.password !== password) {
    return res.status(401).json({ msg: "Credenciales inválidas" });
  }

  req.user = usuario;
  next();
};

// Middleware para verificar si es admin
export const verificarAdmin = (req, res, next) => {
  const { username, password } = req.headers;

  const usuario = usuarios[username];
  if (!usuario || usuario.password !== password || usuario.role !== "admin") {
    return res
      .status(403)
      .json({ msg: "Acceso restringido solo para administradores" });
  }

  req.user = usuario;
  next();
};
