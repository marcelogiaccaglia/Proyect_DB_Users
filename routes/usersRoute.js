const EXPRESS = require("express");
const MULTER = require("multer");
const PATH = require("path");

/* Configuracion de Multer */
const storage = MULTER.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/tmp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + PATH.extname(file.originalname)
    );
  },
});
const upload = MULTER({ storage: storage });

/* Requerir Controller */
const usersController = require("../controllers/usersContoller");

const Router = EXPRESS.Router();

Router.get("/", usersController.home);
Router.get("/search", usersController.search);

Router.get("/login", usersController.access);
Router.post("/login", usersController.login);

Router.get("/register", usersController.register);
Router.post("/register", upload.any(), usersController.create);

Router.get("/detalle/:idUser", usersController.detail);

Router.get("/edit/:idUser", usersController.edit);
Router.put("/edit", upload.any(), usersController.upload);

Router.delete("/delete/:idUser", usersController.delete);

module.exports = Router;
