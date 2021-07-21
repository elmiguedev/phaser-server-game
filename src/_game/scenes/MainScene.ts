import Phaser from "phaser";
import ChobiPng from "../assets/img/chobi.png";
import ServerManager from "../managers/ServerManager";


export default class MainScene extends Phaser.Scene {

    // propiedades
    // -----------------------
    private chobi:Phaser.GameObjects.Image;
    private cursors:Phaser.Types.Input.Keyboard.CursorKeys;


    // constructor
    // -----------------------

    constructor() {
        super("MainScene");
    }

    // bucle del juego
    // -----------------------

    preload() {
        this.load.image("Chobi",ChobiPng);
    }

    create() {
        this.crearChobi();
        this.crearCursores();

        ServerManager.getInstance().conectar();
    }

    update() {
        this.controlarMovimiento();
    }

    // metodos de creacion
    // -----------------------

    crearChobi() {
        this.chobi = this.add.image(40,40,"Chobi");
    }

    crearCursores() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // metodos de control
    // -----------------------

    controlarMovimiento() {
        if (this.cursors.up.isDown) this.chobi.y-=2;
        if (this.cursors.down.isDown) this.chobi.y+=2;
        if (this.cursors.left.isDown) this.chobi.x-=2;
        if (this.cursors.right.isDown) this.chobi.x+=2;
    }

}   