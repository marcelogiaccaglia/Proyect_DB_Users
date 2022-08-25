let errorMiddleware = (req, res, next) => {
  res.status(404).send("No existe la pagina buscada");
  next();
};

module.exports = errorMiddleware;
