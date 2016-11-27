import Phaser from 'phaser'

class Boot extends Phaser.State {
  preload(){
    this.game.stage.backgroundColor = this.game.settings.game.style.background;
  }

  create() {
    console.log("boot")
    this.state.start('Preload');
  }
}

export default Boot;