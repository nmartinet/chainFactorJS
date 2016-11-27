import Phaser from 'phaser'

class Preload extends Phaser.State {
  preload(){
    this.game.load.spritesheet("tiles"    , require("./../assets/tiles.png")  , 70, 70, 10);
    this.game.load.spritesheet("column"   , require("./../assets/columns.png"), 73, 501, 2);
    this.game.load.spritesheet("buttons"  , require("./../assets/buttons.png"), 250, 77, 2);
  }
  create(){
    this.state.start("Menu");
  }
}

export default Preload;