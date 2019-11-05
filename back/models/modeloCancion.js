"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cancionesSchema = new Schema({
  // id: {
  //   type: String
  // },
  //_id: mongoose.Schema.Types.ObjectId,
  titulo: {
    type: String
  },
  duracion: {
    type: String,
    default: "N/A"
  },
  genero: {
    type: String
  },
  artista: {
    type: String
  },
  archivo: {
    type: String
  },
});

//const canciones = mongoose.model("canciones", cancionesSchema);
const Canciones = mongoose.model("canciones", cancionesSchema);

module.exports = Canciones;
