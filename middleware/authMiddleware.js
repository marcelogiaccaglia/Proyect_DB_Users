let fs = require("fs");
let bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

/* -------- Base de Datos ------- */
/* Leemos y convertimos a objeto literal la base de datos JSON */
let usersBD = JSON.parse(
  fs.readFileSync("data/usersJSON.json", { encoding: "utf-8" })
);

let authMiddleware = (req, res, next) => {
  /* Validacion con express-validator */
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("loginUser", { errors: errors.errors });
  }

  /* Validamos si es administrador */
  if (
    req.body.email === "admintotal@gmail.com" &&
    bcrypt.compareSync(req.body.password, usersBD[0].contraseña)
  ) {
    return res.redirect("/users");
  }
  next();
};

module.exports = authMiddleware;
