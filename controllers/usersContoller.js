/* Requiero el modulo de la base de datos de usuarios */
const { json } = require("express");
const fs = require("fs");
const { default: swal } = require("sweetalert");
const alert = require("sweetalert");

/* -------- Base de Datos ------- */
/* Leemos y convertimos a objeto literal la base de datos JSON */
let usersBD = JSON.parse(
  fs.readFileSync("data/usersJSON.json", { encoding: "utf-8" })
);

let usersController = {
  home: (req, res) => {
    res.render("homeUsers", { usersBD: usersBD });
  },
  search: (req, res) => {
    let busqueda = req.query.searchs;
    let busqueda2 = [];
    /* let error; */
    for (let i = 0; i < usersBD.length; i++) {
      if (usersBD[i].nombre.includes(busqueda)) {
        busqueda2.push(usersBD[i]);
      } /* Como hacer para atajar el error ??? */ /* else {
        error = "No existe usuario buscado";
      } */
    }
    res.render("searchUsers", { busqueda2: busqueda2 } /* { error: error } */);
  },
  access: (req, res) => {
    res.render("loginUser");
  },
  login: (req, res) => {
    for (let i = 0; i <= usersBD.length; i++) {
      if (req.body.email === usersBD[i].email) {
        res.redirect("/users");
      } else {
        res.send("no existe el usuario");
      }
    }
  },
  detail: (req, res) => {
    let userSelectNum = parseInt(req.params.idUser);
    let userSelect;
    for (let i = 0; i < usersBD.length; i++) {
      if (userSelectNum === usersBD[i].id) {
        userSelect = usersBD[i];
      }
    }
    res.render("detailUser", { userSelect: userSelect });
  },
  register: (req, res) => {
    res.render("registerUser");
  },
  create: (req, res) => {
    let register = {
      id: null,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      edad: parseInt(req.body.edad),
      profesion: req.body.profesion,
      nacimiento: req.body.birth,
      email: req.body.email,
      tipo: req.body.tipo,
    };

    let newIdUser;
    for (let i = 0; i <= usersBD.length; i++) {
      newIdUser = i + 1;
    }

    register.id = newIdUser;

    let newUser = [];
    let JsonBD = fs.readFileSync("data/usersJSON.json", { encoding: "utf-8" });
    if (JsonBD === "") {
      newUser = [];
    } else {
      newUser = JSON.parse(JsonBD);
    }

    newUser.push(register);
    let newBDtoJson = JSON.stringify(newUser);
    fs.writeFileSync("data/usersJSON.json", newBDtoJson);

    res.redirect("/users");
  },
  edit: (req, res) => {
    let userEditNum = parseInt(req.params.idUser);
    let userEdit;
    for (let i = 0; i < usersBD.length; i++) {
      if (userEditNum === usersBD[i].id) {
        userEdit = usersBD[i];
      }
    }
    res.render("editUser", { userEdit: userEdit });
  },
  upload: (req, res) => {
    let position;
    for (let i = 0; i < usersBD.length; i++) {
      if (parseInt(req.body.id) === usersBD[i].id) {
        position = i;
      }
    }
    if (parseInt(req.body.id) === usersBD[position].id) {
      usersBD[position].nombre = req.body.nombre;
      usersBD[position].apellido = req.body.apellido;
      usersBD[position].edad = parseInt(req.body.edad);
      usersBD[position].profesion = req.body.profesion;
      usersBD[position].nacimiento = req.body.birth;
      usersBD[position].email = req.body.email;
      usersBD[position].tipo = req.body.tipo;
    }
    let editBDtoJSON = JSON.stringify(usersBD);
    fs.writeFileSync("data/usersJSON.json", editBDtoJSON);

    res.redirect("/users");
  },
  delete: (req, res) => {
    let userDelete = parseInt(req.params.idUser);
    userDelete = userDelete - 1;

    usersBD.splice(userDelete, 1);
    /* for (let i = 0; i <= usersBD.length; i++) {
      console.log(parseInt(usersBD[i].id));
      usersBD[i].id = i + 1;
    } */
    /* let newUserBD = usersBD.forEach((e, i) => {
      console.log(e[i].nombre);
    }); */
    let deleteIdtoJson = JSON.stringify(usersBD);
    fs.writeFileSync("data/usersJSON.json", deleteIdtoJson);

    res.redirect("/users");
  },
};

module.exports = usersController;
