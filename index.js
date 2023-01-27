const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");
const fs = require("fs");

//const { dirname } = require("path");

const app = express();

// enable files upload
app.use(fileUpload({ createParentPath: true }));
//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//start app
const port = process.env.PORT || 2800;

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});

app.get("/", (req, res) => {
  const respuesta = { response: "Hello world from AEDITIP", date: new Date() };
  res.json(respuesta);
});

app.get("/amigos", (req, res) => {
  const listaAmigos = [
    {
      id: 100,
      nombres: "space X",
      fotoPerfil:
        "https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg",
      fotoPortada: "",
      linkProfile: "https://twitter.com/SpaceX",
      amigosEnComun: 15,
    },
    {
      id: 101,
      nombres: "Disney+",
      fotoPerfil:
        "https://pbs.twimg.com/profile_images/1592909646779469824/bCHy4Ydk_400x400.png",
      fotoPortada: "",
      amigosEnComun: 5,
    },
    {
      id: 102,
      nombres: "Elon Musk",
      fotoPerfil: "https://twitter.com/elonmusk/photo",
      fotoPortada: "",
      amigosEnComun: 25,
    },
    {
      id: 103,
      nombres: "reactjs",
      fotoPerfil:
        "https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png",
      fotoPortada: "",
      amigosEnComun: 35,
    },
    {
      id: 104,
      nombres: "Developer Nation Global Community",
      fotoPerfil:
        "https://pbs.twimg.com/profile_images/1542438312622919682/i45rksdy_400x400.jpg",
      fotoPortada: "",
      amigosEnComun: 53,
    },
    {
      id: 105,
      nombres: "Grupo AEDITIP",
      fotoPerfil:
        "https://pbs.twimg.com/profile_images/1542438312622919682/i45rksdy_400x400.jpg",
      fotoPortada:
        "https://scontent.flim2-2.fna.fbcdn.net/v/t39.30808-6/278340192_1008498183126701_3629312930669990951_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHWGHClUwkKuDRzKdSp6yrWgKBS6ndnKYCAoFLqd2cpgOuwLjwkqTYDC2PK7HSpmP_ARm1mUgFrJl7ZFX2ozUsD&_nc_ohc=dsr0PvBjjswAX-CohfF&_nc_ht=scontent.flim2-2.fna&oh=00_AfBQhoHg9kowMpktYr8mCVIcf5iaazp6Tu3FgJiVIWDGPw&oe=63A23ADA",
      amigosEnComun: 5,
    },
  ];

  res.send(listaAmigos);
});

app.get("/feed", (req, res) => {
  let response = undefined;
  response = [...listaFeed];
  res.send(response);
});

app.post("/iniciar-sesion", (req, res) => {
  let response = undefined;
  const { correo, contrasenia } = req.body;
  console.log("correo", correo);
  console.log("contrasenia", contrasenia);
  //llamo a la BD
  const indexUsuario = usuarios.findIndex(
    (U) => U.correo === correo && U.password === contrasenia
  );

  if (indexUsuario !== -1) {
    //se encontro un usuario
    res.send({
      message: "Se encontro al usuario satisfactoriamente",
      payload: { ...usuarios[indexUsuario], password: undefined },
      success: true,
      dateTime: new Date(),
    });
  } else {
    //no se encontro al usuario
    res.send({
      message: "No se encontro al usuario con las credenciales enviadas",
      payload: {},
      success: false,
      dateTime: new Date(),
    });
  }
  res.send(response);
});

app.post("/registrar-usuario", (req, res) => {
  let response = undefined;

  const {
    nombre,
    apellido,
    numMovilCorreo,
    contraseniaNueva,
    fechaNacimiento,
    genero,
  } = req.body;

  console.log(
    "data",
    nombre,
    apellido,
    numMovilCorreo,
    contraseniaNueva,
    fechaNacimiento,
    genero
  );

  //llamo a la BD

  //inserto usuario

  const nuevoUsuario = {
    id: usuarios.length + 100,
    nombres: `${nombre} ${apellido}`,
    fotoPerfil: undefined,
    correo: numMovilCorreo,
    password: contraseniaNueva,
    fechaNacimiento,
    genero,
  };
  const listaNuevosUsuarios = [...usuarios, nuevoUsuario];
  //actualizo los usuarios

  usuarios = [...listaNuevosUsuarios];

  res.send({
    message: "Se registró el nuevo usuario exitosamente",
    payload: { ...nuevoUsuario, password: undefined },
    success: true,
    dateTime: new Date(),
  });
});

let usuarios = [
  {
    id: 28,
    nombres: "Jin Jose Manuel Serrano Amaut",
    fotoPerfil:
      "https://mediaini.com/wp-content/uploads/2020/06/Tony-Stark.jpg",
    fotoPortada: "https://imagenpng.com/wp-content/uploads/2016/09/portada.jpg",
    correo: "jin.manuel@aeditip.com.pe",
    password: "1234567",
    genero: "Hombre",
  },
  {
    id: 100,
    nombres: "space X",
    fotoPerfil:
      "https://pbs.twimg.com/profile_images/1082744382585856001/rH_k3PtQ_400x400.jpg",
    fotoPortada: "",
    linkProfile: "https://twitter.com/SpaceX",
    correo: "spaceX@gmail.com",
    password: "1234567",
    genero: "Personalizado",
  },
  {
    id: 101,
    nombres: "Disney+",
    fotoPerfil:
      "https://pbs.twimg.com/profile_images/1592909646779469824/bCHy4Ydk_400x400.png",
    fotoPortada: "",
    correo: "DisneyPlus@gmail.com",
    password: "1234567",
    genero: "Personalizado",
  },
];

