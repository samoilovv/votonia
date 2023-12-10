
window.addEventListener('load', function() {

	var game = new Phaser.Game({
    "title": "ElephantMemory",
    "width": 720,
    "height": 1280,
    "type": Phaser.AUTO,
    "backgroundColor": "#000",
    "parent": "game-container",
    "scale": {
        "mode": Phaser.Scale.FIT,
        "autoCenter": Phaser.Scale.CENTER_BOTH
    }
	});
	game.scene.add("Boot", Boot, true);
	
});

class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/pack.json");
	}

	create() {
		//this.scene.start("GameScene");
		this.scene.start("Scene1");
	}

}
