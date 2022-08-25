/* Requiero Express */
const EXPRESS = require("express");
const METHODOVERRIDE = require("method-override");
const BCRYPT = require("bcrypt");

/* Requiero las rutas */
const homeRoute = require("./routes/homeRoute");
const usersRoute = require("./routes/usersRoute");
const errorMiddleware = require("./middleware/errorMiddleware");

/* Funcionalidad de express */
const APP = EXPRESS();

/* Configuracion de ejs en carpeta views */
APP.set("view engine", "ejs");

/* Middelwares de express */
APP.use(EXPRESS.static(__dirname + "/public"));
APP.use(EXPRESS.urlencoded({ extended: false }));
APP.use(EXPRESS.json());
APP.use(METHODOVERRIDE("_method"));

/* Rutas existentes */
APP.use("/", homeRoute);

APP.use("/users", usersRoute);

/* Error 404 */
APP.use(errorMiddleware);

/* Servidor puerto 3000 */
APP.listen(3000, console.log("Servidor Corriendo"));
