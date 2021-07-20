import Phaser from "phaser";
import MainScene from "./scenes/MainScene";

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 320,
    height: 200,
    render: {
        pixelArt: true
    },
    physics: {
        default: "arcade",
    },
    dom: {
        createContainer: true
    },
    scene: [
        MainScene
    ]
});