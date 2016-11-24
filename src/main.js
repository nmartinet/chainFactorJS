import 'pixi'
import 'p2'
import Phaser from 'phaser'

function sleep(miliseconds) {
   var currentTime = new Date().getTime();
   while (currentTime + miliseconds >= new Date().getTime()) {}
}

const createGroup = function(game, x, y){
  let group = game.add.group();
  group.x = x;
  group.y = y;
  return group;
}

const getNeighbours= function({row, col}){
  let neighbours = [
    {row: row+1, col:col},
    {row: row, col:col+1},
    {row: row-1, col:col},
    {row: row, col:col-1}
  ];

  let max = 6

  return neighbours.filter( ({row, col}) => (
    0 <= row && row <= max && 0 <= col && col <= max
  ))
}
 
var settings = {
  game: {width: 750, height: 550, div: 'content', style: { background: '#f9f9f9' }},
  tileSize: 70,
  tile: { 
    size: 70,
    padding: 1
  },
  board: {
    rows: 7, cols: 7, 
    col: {
      width: 72, 
      height: 501
    }
  },
  sidebar: {
    style: {font: '28px Shrikhand', fill: 'black'},
    width: 175,
    infoDefs: {
      'nextT': {
        'text': 'next', 'y': 0, 'group': 'nextTile'
      },
      'scoreT': {
        'text': 'score', 'y': 0,   'group': 'score'
      },
      'score': {
        'text': '0', 'y': 25, 'group': 'score'
      },      
      'chainT': {
        'text': 'chain', 'y': 0, 'group': 'chain'
      },
      'chainCT': {
        'text': 'current', 'y': 25, 'group': 'chain'
      },
      'chain': {
        'text': '1x', 'y': 50, 'group': 'chain'
      },
      'chainMT': {
        'text': 'max', 'y': 75, 'group': 'chain'
      },
      'chainM': {
        'text': '1x', 'y': 100, 'group': 'chain'
      },  
      'levelT': {
        'text': 'level', 'y': 0, 'group': 'level'
      },
      'level': {
        'text': '1', 'y': 25, 'group': 'level'
      },
      'leftT': {
        'text': 'moves left', 'y': 60, 'group': 'level'
      },
      'left': {
        'text': '0', 'y': 85, 'group': 'level'
      },
    }
  }
}
 

class Tile extends Phaser.Sprite {
  constructor({game, group, row, col, v, stone = 0}){
    super(game, 0, 0, "tiles", ( stone ? (7 + stone) : v));

    let {size} = this.game.settings.tile;
  
    this.updatePosition({row: row, col: col});
    this.updateCoordinates();
    
    this.stone = stone;

    this.row = row;
    this.col = col;

    this.value = v;
    group.add(this);
    return this;
  }

  calculateGridCoord({row, col}){
    let {size, padding} = this.game.settings.tile;
    let x = col * (size + (padding*2)) + 2;
    let y = ((7 - row) - 1) * (size + padding) + 3;

    return {x: x, y: y}
  }

  updateValue({value, stone}){
    this.value = value;
    this.stone = stone;
  }

  refresh(){
    let newFrame = this.stone ? (7 + this.stone)  : this.value;
    if(newFrame != this.frame){
      this.frame = newFrame;
    }   
  }

  get Coordinates(){

    return {row: this.row, col: this.col};
  }

  updateCoordinates(){
    let {x, y} = this.calculateGridCoord({row: this.row, col: this.col})
    this.x = x;
    this.y = y;
  }

  updatePosition({row, col}){
    this.row = row;
    this.col = col;
  }

  setPosition({x, y}){
    this.x = x;
    this.y = y;
  }

  get Stone(){

    return this.stone;
  }

  crack(){
   if(this.stone){
      this.stone--;
      this.refresh();
    }
  }
}

class LevelManager {
  constructor(game) {
    this.game = game;
    this.events = {};

    this.levelProgression = [30, 28, 26, 24, 22, 18, 14, 10]
    this.otherLevels = 10;

    this.newGame();
  }

