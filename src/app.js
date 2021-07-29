require("dotenv").config();

const path = require("path");
const express = require("express");
const GameServer = require("./server/GameServer");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

// inicializa algunas rutas
// ------------------------------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.get("/holi", (req, res) => {
    res.json("holi");
});

// inicializa el server socket 
// ------------------------------
const server = new GameServer(io);

// inicializa el servidor
// ------------------------------
http.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
