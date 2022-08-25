const { check, validationResult, body } = require("express-validator");

let validCreateMiddleware = (req, res, next) => {
  /* Validacion con express-validator */
  let errors = validationResult(req);

  let errorNombre;
  let errorApellido;
  let errorEdad;
  let errorProfesion;
  let errorNacimiento;
  let errorEmail;
  let errorContraseña;

  if (!errors.isEmpty()) {
    /* return res.render("registerUser", { errors: errors.errors }); */

    for (let i = 0; i < errors.errors.length; i++) {
      switch (errors.errors[i].param) {
        case "nombre":
          errorNombre = errors.errors[i].msg;
          break;
        case "apellido":
          errorApellido = errors.errors[i].msg;
          break;
        case "edad":
          errorEdad = errors.errors[i].msg;
          break;
        case "profesion":
          errorProfesion = errors.errors[i].msg;
          break;
        case "birth":
          errorNacimiento = errors.errors[i].msg;
          break;
        case "email":
          errorEmail = errors.errors[i].msg;
          break;
        case "contraseña":
          errorContraseña = errors.errors[i].msg;
          break;
      }
    }
    return res.render("registerUser", {
      errorNombre: errorNombre,
      errorApellido: errorApellido,
      errorEdad: errorEdad,
      errorProfesion: errorProfesion,
      errorNacimiento: errorNacimiento,
      errorEmail: errorEmail,
      errorContraseña: errorContraseña,
    });
  }
  next();
};

module.exports = validCreateMiddleware;
