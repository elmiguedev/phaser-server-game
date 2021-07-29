class ZoneRoom {

    constructor(roomName, serverSocket) {
        this.roomName = roomName;
        this.users = {};
        this.io = serverSocket;
    }

    
}