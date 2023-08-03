//renderizar vistas de paginas
const {Router} = require("express");
const router = Router();
const { 
    renderdocente,  
    renderestudiante,
    renderword,
    renderviewdocente,
    renderform,
    renderadmin,
    renderadminuser
   
} = require("../controllers/guias.controller");

const { isAuthenticated } = require("../helpers/auth");

// Ruta para administrador
router.get("/guias/admin/:userId",isAuthenticated, renderadmin);
//Ver lista de ususarios registrados 
router.get("/guias/adminuser/:userId",isAuthenticated, renderadminuser);


// Ruta para docente
router.get("/guias/docente",isAuthenticated,renderdocente);

//Ver guias por el docente
router.get("/guias/viewdocente",isAuthenticated, renderviewdocente);


// Ruta para estudiante
router.get("/guias/estudiante", renderestudiante);
// Ruta para desarrollar guia
router.get("/guias/verword/:id", renderword);




//
router.get("/guias/form", renderform);










module.exports = router;
