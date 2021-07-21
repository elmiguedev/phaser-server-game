require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT;

// inicializa algunas rutas
// ------------------------------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.get("/holi", (req, res) => {
    res.json("holi");
});

// inicializa el server socket 
// ------------------------------
const state = {
    users: {}
};

io.on('connection', (socket) => {
    socket.on('disconnect', function () {
        delete state.users[socket.id];
        io.emit("usuario:desconectado",socket.id);
    });
    socket.on("usuario:init", (dato) => {
        dato.id = socket.id;
        state.users[dato.id] = dato;
        console.log(state.users);
        socket.emit("usuario:state", state.users);
        io.emit("usuario:conectado",state.users[socket.id]);
    });
    socket.on("usuario:movimiento", (dato) => {
        dato.id = socket.id;
        if (state.users[socket.id]) {
            state.users[dato.id].x = dato.x;
            state.users[dato.id].y = dato.y;
            io.emit("usuario:movimiento", dato);
        }
    })
});

// inicializa el servidor
// ------------------------------
http.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
