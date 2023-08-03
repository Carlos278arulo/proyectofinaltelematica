const archivosController = {};
const fs = require("fs");
const Docente  = require("../models/Archivos");
const nodemailer = require("nodemailer");
const Guia = require("../models/guiasestu");
//modelo administrador
const Universidad = require("../models/admin");
//modelo user
const User = require("../models/User");

//Configuraciones para administrador
archivosController.Admin = async (req, res) => {
  const { facultyName, programName, subjectName } = req.body;
  console.log('Datos del formulario:', req.body);
  
  // Obtener el ID del usuario desde la sesión o cualquier otra fuente
  const userId = req.user._id; // Reemplaza esta línea con la forma en que obtienes el ID del usuario
  console.log('usuario:', userId);

  try {
    // Crear una nueva instancia del modelo Universidad con los datos proporcionados
    const nuevaUniversidad = new Universidad({
      facultyName,
      programName,
      subjectName,
      usuario: userId
    });

    // Guardar la instancia en la base de datos
    await nuevaUniversidad.save();

    req.flash("success_msg", "Archivo subido");
    res.redirect("/guias/admin/:userId");
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la universidad en la base de datos' });
  }
};

//conusltar guias generadas adkministrador
archivosController.Adminvista = async (req, res) => {
  try {
    // Obtener el ID del usuario desde la sesión o cualquier otra fuente
    const userId = req.user._id; // Reemplaza esta línea con la forma en que obtienes el ID del usuario
    console.log('usuario:', userId);

    // Realizar la consulta en la base de datos para obtener los datos del usuario actual
    const universidades = await Universidad.find({ usuario: userId });

    // Enviar los datos como contexto
    res.render('users/padmin', { universidades });
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar los datos de la base de datos' });
  }
};

//Borrar facultades generadas por el administrador
//eliminar facultades
archivosController.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Universidad.findByIdAndRemove(id);
    req.flash("success_msg", "Facultad borrada exitosamente");
    res.redirect('/guias/admin/:userId'); // Redirige a la página de datos después de borrar la guía
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la guía");
  }
};

//consultar usuarios registrados
archivosController.Adminvistauser = async (req, res) => {
  try {
    const users = await User.find({}, "name email role university");

   // Enviar los datos como contexto
  //  res.render('users/guiasdocen', { users });
    res.render('users/padminuser', { users });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la información de los usuarios" });
  }
}
//eleminar usuarios exitentes
archivosController.deleteAdminuser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    req.flash("success_msg", "User borrado exitosamente");
    res.redirect('/guias/adminuser/:userId'); // Redirige a la página de datos después de borrar la guía
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la guía");
  }
};
// Controlador para editar los datos de un usuario
archivosController.editAdminuser = async (req, res) => {
  const userId = req.user._id; 
  console.log(userId);
  const { nombre, email, role, university } = req.body;
  console.log("xxxxxxxxx",req.body)

  try {
    // Actualizar los campos del usuario en la base de datos
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId }, // Filtrar por el ID del usuario
      { name: nombre, email, role, university }, // Valores a actualizar
      { new: false } // Para obtener el usuario actualizado en lugar del anterior
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    req.flash("success_msg", "Campo actualizado exitosamente");
    return res.redirect('/viewadminuser/:userId'); // Redirige a la página de datos después de borrar la guía
    
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
}


//agregar guias docente
archivosController.createdocente = async (req, res) => {
  const userId = req.user._id;
  const { correo, guia, pregunta, preguntaSele,opcionCorrecta,opciones } = req.body;
  console.log(correo,guia,pregunta,preguntaSele,opcionCorrecta,opciones);
  try {
    // Crea una instancia del modelo Docente con los datos recibidos en el cuerpo de la solicitud
    const nuevoDocente = new Docente({
      correo,
      guia,
      pregunta,
      preguntaSele,
      opcionCorrecta,
      opciones,
      usuario: userId
    });

    // Guarda el docente en la base de datos
    await nuevoDocente.save();

    req.flash("success_msg", "Guia generada con exito");
    res.redirect("/guias/docente");
  } catch (error) {
    console.error('Error al guardar el docente:', error);
    return res.status(500).json({ message: 'Error al guardar el docente' });
  }
};

