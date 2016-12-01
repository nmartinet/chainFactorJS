import Phaser from 'phaser'
import {Tile, Board, Anim, LevelManager} from './../objects';

import {createGroup} from './../helpers'; 

class ClassicGame extends Phaser.State{

  create(){
    this.levelManager               = new LevelManager(this.game);

    this.setupGroups();
    this.setupInfo();
    this.setupColumns();

    this.createLevel();
  }

  setupGroups(){
    this.columnsGroup = createGroup(this.game, 20, 20);
    this.tileGroup    = createGroup(this.game, 20, 20);
    this.infoGroup    = createGroup(this.game, 540, 20);
    this.lossGroup    = createGroup(this.game, 0, 50);

    this.infoGroups = {
      'nextTile': createGroup(this.game, 0, 0),
      'score': createGroup(this.game, 0, 115),
      'chain': createGroup(this.game, 0, 190),
      'level': createGroup(this.game, 0, 350)
    };

    for (var key of Object.keys(this.infoGroups)){
      this.infoGroup.add(this.infoGroups[key]);
    };
  }

  setupInfo(){
    let {sidebar} = this.game.settings;
    this.infos = {};

    const alignInfoRight = (text) => {
      text.x = sidebar.width - text.width;
    };

    for(var name of Object.keys(sidebar.infoDefs)){
      let info = sidebar.infoDefs[name];
      this.infos[name] = this.game.add.text(0, info.y, info.text, sidebar.style);
      this.infoGroups[info.group].add(this.infos[name]);
      alignInfoRight(this.infos[name]);
    };

    this.nextTile = new Tile({ game: this.game, group: this.infoGroups['nextTile'], row: 0, col: 0, v: 1 })
    this.nextTile.x = 135;
    this.nextTile.y=  70;

    this.levelManager.onEvent({event: "nextTileChange", callback: ({tile}) => {
      let l = 200;
      
      let anim = new Anim()
        .g()
          .tween({to: {alpha: 0}, length: l, easing: Phaser.Easing.Sinusoidal.In})
          .tween({to: {scale: {x: 0, y: 0}}, length: l, easing: Phaser.Easing.Sinusoidal.Out})
          .then( (target) => {
            let t = target[0];
            t.updateValue(tile);
            t.refresh();
          })
        .g()
          .tween({to: {alpha: 1}, length: l, easing: Phaser.Easing.Sinusoidal.In})
          .tween({to: {scale: {x: 1, y: 1}}, length: l, easing: Phaser.Easing.Sinusoidal.Out})
        .target(this.nextTile)
        .run();

    }})

    this.levelManager.onEvent({event: "scoreChange", callback: ({score}) => {
      this.infos['score'].text = score.toString();
      alignInfoRight(this.infos['score']);
    }});    

    this.levelManager.onEvent({event: "chainChange", callback: ({chain}) => {
      let n = chain === 0 ? 1 : chain;
      this.infos['chain'].text = n.toString() + "x";
      alignInfoRight(this.infos['chain']);
    }});    

    this.levelManager.onEvent({event: "longestChainChange", callback: ({longestChain}) => {
      let n = longestChain === 0 ? 1 : longestChain;
      this.infos['chainM'].text = n.toString() + "x";
      alignInfoRight(this.infos['chainM']);
    }});    

    this.levelManager.onEvent({event: "movesToLevelUp", callback: ({moves}) => {
      this.infos['left'].text = moves.toString();
      alignInfoRight(this.infos['left']);
    }});

    this.levelManager.onEvent({event: "levelTextChange", callback: ({level}) => {
      this.infos['level'].text = (level + 1).toString();
      alignInfoRight(this.infos['level']);
    }}); 
  }

  setupColumns(){
    let {board} = this.game.settings
    this.columnsArray = [];

    const calcCoords = (col) => {
      let x = col * board.col.width;
      let y = 0;
      return {x: x, y: y}
    };

    for(var col = 0; col < board.cols; col++){
      let {x, y} = calcCoords(col);
      let button = this.game.add.button(x, y, "column", (b, p) => this.Board.dropTile(b.value), this, 0, 0, 1);
      button.value = col;

      this.columnsArray[col]= button;
      this.columnsGroup.add(button); 
    } 
  }

  createLevel(){
    this.Board = new Board({
      game:         this.game, 
      group:        this.tileGroup, 
      levelManager: this.levelManager,
      onLoss:       () => this.onLoss(),

    });
    this.levelManager.newGame()
  }

  startNewGame(){
    this.state.start("ClassicGame");
  }

  onLoss(){
    this.lossGroup.alpha = 0

    let bg = this.game.add.bitmapData(750, 300);
    bg.ctx.beginPath();
    bg.ctx.rect(0, 0, 750, 300);
    bg.ctx.fillStyle = '#708090';
    bg.ctx.fill();

    let bgSprite = this.game.add.sprite(0, 0, bg, null, this.lossGroup)

    let lossText = this.game.add.text(0, 50, " game lost ", {font: '58px Shrikhand', fill: 'white'});
    lossText.x = (750 - lossText.width)/2;

    let scoreText = this.game.add.text(25, 120, " score: " + this.levelManager.Score.toString() , {font: '36px Shrikhand', fill: 'white'});
    let levelText = this.game.add.text(25, 160, " level: " + this.levelManager.Level.toString() , {font: '36px Shrikhand', fill: 'white'});
    let chainText = this.game.add.text(25, 200, " longest chain: " + this.levelManager.LongestChain.toString() , {font: '36px Shrikhand', fill: 'white'});
    let newGameBtn = this.game.add.button(450, 150, "buttons", this.startNewGame, this, 1, 0, 0);

    this.lossGroup.add(lossText)
    this.lossGroup.add(scoreText)
    this.lossGroup.add(levelText)
    this.lossGroup.add(chainText)
    this.lossGroup.add(newGameBtn);

    this.game.add.tween(this.lossGroup).to({alpha: 0.80}, 250, Phaser.Easing.Sinusoidal.In, true)
  }
}


export default ClassicGame;