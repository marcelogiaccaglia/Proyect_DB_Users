const EXPRESS = require("express");
const homeController = require("../controllers/homeController");

const Router = EXPRESS.Router();

Router.get("/", homeController.home);

module.exports = Router;