//conusltar guias generadas docent
archivosController.consultarGuiasdocentes = async (req, res) => {
  try {
    // Realiza la consulta a la base de datos
    const consultadocente = await Docente.find({}, 'guia pregunta preguntaSele opciones opcionCorrecta');
    console.log(consultadocente);

    // Renderiza la plantilla 'datos' y pasa los datos como contexto
    
    res.render('users/guiasdocen', { consultadocente });
  } catch (error) {
    // Manejo de errores en caso de que la consulta falle
    console.error(error);
    res.status(500).json({ error: 'Error al consultar las guías en la base de datos' });
  }
};

//eleminar usuarios exitentes
archivosController.deleteGuiadocenn = async (req, res) => {
  try {
    const { id } = req.params;
    await Docente.findByIdAndRemove(id);
    req.flash("success_msg", "Guias borrada exitosamente");
    res.redirect('/archivodocente?'); // Redirige a la página de datos después de borrar la guía
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al borrar la guía");
  }
};

//conusltar guias estudaintes
archivosController.consultarGuiaestuden = async (req, res) => {
  try {
    // Realiza la consulta a la base de datos
    const consultaestu = await Docente.find({}, 'guia pregunta preguntaSele opciones opcionCorrecta');
    console.log(consultaestu);

    // Renderiza la plantilla 'datos' y pasa los datos como contexto
    
    res.render('users/pestudiante', { consultaestu });
  } catch (error) {
    // Manejo de errores en caso de que la consulta falle
    console.error(error);
    res.status(500).json({ error: 'Error al consultar las guías en la base de datos' });
  }
};



// Controlador para desarrollar la guía del estudiante
archivosController.desarroGuiaestuden = async (req, res) => {
  try {
    // Obtiene el ID de la guía que el usuario desea consultar (pasado como parámetro en la URL)
    const guiaId = req.params.id;

    // Realiza la consulta a la base de datos para obtener la guía por su ID
    const consultaestu = await Docente.findById(guiaId, 'guia pregunta preguntaSele opciones opcionCorrecta');

    if (!consultaestu) {
      // Si no se encuentra la guía, muestra un mensaje o redirige a una página de error
      return res.status(404).send("Guía no encontrada");
    }

    // Renderiza la vista 'pestudiante' y pasa los datos de la guía como contexto
    res.render('users/guiasestu', { consultaestu });
  } catch (error) {
    // Manejo de errores en caso de que la consulta falle
    console.error(error);
    res.status(500).json({ error: 'Error al consultar la guía en la base de datos' });
  }
};

//subirguias estudiantes

archivosController.subirestuArchivo = async (req, res) => {
  try {
    const guia = req.file;

    if (!guia) {
      return res.status(400).send("No se ha proporcionado ningún archivo");
    }

    // Crear un nuevo documento Archivo con los datos del archivo subido
    const nuevaGuia = new Guia({
      guia: {
        data: fs.readFileSync(guia.path),
        contentType: guia.mimetype,
      },
      nombre: req.body.nombre,
      carrera: req.body.carrera,
      asignatura: req.body.asignatura,
      grupo: req.body.grupo,
    });

    await nuevaGuia.save(); // Guardar el nuevo archivo en la base de datos

    // Enviar el correo de notificación
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "carlosjoseariaslopez@gmail.com", // Tu dirección de correo electrónico
        pass: "mqtdukqzaewjzece", // Tu contraseña de correo electrónico
      },
    });

    const mailOptions = {
      from: "carlosjoseariaslopez@gmail.com", // Tu dirección de correo electrónico
      to: "cl5343940@gmail.com", // Dirección de correo del destinatario
      subject: "Nuevo formulario enviado",
      text: `Se ha recibido un nuevo formulario con los siguientes datos:
        Nombre: ${req.body.nombre}
        Carrera: ${req.body.carrera}
        Asignatura: ${req.body.asignatura}
        Grupo: ${req.body.grupo}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        // Manejar el error, si corresponde
      } else {
        console.log("Correo enviado: " + info.response);
        // Manejar la notificación de éxito, si corresponde
      }
    });

    // Eliminar el archivo temporal después de guardarlo en la base de datos
    fs.unlinkSync(guia.path);

    req.flash("success_msg", "Archivo subido");
    res.redirect("/guias/verword/:id");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al subir el archivo");
  }
};














module.exports = archivosController;
