const mongoose = require('mongoose');

// Definir el esquema para facultades, programas y asignaturas
const universitySchema = new mongoose.Schema({
  facultyName: [{
    type: String,
    required: true
  }],
  programName: [{
    type: String,
    required: true
  }],
  subjectName: [{
    type: String,
    required: true
  }],
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

// Crear el modelo de la universidad
const Universidad = mongoose.model('Universidad', universitySchema);

module.exports = Universidad;
