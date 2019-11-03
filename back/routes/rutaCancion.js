"use strict";

const express = require("express");
const router = express.Router();
const Canciones = require("../models/modeloCancion");

// POST
router.post("/canciones", (req, res, next) => {
  Canciones
    .create(req.body)
    .then(Canciones => {
      res.send(Canciones);
    })
    .catch(next);
});

// DELETE
router.delete("/canciones/:id", (req, res, next) => {
  Canciones
    .findByIdAndDelete({ _id: req.params.id })
    .then((canciones) => {
      res.send(canciones);
    })
    .catch(next);
});

// GET
router.get("/canciones/:id", (req, res, next) => {
  console.log("entro..ddd");
  Canciones.findById(req.params.id, (err, canciones) => {
    res.status(200).send({ canciones });
  });
});

// GET
router.get("/canciones/", (req, res, next) => {
  Canciones.find((err, canciones) => {
    res.status(200).send({ canciones });
  });
});
module.exports = router;

//PUT
router.put('/canciones/:id', (req, res, next) => {
  console.log("entro..");
  Canciones.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(()=>{
          Canciones.findOne({_id: req.params.id})
          .then((canciones) => {
              res.send(canciones)
          })
      }).catch(next);
    });
//PUT
/* router.put('/canciones/:id', (req, res, next) => {
  Console.log("ENTRÓ A LA ACTUALIZACIÓN");
  canciones.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(() => {
          const cancion = canciones.findOne({ _id: req.params.id })
          return cancion
      }).then((canciones) => {
          res.send(canciones)
      })
      .catch(next)
}) */
