import 'pixi'
import 'p2'
import Phaser from 'phaser'

import * as states from './states';

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

class Game extends Phaser.Game{
  constructor(settings) {
    super(settings.game.width, settings.game.height, Phaser.AUTO, settings.game.div, null);
    this.settings = settings;

    Object.keys(states).forEach(state => this.state.add(state, states[state]));
    this.state.start("Boot");
  }
}

new Game(settings)