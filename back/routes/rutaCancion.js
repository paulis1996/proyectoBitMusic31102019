"use strict";

const express = require("express");
const router = express.Router();
const Canciones = require("../models/modeloCancion");
const multer = require('multer');


// Multer File upload settings
const DIR = 'public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});


// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "audio/mp3" || file.mimetype.indexOf("audio/")!=-1) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only audio format allowed!'));
    }
  }
});




// POST
router.post("/canciones", upload.single('archivo'), (req, res, next) => {
  
  console.log("entro..crear"+req.body.archivo);

  const url = req.protocol + '://' + req.get('host')
  const cancion = new Canciones({
    //_id: new mongoose.Types.ObjectId(),
    titulo: req.body.titulo,
    duracion:  req.body.duracion,
    genero:  req.body.genero,
    artista:  req.body.artista,
    archivo: url + '/public/' + req.file.filename
    
  });

  cancion.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Cancion registered successfully!",
      cancionCreated: {
        _id: result._id,
        titulo: result.titulo,
        duracion: result.duracion,
        genero: result.genero,
        artista: result.artista,
        archivo: result.archivo
      }
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err
      });
  })
  /*Canciones.create(req.body)
    .then(Canciones => {
      res.send(Canciones);
    })
    .catch(next);*/
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
  console.log("entro..put");
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
