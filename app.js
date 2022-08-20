/* Requiero Express */
const EXPRESS = require("express");
const METHODOVERRIDE = require("method-override");
const BCRYPT = require("bcrypt");

/* Requiero las rutas */
const homeRoute = require("./routes/homeRoute");
const usersRoute = require("./routes/usersRoute");

/* Funcionalidad de express */
const APP = EXPRESS();

/* Configuracion de ejs en carpeta views */
APP.set("view engine", "ejs");

/* Configuraciones de express */
APP.use(EXPRESS.static(__dirname + "/public"));
APP.use(EXPRESS.urlencoded({ extended: false }));
APP.use(EXPRESS.json());
APP.use(METHODOVERRIDE("_method"));

/* Rutas existentes */
APP.use("/", homeRoute);

APP.use("/users", usersRoute);

/* Error 404 */
APP.use((req, res, next) => {
  res.status(404).send("No existe la pagina buscada");
});

/* Servidor puerto 3000 */
APP.listen(3000, console.log("Servidor Corriendo"));
