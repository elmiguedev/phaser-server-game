import Phaser from "phaser";
import ChobiPng from "../assets/img/chobi.png";
import ServerManager from "../managers/ServerManager";


export default class MainScene extends Phaser.Scene {

    // propiedades
    // -----------------------
    private chobi: Phaser.GameObjects.Image;
    private chobis: Map<string, Phaser.GameObjects.Image>;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;


    // constructor
    // -----------------------

    constructor() {
        super("MainScene");
    }

    // bucle del juego
    // -----------------------

    preload() {
        this.load.image("Chobi", ChobiPng);
    }

    create() {
        this.crearChobi();
        this.crearCursores();

        ServerManager.getInstance().conectar();
        ServerManager.getInstance().enviar("usuario:init",{
            color: this.chobi.tintTopLeft,
            x: this.chobi.x,
            y: this.chobi.y
        });

        ServerManager.getInstance().onUsuarioState((data) => this.crearChobisMalos(data))
        ServerManager.getInstance().onUsuarioConectado((data) => this.crearChobiMalo(data))
        ServerManager.getInstance().onUsuarioMovimiento((data) => this.moverChobiMalo(data))
        ServerManager.getInstance().onUsuarioDesconectado((data) => this.eliminarChobiMalo(data))

    }

    update() {
        this.controlarMovimiento();
    }

    // metodos de creacion
    // -----------------------

    crearChobi() {
        this.chobi = this.add.image(40, 40, "Chobi");
        this.chobi.setTint(Phaser.Display.Color.RandomRGB().color32);
    }

    crearCursores() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    crearChobiMalo(chobi) {
        if (!this.chobis) this.chobis = new Map<string, Phaser.GameObjects.Image>();
        if (ServerManager.getInstance().obtenerId() != chobi.id) {
            this.chobis[chobi.id] = this.add.image(chobi.x, chobi.y, "Chobi");
            this.chobis[chobi.id].setTint(chobi.color);
        }
    }

    crearChobisMalos(chobis) {
        Object.keys(chobis).forEach(key => {
            this.crearChobiMalo(chobis[key])
        })
    }


    // metodos de control
    // -----------------------

    controlarMovimiento() {
        if (this.cursors.up.isDown) this.chobi.y -= 2;
        if (this.cursors.down.isDown) this.chobi.y += 2;
        if (this.cursors.left.isDown) this.chobi.x -= 2;
        if (this.cursors.right.isDown) this.chobi.x += 2;

        ServerManager.getInstance().enviar("usuario:movimiento", {
            x: this.chobi.x,
            y: this.chobi.y
        });
    }

    moverChobiMalo(chobi) {
        if (ServerManager.getInstance().obtenerId() != chobi.id) {
            this.chobis[chobi.id].x = chobi.x;
            this.chobis[chobi.id].y = chobi.y;
        }
    }
    
    eliminarChobiMalo(id) {
        if (this.chobis[id]) {
            this.chobis[id].destroy();
            delete this.chobis[id];
        }
    }
}