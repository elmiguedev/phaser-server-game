require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT;

// inicializa algunas rutas
// ------------------------------
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.get("/holi", (req, res) => {
    res.json("holi");
});

// inicializa el server socket 
// ------------------------------
io.on('connection', (socket) => {
    console.log('Usuario conectado:',socket.id);
     socket.on('disconnect', function () {
       console.log('Usuario desconectado', socket.id);
    });
 });

// inicializa el servidor
// ------------------------------
http.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
