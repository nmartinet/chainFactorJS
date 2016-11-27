import Phaser from 'phaser'


class Anim {
  constructor() {
    this._game = null;
    this.animTargets = [];
    this.tweens = [[]];
    this.postRun = [[]];
    this.currentGroup = null;
    return this;
  }
  game(game){
    this._game = game;
    return this;
  }
  target(target){
    this.animTargets = (target.constructor === Array) ? target : [target];
    return this;
  }
  g(){
    if(this.currentGroup === null){ 
      this.currentGroup = 0
    } else {
      this.currentGroup++;
      this.tweens.push([]);
      this.postRun.push([]);
    }
    return this;
  }
  getGroup() {

    return this.currentGroup == null ? 0 : this.currentGroup;
  }
  tween({to, length, easing} ){
    this.tweens[this.getGroup()].push({to: to, length: length, easing: easing});
    return this;
  }
  then(callback){
    this.postRun[this.getGroup()].push(callback);
    return this;
  }
  run(){
    let cg = -1;
    let groupsLength = this.tweens.length;

    let runNextGroup = () => {
      ++cg;
      let onComplete;

      if (cg < (groupsLength-1)) {
        onComplete = () => {
          this.postRun[cg].forEach( (cb) => {
            cb({target: this.animTargets})
          })
          runNextGroup();
        }
      } else {
        onComplete = () => {
          this.postRun[cg].forEach( (cb) => {
            cb({target: this.animTargets})
          })
        }
      }

      this.runAnimationGroup({group: cg, onComplete: () => {
        onComplete()
      }});
    }

    runNextGroup();
  }
  runAnimationGroup({group, onComplete}){
    let numTargets = this.animTargets.length;

    this.animTargets.forEach( (target) => {
      this.runTweenGroup({group: group, target: target, onComplete: () => {
        if((--numTargets) === 0){
          onComplete();
        }
      }})
    })
  }
  runTweenGroup({group, target, onComplete}){
    let numTweens = this.tweens[group].length;

    this.tweens[group].forEach( (tween) => {
      let to = (typeof tween.to === 'function') ?  tween.to(target) : tween.to;
      let length = (typeof tween.length === 'function') ? tween.length(target) : tween.length;

      let t;
      if("scale" in to){
        t = this._game.add.tween(target.scale).to(to.scale, length, tween.easing, true);
      } else {
        t = this._game.add.tween(target).to(to, length, tween.easing, true);  
      }

      t.onComplete.add(() => { 
        if((--numTweens) === 0){ 
          onComplete();
        }
      });
    })
  }
}

export default Anim;