const { check, validationResult, body } = require("express-validator");

let validExpressMiddleware = [
  check("nombre").isLength({ min: 2 }).withMessage("Campo Nombre Obligatorio"),
  check("apellido")
    .isLength({ min: 2 })
    .withMessage("Campo Apellido Obligatorio"),
  check("edad").isLength({ min: 2 }).withMessage("Campo Edad Obligatorio"),
  check("profesion")
    .isLength({ min: 2 })
    .withMessage("Campo Profesion Obligatorio"),
  check("birth")
    .isLength({ min: 2 })
    .withMessage("Campo Fec. Nac. Obligatorio"),
  check("email").isEmail().withMessage("No es un email valido"),
  check("password").isLength({ min: 8 }).withMessage("Minimo 8 caracteres"),
];

module.exports = validExpressMiddleware;
