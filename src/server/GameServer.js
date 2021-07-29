const io = require("socket.io")

class GameServer {

    constructor(serverSocket) {

        /**  @type {io.Server}*/
        this.serverSocket = serverSocket;
        this.users = {};

        this.handleConnection();

    }

    handleConnection() {
        this.serverSocket.on("connection", (socket) => {
            socket.on('disconnect', () => {
                this.onDisconnect(socket)
            });
            socket.on("usuario:init", (data) => {
                this.onInit(socket,data);
            });
            socket.on("usuario:movimiento", (data) => {
                this.onMovimiento(socket,data);
            })
        })
    }

    // listeners
    // --------------------------------------
    onDisconnect(socket) {
        delete this.users[socket.id];
        this.serverSocket.emit("usuario:desconectado", socket.id);
    }

    onInit(socket, data) {
        data.id = socket.id;
        this.users[data.id] = data;
        console.log(this.users);
        socket.emit("usuario:state", this.users);
        this.serverSocket.emit("usuario:conectado", this.users[socket.id]);
    }

    onMovimiento(socket, data) {
        data.id = socket.id;
        if (this.users[socket.id]) {
            this.users[data.id].x = data.x;
            this.users[data.id].y = data.y;
            this.serverSocket.emit("usuario:movimiento", data);
        }
    }
}

module.exports = GameServer