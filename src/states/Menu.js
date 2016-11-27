import Phaser from 'phaser'

class Menu extends Phaser.State {
  create(){
    console.log("menu");
    this.state.start('ClassicGame');
  }
}

export default Menu