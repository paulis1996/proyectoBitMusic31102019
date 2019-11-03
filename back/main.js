"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const cors = require("cors");

const cancionesRoutes = require("./routes/rutaCancion");
const usuariosRoutes = require("./routes/rutaUsuario");
const loginRoutes = require("./routes/rutaLogin");

const colors = require("colors");
const app = express();
const PORT = 3000;
const DB = "bitmusic";

mongoose
  .connect("mongodb://localhost:27017", {
    dbName: DB,
    useNewUrlParser: true,
    //useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Pudimos ingresar a la base de datos ${DB}`.bgBlue);
  })
  .catch(error => {
    console.log(
      `tenemos problemas para entrar a la base de datos:${error}`.bgRed
    );
  });

app.use(bodyParser.json());

//app.use(cors({ origen: "http://localhost:4200" }));
/* app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
}) */


const apiGroupRoutes = [cancionesRoutes, usuariosRoutes, loginRoutes];

apiGroupRoutes.forEach(routes => app.use("/api", routes));

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});
app.listen(PORT, () => {
  console.log(`Estamos usando el Puerto ${PORT}`.bgMagenta);
});