  newGame() {
    this.currentLevel = 0;
    this.toLevelUp = this.levelProgression[0];
    this.score = 0;
    this.chain = 0;
    this.longestChain = 0;
    this.updateNextTile();
    this.trigger("chainChange", {chain: this.chain});
    this.trigger("longestChainChange", {longestChain: this.longestChain});
    this.trigger("scoreChange", {score: this.score});
    this.trigger("levelTextChange", {level: this.currentLevel});
    this.trigger("nextTileChange", {tile: this.nextTile});
  }

  onEvent({event, callback}){
    if(!(event in this.events)){
      this.events[event] = [];
    }

    this.events[event].push(callback)
  }

  onEvents(events){

    events.forEach(onEvent);
  }

  onMove(){
    if(this.toLevelUp == 1){
      this.currentLevel++;
      this.setToLevelUp();
      this.trigger("levelChange", {level: this.currentLevel});
      this.trigger("levelTextChange", {level: this.currentLevel});
    } else {
      this.toLevelUp--;
    }
    this.trigger("movesToLevelUp", {moves: this.toLevelUp});
    this.resetChain()
    this.updateNextTile();
  }

  trigger(event, args){
    if(event in this.events){
      this.events[event].forEach( (callback) => callback(args))
    }
  }

  genTile() { 
    return {
      value: this.game.rnd.integerInRange(1, 7), 
      stone: this.game.rnd.integerInRange(1, 10) <= 2 ? 2 : 0} 
  }

  updateNextTile(){
    this.nextTile = this.genTile()
    this.trigger("nextTileChange", {tile: this.nextTile});
  }

  get NextTile(){

    return this.nextTile
  }

  getNextLevelUpRow(){
    let row = [];
    for(var i = 0; i < 7; i++){
      row.push(this.genTile());
    }
    return row;
  }

  get Level() {

    return this.currentLevel + 1;
  }

  get MovesLeft() {

    return this.toLevelUp
  }

  get Score() {

    return this.score
  }

  get Chain() {

    return this.chain
  }

  get LongestChain() {

    return this.longestChain
  }

  resetChain(){
    this.chain = 0;
    this.trigger("chainChange", {chain: this.chain})
  }
  
  incChain(){
    this.chain++;
    this.trigger("chainChange", {chain: this.chain})
    if(this.chain > this.longestChain){
      this.longestChain = this.chain;
      this.trigger("longestChainChange", {longestChain: this.longestChain})
    }
  }
  
  updateScore(tiles){
    this.score += (tiles*10)*this.chain*(this.currentLevel+1);
    this.trigger("scoreChange", {score: this.score})
  }

