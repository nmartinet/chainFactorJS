import Phaser from 'phaser'

class Tile extends Phaser.Sprite {
  constructor({game, group, row, col, v, stone = 0}){
    super(game, 0, 0, "tiles", ( stone ? (7 + stone) : v));

    let {size} = this.game.settings.tile;
  
    this.updatePosition({row: row, col: col});
    this.updateCoordinates();
    
    this.stone = stone;

    this.row = row;
    this.col = col;

    this.newX = this.x;
    this.newY = this.y;

    this.anchor = {x: 0.5, y: 0.5};

    this.value = v;
    group.add(this);
    return this;
  }

  calculateGridCoord({row, col}){
    let {size, padding} = this.game.settings.tile;
    let x = col * (size + (padding*2)) + 2 + size/2 
    let y = ((7 - row) - 1) * (size + padding) + 3 + size/2;

    return {x: x, y: y}
  }

  calculateNewCoordinates({row, col}){
    this.row = row;
    this.col = col;

    let {x ,y} = this.calculateGridCoord({row, col});
    this.newX = x;
    this.newY = y;


    return {x, y};
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

export default Tile;