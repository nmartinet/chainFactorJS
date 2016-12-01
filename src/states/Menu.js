import Phaser from 'phaser'

import {Anim} from './../objects'

import {createGroup} from './../helpers';


class Menu extends Phaser.State {
  create(){
    this.setupGroups();
    this.setupUI();
  }

  setupGroups(){
    this.titleGroup = createGroup(this.game, 125, 50);
    this.buttonsGroup = createGroup(this.game, 75, 200);
  }
  setupUI(){
    this.titleText = this.game.add.text(0, -125, "Chain Factor ", {font: '80px Shrikhand', fill: 'black'});
    this.titleGroup.add(this.titleText);

    this.newGameButton = this.game.add.button(-350, 0, "buttons", () => this.startNewGame(), 1, 1, 0)
    this.buttonsGroup.add(this.newGameButton);

    let anim =
      new Anim()
        .g()
          .target(this.titleText)
          .tween({to: {y: 0}, length: 750, easing: Phaser.Easing.Bounce.Out})
        .g()
          .tween({to: {x: 160}, length: 500, easing: Phaser.Easing.Sinusoidal.In})
          .staggerItems(400)
        .target([this.newGameButton])
        .run();

  }
  startNewGame(){
    this.state.start("ClassicGame");
  }

}

export default Menu