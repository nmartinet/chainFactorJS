import Phaser from 'phaser'


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
    this.trigger("movesToLevelUp", {moves: this.toLevelUp});
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

    --this.toLevelUp;
    if( this.toLevelUp == 0){
      this.currentLevel++;
      this.setToLevelUp();
      this.trigger("levelChange", {level: this.currentLevel});
      this.trigger("levelTextChange", {level: this.currentLevel});
    };

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

export default LevelManager;