const listaFeed = [
  {
    idPost: 1,
    authorId: 100,
    texto:
      "Falcon 9 launches the Surface Water and Ocean Topography (SWOT) mission to orbit; first stage booster returns to Earth",
    imagen:
      "https://pbs.twimg.com/media/FkG5QtZVQAAV7v7?format=jpg&name=4096x4096",
    fecha: "16/12/2022T08:00:00Z",
  },
  {
    idPost: 2,
    authorId: 100,
    texto:
      "T-1 hour until Falcon 9's launch of the Surface Water and Ocean Topography (SWOT) mission; weather remains favorable for liftoff. SWOT mission coverage will be provided by NASA. Tune in to http://NASA.gov/live to watch the live broadcast, starting at 3:00 a.m. PT today",
    imagen: "https://pbs.twimg.com/media/FkDS5NRWIAYsnDf?format=jpg&name=small",
    fecha: "16/12/2022T05:46:00z",
  },
  {
    idPost: 3,
    authorId: 101,
    texto: "They’ve got two looks (and that’s it). 🤌⬇️",
    imagen:
      "https://pbs.twimg.com/media/FkIbpAJWYA4Ee0g?format=jpg&name=medium",
    fecha: "16/12/2022T17:11:00z",
  },
  {
    idPost: 4,
    authorId: 102,
    texto:
      "So inspiring to see the newfound love of freedom of speech by the press 🥰",
    imagen: "undefined",
    fecha: "16/12/2022T15:45:00z",
  },
  {
    idPost: 5,
    authorId: 102,
    texto:
      "ntroducing Tesla Electric, the electricity plan that offers low-cost clean energy for homes with Powerwall—starting in Texas → https://tesla.com/electric",
    imagen: "https://pbs.twimg.com/media/FkDR5YtWIB4wZho?format=jpg&name=large",
    fecha: "15/12/2022T17:08:00z",
  },
  {
    idPost: 6,
    authorId: 102,
    texto:
      "If anyone posted real-time locations & addresses of NYT reporters, FBI would be investigating, there’d be hearings on Capitol Hill & Biden would give speeches about end of democracy!",
    imagen: "undefined",
    fecha: "15/12/2022T23:23:00z",
  },
  {
    idPost: 7,
    authorId: 103,
    texto: "undefined",
    imagen:
      "https://pbs.twimg.com/media/FcvPDnMaEAAxG-e?format=jpg&name=medium",
    fecha: "15/09/2022T19:53:00z",
  },
  {
    idPost: 8,
    authorId: 104,
    texto:
      "5 lesser known git commands you might not have used yet - a thread 🧵",
    imagen: "https://pbs.twimg.com/tweet_video_thumb/FkFXrB9agAAKEzQ.jpg",
    fecha: "16/09/2022T14:52:00z",
  },
  {
    idPost: 9,
    authorId: 104,
    texto:
      'git notes add -m "Test note" Add additional notes to your git commits for future reference, great for having hidden notes for CI/CD runs per commit. To view the note later simple use : git notes show and git log shows the notes as well 📝',
    imagen: "undefined",
    fecha: "16/09/2022T14:52:00z",
  },
  {
    idPost: 10,
    authorId: 105,
    fecha: "13/09/2022T23:23:00z",
    texto:
      "Recuerda que tenemos un curso de Java que inicia en Enero, ¡Y CON PROMOCIÓN 5X4 INCLUÍDA!           ¿Te quedaste con ganas de seguir aprendiendo sobre Spring Boot luego de nuestra serie de Webinars, pero consideras que aún necesitas aprender Java? No te preocupes y aprovecha esta oportunidad, eligiendo aprender con nosotros a programar con Java, usando Programación Orientada a Objetos, manejo de cadenas y fechas, programación modular, concurrencia, entre otros tópicos.            Matricúlate en nuestro curso por un módico precio: te llevarás un curso con un total de ¡42 HORAS SÍNCRONAS! (hemos agregado temas de conexión a bases de datos relacionales) los domingos de 15:00h a 18:00h (hora peruana), con acceso posterior a grabaciones y materiales desarrollados en clases. Por último, recibirás tarifas especiales para nuestros cursos y actividades futuras si aplicas tu matrícula. Es más, ¡estrenamos nuestra oferta de 5x4! Matricúlate en un grupo de 5 y el quinto no paga.            No te vayas a perder esta oportunidad única. Reserva tu vacante AHORA.            Inicio: 8 de Enero de 2023            Precio: S/. 180 (en Perú se adiciona el IGV); aprox. 47.25 dólares",
    imagen:
      "https://scontent.flim2-2.fna.fbcdn.net/v/t39.30808-6/319883782_1024165728975816_6135108557195665842_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeHYFAetNLFgXJdxLq-G10GeEYTkLbvrjTcRhOQtu-uNN4Psvd_FYCYpjMdck1GbiiKJv7oBmwFHnGTyn-YWLwG_&_nc_ohc=sN3G9wKbbVYAX8mxAwf&_nc_ht=scontent.flim2-2.fna&oh=00_AfCxpaF-cTuZpiR_7cCIBRqFxcWLPebuQfnQbeWFaJjghw&oe=63A28790",
  },
];


// Export the Express API
module.exports = app;