  setToLevelUp(){
    if(this.currentLevel < this.levelProgression.length)
      this.toLevelUp = this.levelProgression[this.currentLevel];
    else {
      this.toLevelUp = this.otherLevels;
    }
  }
}

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

  flagTiles(callback){
    if(this.checkLoss() && !this.initializing){
      this.canClick = false;
      this.onLoss();
    } else {
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

      let flagged = [];
      this.tiles.forEach((column, col) => {
        column.forEach((tile, row) => {
          if(!tile.stone && tileGroups[col][row].includes(tile.value))
            flagged.push(tile)
        })
      })

      if(flagged.length){
        callback(flagged, callback);
      } else if (this.dropping){
        this.levelManager.onMove();
        this.canClick = true;
        this.dropping = false;
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
    this.canClick = false;

    for(var x = 0; x < 7; x++){
      let {value, stone} = newRow[x];
      this.tiles[x].unshift(this.newBoardTile({row: 0, col: x, v: value, stone: 2}))
    };

    this.tiles = this.tiles.map( (column, col) => {
      let newCol = column.filter( t => t != null ); 
      newCol.forEach((tile, row) => {
        tile.updatePosition({row: row, col: col});
        let {x, y} = tile.calculateGridCoord({row: row, col: col})
        let tween = this.game.add.tween(tile).to({y: y}, 500, Phaser.Easing.Bounce.Out, true);
        tween.onComplete.add((e) => {
          if(tween.manager.getAll().length == 1)
            this.flagAnim();
        });
      });
      return newCol;
    });  
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
        newTile.setPosition({x: (col * (tile.size + 2*tile.padding)), y: (-tile.size)});

        let {x, y} = newTile.calculateGridCoord({row: row, col: col})

        let fadeInTween = this.game.add.tween(newTile).to({alpha: 1}, 250, Phaser.Easing.Sinusoidal.In, true);
        let dropTween = this.game.add.tween(newTile).to({y: y}, 700, Phaser.Easing.Bounce.Out, true);

        column.push(newTile);
        newTile.updateCoordinates();

        dropTween.onComplete.add(() => {
          if(dropTween.manager.getAll().length == 1){
            sleep(50);
            this.flagAnim();
          }
        })
      };
    };
  }

  flagAnim() {
    this.flagTiles( (flaggedTiles, cb) => {
      this.levelManager.incChain();
      this.levelManager.updateScore(flaggedTiles.length)
      
      flaggedTiles.forEach( (tile) => {
        this.crackNeighbours(tile)
        let {row, col} = tile.Coordinates; 
        let tween = this.game.add.tween(tile).to({ alpha: 0}, 500, Phaser.Easing.Sinusoidal.In, true);
        this.tiles[col][row] = null;

        
        tween.onComplete.add((e) => { 
          e.destroy();

          if(tween.manager.getAll().length == 1){
            sleep(50);
            this.tiles = this.tiles.map( (column, col) => {
              return column.filter( t => t != null ); 
            })

            this.tiles.forEach( (column, col) => {
              column.forEach((tile, row) => {
                tile.updatePosition({row: row, col: col});
                let {x, y} = tile.calculateGridCoord({row: row, col: col})
                let tween = this.game.add.tween(tile).to({y: y}, 500, Phaser.Easing.Bounce.Out, true);
                tween.onComplete.add((e) => {
                  if(tween.manager.getAll().length == 1){
                    sleep(50);
                    this.flagTiles(cb);
                  }
                }) 
              })
            });  
          };
        });    
      });
    });
  }

  crackNeighbours(tile){
    let neighbours = getNeighbours(tile.Coordinates);
    neighbours.forEach( ({row, col}) => {
      if(this.tiles[col][row])
        this.tiles[col][row].crack()
    })
  } 
}

class PlayGame extends Phaser.State{
  preload(){
    this.game.load.spritesheet("tiles"    , require("./assets/tiles.png")  , 70, 70, 10);
    this.game.load.spritesheet("column"   , require("./assets/columns.png"), 73, 501, 2);
    this.game.load.spritesheet("buttons"  , require("./assets/buttons.png"), 250, 77, 2);
  }
  
  create(){
    this.game.stage.backgroundColor = this.game.settings.game.style.background;
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
    this.nextTile.x = 110;
    this.nextTile.y=  40;

    this.levelManager.onEvent({event: "nextTileChange", callback: ({tile}) => {
      this.nextTile.updateValue(tile);
      this.nextTile.refresh();
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
      let button = this.game.add.button(x, y, "column", (b, p) => this.Board.dropTile(b.value), this, 1, 0, 1);
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
      onLoss:       () => this.onLoss()
    });
    this.levelManager.newGame()
  }

  startNewGame(){
    this.lossGroup.children.forEach((child) => child.kill());
    this.tileGroup.children.forEach((child) => child.kill());

    this.createLevel();
    this.levelManager.newGame();    
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

class Game extends Phaser.Game{
  constructor(settings) {
    super(settings.game.width, settings.game.height, Phaser.AUTO, settings.game.div, null);
    this.settings = settings;

    this.state.add("PlayGame", PlayGame, false);
    this.state.start("PlayGame");

  }
}

new Game(settings)