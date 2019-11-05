"use strict";

const express = require("express");
const router = express.Router();
const Canciones = require("../models/modeloCancion");
const multer = require('multer');


// Multer File upload settings
const DIR = 'public/';
var timemiles;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    timemiles = new Date().getTime();
    const fileName = timemiles + '-' + file.originalname.toLowerCase().split(' ').join('-');
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
    if (file.mimetype == "audio/mp3" || file.mimetype.indexOf("audio/") != -1) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Ese formato de archivono es permitido!'));
    }
  }
});




// POST
router.post("/canciones", upload.single('archivo'), (req, res, next) => {

  console.log("entro..crear" + req.body.archivo);

  const url = req.protocol + '://' + req.get('host')
  const cancion = new Canciones({
    //_id: new mongoose.Types.ObjectId(),
    //_id: idVideo,
    titulo: req.body.titulo,
    duracion: req.body.duracion,
    genero: req.body.genero,
    artista: req.body.artista,
    archivo: url + '/' + DIR + req.file.filename,
  });

  cancion.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Canción registrada satisfactoriamente!",
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
        error: err,
        errorMensaje: "Error al registrar la canción"
      });
  });
  /*Canciones.create(req.body)
    .then(Canciones => {
      res.send(Canciones);
    })
    .catch(next);*/
});

// DELETE
router.delete("/canciones/:id", (req, res, next) => {
  Canciones.findById(req.params.id, (err, cancionConsultada) => {

    const url = req.protocol + '://' + req.get('host')
    const nombreArchivo = '.' + (cancionConsultada.archivo.substring(url.length));
    console.log(nombreArchivo);
    Canciones
      .findByIdAndDelete({ _id: req.params.id })
      .then((canciones) => {
        const fs = require('fs');
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó el archivo');
        })
        res.send(canciones);
      })
      .catch(next);
  });

});

// GET
router.get("/canciones/:id", (req, res, next) => {
  console.log("entro..get");
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
/*router.put('/canciones/:id', (req, res, next) => {
  console.log("entro..put");
  
  Canciones.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then(()=>{
          Canciones.findOne({_id: req.params.id})
          .then((canciones) => {
              res.send(canciones)
          })
      }).catch(next);
    });
*/
// PUT
router.put("/canciones/:id", upload.single('archivo'), (req, res, next) => {
  console.log("entro..actualizar" + req.body.archivo);
  const url = req.protocol + '://' + req.get('host')
  let nombreArchivo="";
  const borrar = req.file;
  Canciones.findById(req.params.id, (err, cancionConsultada) => {
    if (borrar) {
      nombreArchivo = url + '/' + DIR + req.file.filename;
    } else {
      nombreArchivo = cancionConsultada.archivo;
    }
    Canciones.updateOne(
      { _id: cancionConsultada._id },  // <-- find stage
      { $set: {                // <-- set stage
          titulo: req.body.titulo,
          duracion: req.body.duracion,
          genero: req.body.genero,
          artista: req.body.artista,
          archivo: nombreArchivo,
        } 
      } 
    ).then(result => {
      console.log(result);
      if (borrar) {
        const nombreArchivo = '.' + (cancionConsultada.archivo.substring(url.length));
        const fs = require('fs');
        console.log(fs.realpath);
        fs.unlink(nombreArchivo, (err) => {
          if (err) console.log(err);
          console.log('Se eliminó el archivo anterior');
        })
      }
      Canciones.findById(req.params.id, (err, cancionConsultada) => {
        res.status(200).json({
          message: "Canción actualizada satisfactoriamente!",
          cancionActualizada: cancionConsultada
        })
      });
    }).catch(err => {
      console.log(err),
        res.status(500).json({
          error: err
        });
    })
  }).catch(err => {
    console.log(err),
      res.status(500).json({
        error: err,
        errorMensaje: "Error al actualizar la canción"
      });
  })
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
