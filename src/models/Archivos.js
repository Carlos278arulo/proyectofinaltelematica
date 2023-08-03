// Docente.js

const mongoose = require('mongoose');

const docenteSchema = new mongoose.Schema({
  correo: { type: String, required: true },
  guia: { type: String, required: true },
  pregunta: { type: [String], required: false },
  preguntaSele: { type: [String], required: false },
  opcionCorrecta: { type: Number, required: false },
  opciones: { type: [String], required: false },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

const Docente = mongoose.model('Docente', docenteSchema);

module.exports = Docente;
