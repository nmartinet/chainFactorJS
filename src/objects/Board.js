import Phaser from 'phaser'
import Tile from './Tile';
import Anim from './Anim';
import {getNeighbours, sleep} from './../helpers';

class Board {
  constructor({game, group, levelManager, onLoss}) {
    this.game = game;
    this.group = group;
    this.levelManager = levelManager;
    this.onLoss = onLoss;

    this.tiles = [];

    this.levelManager.onEvent({event: "levelChange", callback: () => this.levelUp()});

    this.initializing   = true;
    this.dropping       = false;
    this.canClick       = true;
    this.flaggedTiles   = false;
    this.onLevelup      = false;

    this.init();
  }

  newBoardTile({row: row, col: col, v = -1, stone = 0}){
    if(v = -1) v = this.game.rnd.integerInRange(1, 7);
    return new Tile({game: this.game, group: this.group, row: row, col: col, v: v, stone: stone})
  }

  init(){
    let {board} = this.game.settings;
    for(var col = 0; col < board.cols; col++){
      let column = [];
      for(var row = 0; row < board.rows; row++){
        column.push(this.newBoardTile({row: row, col: col}))
      }
      this.tiles.push(column);
    };

    this.flagTiles( (flaggedTiles, callback) => {
      flaggedTiles.forEach( (tile) => {
        let {row, col} = tile.Coordinates;
        tile.destroy(tile);
        this.tiles[col][row] = null;
      })

      this.tiles = this.tiles.map( (column, col) => {
        let newCol = column.filter( t => t != null ); 
        newCol.forEach((tile, row) => {
          tile.updatePosition({row: row, col: col});
          tile.updateCoordinates();
        })
        return newCol;
      });
      this.flagTiles(callback);
    });
    this.initializing = false;
  }

  clear() {
    this.tiles.forEach( (column, col) => {
      column.forEach( (tile, row) => {
        this.tiles[col][row].destroy();
        this.tiles[col][row] = null;
      })
    })
  }

  flagTiles(callback){
    if(this.checkLoss() && !this.initializing){
      this.canClick = false;
      this.onLoss();
    } else {

      let numTiles = 0;
      this.tiles.forEach( (column, col) => {
        column.forEach( (tile, row) => {
          ++numTiles;
        })
      })

      let flagged = [];
      if (numTiles > 0){
        let {board} = this.game.settings;

        let tileGroups = [];
        for(var col = 0; col < board.cols; col++){
          let column = [];
          for(var row = 0; row < board.rows; row++){
            if(this.tiles[col][row]){
              let colVal = this.tiles[col].length;
              let rowVal = 1;

              if( col > 0){
                let i = col - 1;
                while(i >= 0 && this.tiles[i][row]) { rowVal++; i--; }
              }

              if( col < (board.rows - 1) ){
                let i = col + 1;
                while(i < board.rows && this.tiles[i][row]) { rowVal++; i++; }
              }

              column.push([colVal, rowVal]);
            } 
          }
          tileGroups.push(column);
        }

        
        this.tiles.forEach((column, col) => {
          column.forEach((tile, row) => {
            if(!tile.stone && tileGroups[col][row].includes(tile.value))
              flagged.push(tile)
          })
        })
      }

      if(flagged.length){
        callback(flagged, callback);
      } else if (this.dropping){
        if(!this.onLevelup){
          this.levelManager.onMove();
        }
        this.onLevelup = false;
        this.dropping = false;
        this.canClick = true;
      }
    }
  }

  checkLoss(){
    let over = false;
    let full = true

    this.tiles.forEach( (col) => {
      if(col.length > 7) over = true;        
      if(col.length < 7) full = false;
    })

    return (over || full);
  }

  levelUp() {
    let newRow = this.levelManager.getNextLevelUpRow();
    this.onLevelup = true;


    for(var x = 0; x < 7; x++){
      let {value, stone} = newRow[x];
      this.tiles[x].unshift(this.newBoardTile({row: 0, col: x, v: value, stone: 2}))
    };
    this.moveTiles((flaggedTiles, cb) => this.clearAnim(flaggedTiles, cb))
  }

  dropTile(col){
    if(this.canClick){
      let {board} = this.game.settings;
      let {tile} = this.game.settings;

      let column = this.tiles[col];

      if (column.length < board.cols) {
        let {value, stone} = this.levelManager.NextTile;

        this.canClick = false;
        this.dropping = true;

        let row = column.length;
        
        let newTile = new Tile({game: this.game, group: this.group, row: row, col: col, v: value, stone: stone})
        newTile.alpha = 0;
        newTile.setPosition({x: (col * (tile.size + 2*tile.padding) + tile.size/2), y: (-tile.size)});

        let {x, y} = newTile.calculateGridCoord({row: row, col: col})

        let dropAnim = new Anim()
          .game(this.game)
          .tween({to: {alpha: 1}, length: 250,  easing: Phaser.Easing.Sinusoidal.In})
          .tween({to: {y : y},    length: 700,  easing: Phaser.Easing.Bounce.Out  })
          .then( ({target}) => {
            let tile = target[0];
            this.tiles[tile.col].push(tile);
            tile.updateCoordinates();
            this.flagAnim();
          })
          .target(newTile)
          .run()
      };
    };
  }

  flagAnim() {

    this.flagTiles((flaggedTiles, cb) =>this.clearAnim(flaggedTiles, cb))
  }

  clearAnim (flaggedTiles, cb){
    this.levelManager.incChain();
    this.levelManager.updateScore(flaggedTiles.length)
    
    flaggedTiles.forEach( (tile) => this.crackNeighbours(tile));

    let l = 175

    let anim = new Anim()
      .game(this.game)
      .target(flaggedTiles)
      .g()
        .tween({to: {scale: {x: 1.5, y: 1.5}}, length: l, easing: Phaser.Easing.Sinusoidal.Out})
      .g()
        .tween({to: {alpha: 0}, length: l, easing: Phaser.Easing.Sinusoidal.In})
        .tween({to: {scale: {x: 0.5, y: 0.5}}, length: l, easing: Phaser.Easing.Sinusoidal.Out})
      .then( ({target}) => {
        target.forEach( (tile) => {
          let {row, col} = tile;
          tile.destroy();
          this.tiles[col][row] = null;
        });
        this.moveTiles(cb);
      })
      .run()
  }

  moveTiles(cb) {
    this.tiles = this.tiles.map( (column, col) => {
      return column.filter( t => t != null ); 
    });


    this.tiles.forEach( (column, col) => {
      column.forEach( (tile, row) => {
        tile.calculateNewCoordinates({row: row, col: col});
      })
    })

    let moveAnim = new Anim()
      .game(this.game)
      .tween({
        to: (target) => { return {y: target.newY}},
        length: 500, 
        easing: Phaser.Easing.Bounce.Out
      })
      .then( () => {
        sleep(100)
        this.flagTiles(cb)
      })
      .target([].concat(...this.tiles))
      .run();
  }

  crackNeighbours(tile){
    let neighbours = getNeighbours(tile.Coordinates);
    neighbours.forEach( ({row, col}) => {
      if(this.tiles[col][row])
        this.tiles[col][row].crack()
    })
  }  
}

export default Board;