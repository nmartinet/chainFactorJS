import Phaser from 'phaser'
import { sleep } from './../helpers.js';
/*
  change -> groups array
  in group -> if no target -- get previous target
*/

class Anim {
  constructor() {
    this.groups = [ this.emptyGroup ];
    this.currentGroup = null;
    this.currentTarget = null;
    return this;
  }
  get emptyGroup() {

    return ({
      target: null, 
      tweens: [], 
      staggerItems: 0, 
      then:[]
    });
  }
  get current(){

    return this.currentGroup === null ? 0 : this.currentGroup;
  }
  get currentG(){

    return this.groups[this.current];
  }
  g(){
    if(this.currentGroup === null){
      this.currentGroup = 0;
    } else {
      this.currentGroup++;
      this.groups.push(this.emptyGroup);
    }
    return this;
  }
  target(target){
    if(target.constructor === Array) {
      this.currentG.target = target;
    } else {
      this.currentG.target = [target];
    }
    return this;
  }
  tween({to, length, easing}) {
    this.currentG.tweens.push({to: to, length: length, easing: easing})
    return this;
  }
  staggerItems(time){
    this.currentG.staggerItems = time;
    return this;
  }
  then(callback){
    this.currentG.then.push(callback);
    return this;
  }
  getTargets(current){
    let target = this.groups[current].target;
    if (target != null) {
      this.currentTarget = target;
      return target;
    }
    if (this.currentTarget != null ) return this.currentTarget;
    return this.getTargets(current + 1)
  }
  run(){
    let current = -1;
    let numGroups = this.groups.length;


    let runNextGroup = () => {
      current++;
      let targets = this.getTargets(current);

      this.runTargetGroup({
        targets: targets,
        group: this.groups[current],
        onComplete: () => {
          this.groups[current].then.forEach( (callback) => {
            callback(targets);
          })
          if( current < (numGroups - 1) ){
            runNextGroup();
          }
        }
      })
    };
    runNextGroup()
  }
  runTargetGroup({targets, group, onComplete}){
    let numTargets = targets.length;
    targets.forEach( (target, i) => {
      let wait = 0;
      if(i > 0) {
        wait = group.staggerItems * i
      }

      this.runAnimationGroup({
        target: target, 
        tweens: group.tweens, 
        wait: wait,
        onComplete: () => { if( (--numTargets) === 0 ) onComplete() }
      })
    })
  }
  runAnimationGroup({target, tweens, wait, onComplete}){
    let numTweens = tweens.length;

    tweens.forEach( (tween, i) => {
      let to = (typeof tween.to === 'function') ?  tween.to(target) : tween.to;
      let length = (typeof tween.length === 'function') ? tween.length(target) : tween.length;

      let delay = 0
      if (i == 0) {
        delay = wait
      }

      let t;
      if("scale" in to){
        t = target.game.add.tween(target.scale).to(to.scale, length, tween.easing, true, wait);
      } else {
        t = target.game.add.tween(target).to(to, length, tween.easing, true, wait);  
      }

      t.onComplete.add(() => { 
        if((--numTweens) === 0) {
          onComplete();
        }
      });

    });
  }
}

export default Anim;