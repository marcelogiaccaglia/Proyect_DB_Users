/* Requiero el modulo de la base de datos de usuarios */
const { json } = require("express");
const fs = require("fs");
const BCRYPT = require("bcrypt");
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
    /* Recorremos los usuarios existenetes */
    for (let i = 0; i < usersBD.length; i++) {
      /* Condicional si existe email y contraseña encriptada coincide */
      if (
        req.body.email === usersBD[i].email &&
        BCRYPT.compareSync(req.body.password, usersBD[i].contraseña)
      ) {
        return res.redirect("/users");
      }
    }
    res.send("no existe el usuario");
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
  create: (req, res, next) => {
    let register = {
      id: null,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      edad: parseInt(req.body.edad),
      profesion: req.body.profesion,
      nacimiento: req.body.birth,
      foto: "userDefault.jpg",
      email: req.body.email,
      tipo: req.body.tipo,
      contraseña: BCRYPT.hashSync(req.body.password, 10),
    };

    let newIdUser;
    for (let i = 0; i <= usersBD.length; i++) {
      newIdUser = i + 1;
    }
    register.id = newIdUser;

    if (req.files.length) {
      register.foto = req.files[0].filename;
    }

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
  upload: (req, res, next) => {
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
      usersBD[position].contraseña = BCRYPT.hashSync(req.body.password, 10);
    }

    if (req.files.length) {
      usersBD[position].foto = req.files[0].filename;
    } else {
      usersBD[position].foto = "userDefault.jpg";
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
