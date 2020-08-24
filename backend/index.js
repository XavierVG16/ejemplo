const express = require('express');
const cors = require('cors');
const MysQlStore = require("express-mysql-session");
const session = require("express-session");
const path = require("path");
const multer = require("multer");
const app = express();


 require('./database');
 const { database } = require("./keys");
// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(
    session({
      secret: "xavier",
      resave: false,
      saveUninitialized: false,
      store: new MysQlStore(database),
    })
  );
  const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/img/uploads"),
    filename: (req, file, cb) => {
      cb(null, new Date().getTime() + path.extname(file.originalname));
    },
  });
  app.use(multer({ storage }).single("image"));

// Routes
//app.use( '/user',require('./routes/user.router'))
app.use('/categoria', require('./routes/categoria.routes'));
app.use('/producto', require('./routes/articulo.router'));
app.use('/cliente', require('./routes/cliente.router'))

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});