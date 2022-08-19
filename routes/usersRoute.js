const EXPRESS = require("express");
const usersController = require("../controllers/usersContoller");

const Router = EXPRESS.Router();

Router.get("/", usersController.home);
Router.get("/search", usersController.search);

Router.get("/login", usersController.access);
Router.post("/login", usersController.login);

Router.get("/register", usersController.register);
Router.post("/register", usersController.create);

Router.get("/detalle/:idUser", usersController.detail);

Router.get("/edit/:idUser", usersController.edit);
Router.put("/edit", usersController.upload);

Router.delete("/delete/:idUser", usersController.delete);

module.exports = Router;
