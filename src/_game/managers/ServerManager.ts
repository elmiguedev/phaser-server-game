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
    
    // metodos principales
    // -----------------------
    public conectar(data?:any) {
        this.socket = io();
    }

    public obtenerId() {
        return this.socket.id;
    }   

    public enviar(mensaje:string, dato:any) {
        this.socket.emit(mensaje, dato);
    }

    public escuchar(mensaje:string, callback:Function) {
        this.socket.on(mensaje, callback);
    }

    // listeners
    // -----------------------

    onUsuarioConectado(callback:Function) {
        this.escuchar("usuario:conectado", (data) => {
            callback(data);
        })
    }

    onUsuarioDesconectado(callback:Function) {
        this.escuchar("usuario:desconectado", (data) => {
            callback(data);
        })
    }

    onUsuarioMovimiento(callback:Function) {
        this.escuchar("usuario:movimiento", (data) => {
            callback(data);
        })
    }

    onUsuarioState(callback:Function) {
        this.escuchar("usuario:state", (data) => {
            callback(data);
        })
    }

    

}