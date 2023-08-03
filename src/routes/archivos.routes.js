const express = require("express");
const router = express.Router();
const archivoController = require("../controllers/archivos.controller");

//rutas para A

// Ruta POST para el administrador para crear  facultades
router.post('/createadmin', archivoController.Admin)

// Ruta para consultar administrador para facultades
router.get("/viewadmin/:userId", archivoController.Adminvista);

// Ruta para borrar facultades administrador
router.delete("/deleteadmin/:id", archivoController.deleteAdmin);
//
//usuarios admin
//
// Ruta para consultar usuarios inscritos
router.get("/viewadminuser/:userId", archivoController.Adminvistauser);
// Ruta para borrar usuarios administrador
router.delete("/deleteadminuser/:id", archivoController.deleteAdminuser);
// Ruta para editar un usuario administrador
router.post("/editadminuser/:id", archivoController.editAdminuser);



// Ruta POst para el docente agregar las pregunstas
router.post('/createdocente', archivoController.createdocente)

// Ruta para consultar guias generadas por el docente
router.get("/archivodocente", archivoController.consultarGuiasdocentes);
// Ruta para borrar usuarios administrador
router.delete("/deleteguiadocen/:id", archivoController.deleteGuiadocenn);

//configuracion estudiante

//consulatar guias por el estudainte
router.get("/guiasestudiantes", archivoController.consultarGuiaestuden);

// Ruta para consultar la guía a desarrollar
router.get("/guiasestudiantes/:id", archivoController.desarroGuiaestuden);






  module.exports = router;

