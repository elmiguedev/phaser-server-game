import * as io from "socket.io/client-dist/socket.io";

export default class ServerManager {
    
    // singleton
    // -----------------------
    private static instance: ServerManager;
    private constructor() { }
    public static getInstance() {
        if(!ServerManager.instance) {
            ServerManager.instance = new ServerManager();
        }
        return ServerManager.instance;
    }

    // propiedades 
    // -----------------------
    
    private socket:any;
    
    // metodos
    // -----------------------
    public conectar() {
        this.socket = io();
    }


}