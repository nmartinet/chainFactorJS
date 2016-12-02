webpackJsonp([1],[function(e,t,n){e.exports=n(8)},,function(e,t){"use strict";function n(e){for(var t=(new Date).getTime();t+e>=(new Date).getTime(););}Object.defineProperty(t,"__esModule",{value:!0});var i=function(e,t,n){var i=e.add.group();return i.x=t,i.y=n,i},r=function(e){var t=e.row,n=e.col,i=[{row:t+1,col:n},{row:t,col:n+1},{row:t-1,col:n},{row:t,col:n-1}],r=6;return i.filter(function(e){var t=e.row,n=e.col;return 0<=t&&t<=r&&0<=n&&n<=r})};t.sleep=n,t.createGroup=i,t.getNeighbours=r},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(1),s=(i(a),n(2),function(){function e(){return r(this,e),this.groups=[this.emptyGroup],this.currentGroup=null,this.currentTarget=null,this}return o(e,[{key:"g",value:function(){return null===this.currentGroup?this.currentGroup=0:(this.currentGroup++,this.groups.push(this.emptyGroup)),this}},{key:"target",value:function(e){return e.constructor===Array?this.currentG.target=e:this.currentG.target=[e],this}},{key:"tween",value:function(e){var t=e.to,n=e.length,i=e.easing;return this.currentG.tweens.push({to:t,length:n,easing:i}),this}},{key:"staggerItems",value:function(e){return this.currentG.staggerItems=e,this}},{key:"then",value:function(e){return this.currentG.then.push(e),this}},{key:"getTargets",value:function(e){var t=this.groups[e].target;return null!=t?(this.currentTarget=t,t):null!=this.currentTarget?this.currentTarget:this.getTargets(e+1)}},{key:"run",value:function(){var e=this,t=-1,n=this.groups.length,i=function i(){t++;var r=e.getTargets(t);e.runTargetGroup({targets:r,group:e.groups[t],onComplete:function(){e.groups[t].then.forEach(function(e){e(r)}),t<n-1&&i()}})};i()}},{key:"runTargetGroup",value:function(e){var t=this,n=e.targets,i=e.group,r=e.onComplete,o=n.length;n.forEach(function(e,n){var a=0;n>0&&(a=i.staggerItems*n),t.runAnimationGroup({target:e,tweens:i.tweens,wait:a,onComplete:function(){0===--o&&r()}})})}},{key:"runAnimationGroup",value:function(e){var t=e.target,n=e.tweens,i=e.wait,r=e.onComplete,o=n.length;n.forEach(function(e,n){var a="function"==typeof e.to?e.to(t):e.to,s="function"==typeof e.length?e.length(t):e.length,u=0;0==n&&(u=i);var l=void 0;l="scale"in a?t.game.add.tween(t.scale).to(a.scale,s,e.easing,!0,i):t.game.add.tween(t).to(a,s,e.easing,!0,i),l.onComplete.add(function(){0===--o&&r()})})}},{key:"emptyGroup",get:function(){return{target:null,tweens:[],staggerItems:0,then:[]}}},{key:"current",get:function(){return null===this.currentGroup?0:this.currentGroup}},{key:"currentG",get:function(){return this.groups[this.current]}}]),e}());t.default=s},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(1),l=i(u),c=function(e){function t(e){var n,i=e.game,a=e.group,s=e.row,u=e.col,l=e.v,c=e.stone,h=void 0===c?0:c;r(this,t);var f=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,i,0,0,"tiles",h?7+h:l));f.game.settings.tile.size;return f.updatePosition({row:s,col:u}),f.updateCoordinates(),f.stone=h,f.row=s,f.col=u,f.newX=f.x,f.newY=f.y,f.anchor={x:.5,y:.5},f.value=l,a.add(f),n=f,o(f,n)}return a(t,e),s(t,[{key:"calculateGridCoord",value:function(e){var t=e.row,n=e.col,i=this.game.settings.tile,r=i.size,o=i.padding,a=n*(r+2*o)+2+r/2,s=(7-t-1)*(r+o)+3+r/2;return{x:a,y:s}}},{key:"calculateNewCoordinates",value:function(e){var t=e.row,n=e.col;this.row=t,this.col=n;var i=this.calculateGridCoord({row:t,col:n}),r=i.x,o=i.y;return this.newX=r,this.newY=o,{x:r,y:o}}},{key:"updateValue",value:function(e){var t=e.value,n=e.stone;this.value=t,this.stone=n}},{key:"refresh",value:function(){var e=this.stone?7+this.stone:this.value;e!=this.frame&&(this.frame=e)}},{key:"updateCoordinates",value:function(){var e=this.calculateGridCoord({row:this.row,col:this.col}),t=e.x,n=e.y;this.x=t,this.y=n}},{key:"updatePosition",value:function(e){var t=e.row,n=e.col;this.row=t,this.col=n}},{key:"setPosition",value:function(e){var t=e.x,n=e.y;this.x=t,this.y=n}},{key:"crack",value:function(){this.stone&&(this.stone--,this.refresh())}},{key:"Coordinates",get:function(){return{row:this.row,col:this.col}}},{key:"Stone",get:function(){return this.stone}}]),t}(l.default.Sprite);t.default=c},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(4);Object.defineProperty(t,"Tile",{enumerable:!0,get:function(){return i(r).default}});var o=n(10);Object.defineProperty(t,"LevelManager",{enumerable:!0,get:function(){return i(o).default}});var a=n(9);Object.defineProperty(t,"Board",{enumerable:!0,get:function(){return i(a).default}});var s=n(3);Object.defineProperty(t,"Anim",{enumerable:!0,get:function(){return i(s).default}})},,,function(e,t,n){"use strict";function i(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}n(6),n(7);var u=n(1),l=r(u),c=n(15),h=i(c),f={game:{width:750,height:550,div:"content",style:{background:"#f9f9f9"}},tileSize:70,tile:{size:70,padding:1},board:{rows:7,cols:7,col:{width:72,height:501}},sidebar:{style:{font:"28px Shrikhand",fill:"black"},width:175,infoDefs:{nextT:{text:"next",y:0,group:"nextTile"},scoreT:{text:"score",y:0,group:"score"},score:{text:"0",y:25,group:"score"},chainT:{text:"chain",y:0,group:"chain"},chainCT:{text:"current",y:25,group:"chain"},chain:{text:"1x",y:50,group:"chain"},chainMT:{text:"max",y:75,group:"chain"},chainM:{text:"1x",y:100,group:"chain"},levelT:{text:"level",y:0,group:"level"},level:{text:"1",y:25,group:"level"},leftT:{text:"moves left",y:60,group:"level"},left:{text:"0",y:85,group:"level"}}}},g=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.game.width,e.game.height,l.default.AUTO,e.game.div,null));return n.settings=e,Object.keys(h).forEach(function(e){return n.state.add(e,h[e])}),n.state.start("Boot"),n}return s(t,e),t}(l.default.Game);new g(f)},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(1),u=i(s),l=n(4),c=i(l),h=n(3),f=i(h),g=n(2),p=function(){function e(t){var n=this,i=t.game,r=t.group,a=t.levelManager,s=t.onLoss;o(this,e),this.game=i,this.group=r,this.levelManager=a,this.onLoss=s,this.tiles=[],this.levelManager.onEvent({event:"levelChange",callback:function(){return n.levelUp()}}),this.initializing=!0,this.dropping=!1,this.canClick=!0,this.flaggedTiles=!1,this.onLevelup=!1,this.init()}return a(e,[{key:"newBoardTile",value:function(e){var t=e.row,n=e.col,i=e.v,r=void 0===i?-1:i,o=e.stone,a=void 0===o?0:o;return(r=-1)&&(r=this.game.rnd.integerInRange(1,7)),new c.default({game:this.game,group:this.group,row:t,col:n,v:r,stone:a})}},{key:"init",value:function(){for(var e=this,t=this.game.settings.board,n=0;n<t.cols;n++){for(var i=[],r=0;r<t.rows;r++)i.push(this.newBoardTile({row:r,col:n}));this.tiles.push(i)}this.flagTiles(function(t,n){t.forEach(function(t){var n=t.Coordinates,i=n.row,r=n.col;t.destroy(t),e.tiles[r][i]=null}),e.tiles=e.tiles.map(function(e,t){var n=e.filter(function(e){return null!=e});return n.forEach(function(e,n){e.updatePosition({row:n,col:t}),e.updateCoordinates()}),n}),e.flagTiles(n)}),this.initializing=!1}},{key:"clear",value:function(){var e=this;this.tiles.forEach(function(t,n){t.forEach(function(t,i){e.tiles[n][i].destroy(),e.tiles[n][i]=null})})}},{key:"flagTiles",value:function(e){var t=this;if(this.checkLoss()&&!this.initializing)this.canClick=!1,this.onLoss();else{var n,i;!function(){var r=0;t.tiles.forEach(function(e,t){e.forEach(function(e,t){++r})});var o=[];r>0&&!function(){var e=t.game.settings.board,r=[];for(n=0;n<e.cols;n++){var a=[];for(i=0;i<e.rows;i++)if(t.tiles[n][i]){var s=t.tiles[n].length,u=1;if(n>0)for(var l=n-1;l>=0&&t.tiles[l][i];)u++,l--;if(n<e.rows-1)for(var c=n+1;c<e.rows&&t.tiles[c][i];)u++,c++;a.push([s,u])}r.push(a)}t.tiles.forEach(function(e,t){e.forEach(function(e,n){!e.stone&&r[t][n].includes(e.value)&&o.push(e)})})}(),o.length?e(o,e):t.dropping&&(t.onLevelup||t.levelManager.onMove(),t.onLevelup=!1,t.dropping=!1,t.canClick=!0)}()}}},{key:"checkLoss",value:function(){var e=!1,t=!0;return this.tiles.forEach(function(n){n.length>7&&(e=!0),n.length<7&&(t=!1)}),e||t}},{key:"levelUp",value:function(){var e=this,t=this.levelManager.getNextLevelUpRow();this.onLevelup=!0;for(var n=0;n<7;n++){var i=t[n],r=i.value;i.stone;this.tiles[n].unshift(this.newBoardTile({row:0,col:n,v:r,stone:2}))}this.moveTiles(function(t,n){return e.clearAnim(t,n)})}},{key:"dropTile",value:function(e){var t=this;if(this.canClick){var n=this.game.settings.board,i=this.game.settings.tile,r=this.tiles[e];if(r.length<n.cols){var o=this.levelManager.NextTile,a=o.value,s=o.stone;this.canClick=!1,this.dropping=!0;var l=r.length,h=new c.default({game:this.game,group:this.group,row:l,col:e,v:a,stone:s});h.alpha=0,h.setPosition({x:e*(i.size+2*i.padding)+i.size/2,y:-i.size});var g=h.calculateGridCoord({row:l,col:e}),p=(g.x,g.y);(new f.default).tween({to:{alpha:1},length:250,easing:u.default.Easing.Sinusoidal.In}).tween({to:{y:p},length:700,easing:u.default.Easing.Bounce.Out}).then(function(e){var n=e[0];t.tiles[n.col].push(n),n.updateCoordinates(),t.flagAnim()}).target(h).run()}}}},{key:"flagAnim",value:function(){var e=this;this.flagTiles(function(t,n){return e.clearAnim(t,n)})}},{key:"clearAnim",value:function(e,t){var n=this;this.levelManager.incChain(),this.levelManager.updateScore(e.length),e.forEach(function(e){return n.crackNeighbours(e)});var i=175;(new f.default).target(e).g().tween({to:{scale:{x:1.5,y:1.5}},length:i,easing:u.default.Easing.Sinusoidal.Out}).staggerItems(150).g().tween({to:{alpha:0},length:i,easing:u.default.Easing.Sinusoidal.In}).tween({to:{scale:{x:.5,y:.5}},length:i,easing:u.default.Easing.Sinusoidal.Out}).staggerItems(150).then(function(e){e.forEach(function(e){var t=e.row,i=e.col;e.destroy(),n.tiles[i][t]=null}),n.moveTiles(t)}).run()}},{key:"moveTiles",value:function(e){var t,n=this;this.tiles=this.tiles.map(function(e,t){return e.filter(function(e){return null!=e})}),this.tiles.forEach(function(e,t){e.forEach(function(e,n){e.calculateNewCoordinates({row:n,col:t})})});(new f.default).tween({to:function(e){return{y:e.newY}},length:500,easing:u.default.Easing.Bounce.Out}).then(function(){(0,g.sleep)(100),n.flagTiles(e)}).target((t=[]).concat.apply(t,r(this.tiles))).run()}},{key:"crackNeighbours",value:function(e){var t=this,n=(0,g.getNeighbours)(e.Coordinates);n.forEach(function(e){var n=e.row,i=e.col;t.tiles[i][n]&&t.tiles[i][n].crack()})}}]),e}();t.default=p},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(1),s=(i(a),function(){function e(t){r(this,e),this.game=t,this.events={},this.levelProgression=[30,28,26,24,22,18,14,10],this.otherLevels=10,this.newGame()}return o(e,[{key:"newGame",value:function(){this.currentLevel=0,this.toLevelUp=this.levelProgression[0],this.score=0,this.chain=0,this.longestChain=0,this.updateNextTile(),this.trigger("chainChange",{chain:this.chain}),this.trigger("longestChainChange",{longestChain:this.longestChain}),this.trigger("scoreChange",{score:this.score}),this.trigger("levelTextChange",{level:this.currentLevel}),this.trigger("nextTileChange",{tile:this.nextTile}),this.trigger("movesToLevelUp",{moves:this.toLevelUp})}},{key:"onEvent",value:function(e){var t=e.event,n=e.callback;t in this.events||(this.events[t]=[]),this.events[t].push(n)}},{key:"onEvents",value:function(e){e.forEach(onEvent)}},{key:"onMove",value:function(){--this.toLevelUp,0==this.toLevelUp&&(this.currentLevel++,this.setToLevelUp(),this.trigger("levelChange",{level:this.currentLevel}),this.trigger("levelTextChange",{level:this.currentLevel})),this.trigger("movesToLevelUp",{moves:this.toLevelUp}),this.resetChain(),this.updateNextTile()}},{key:"trigger",value:function(e,t){e in this.events&&this.events[e].forEach(function(e){return e(t)})}},{key:"genTile",value:function(){return{value:this.game.rnd.integerInRange(1,7),stone:this.game.rnd.integerInRange(1,10)<=2?2:0}}},{key:"updateNextTile",value:function(){this.nextTile=this.genTile(),this.trigger("nextTileChange",{tile:this.nextTile})}},{key:"getNextLevelUpRow",value:function(){for(var e=[],t=0;t<7;t++)e.push(this.genTile());return e}},{key:"resetChain",value:function(){this.chain=0,this.trigger("chainChange",{chain:this.chain})}},{key:"incChain",value:function(){this.chain++,this.trigger("chainChange",{chain:this.chain}),this.chain>this.longestChain&&(this.longestChain=this.chain,this.trigger("longestChainChange",{longestChain:this.longestChain}))}},{key:"updateScore",value:function(e){this.score+=10*e*this.chain*(this.currentLevel+1),this.trigger("scoreChange",{score:this.score})}},{key:"setToLevelUp",value:function(){this.currentLevel<this.levelProgression.length?this.toLevelUp=this.levelProgression[this.currentLevel]:this.toLevelUp=this.otherLevels}},{key:"NextTile",get:function(){return this.nextTile}},{key:"Level",get:function(){return this.currentLevel+1}},{key:"MovesLeft",get:function(){return this.toLevelUp}},{key:"Score",get:function(){return this.score}},{key:"Chain",get:function(){return this.chain}},{key:"LongestChain",get:function(){return this.longestChain}}]),e}());t.default=s},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(1),l=i(u),c=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"preload",value:function(){this.game.stage.backgroundColor=this.game.settings.game.style.background}},{key:"create",value:function(){this.state.start("Preload")}}]),t}(l.default.State);t.default=c},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(1),l=i(u),c=n(5),h=n(2),f=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"create",value:function(){this.levelManager=new c.LevelManager(this.game),this.setupGroups(),this.setupInfo(),this.setupColumns(),this.createLevel()}},{key:"setupGroups",value:function(){this.columnsGroup=(0,h.createGroup)(this.game,20,20),this.tileGroup=(0,h.createGroup)(this.game,20,20),this.infoGroup=(0,h.createGroup)(this.game,540,20),this.lossGroup=(0,h.createGroup)(this.game,0,50),this.infoGroups={nextTile:(0,h.createGroup)(this.game,0,0),score:(0,h.createGroup)(this.game,0,115),chain:(0,h.createGroup)(this.game,0,190),level:(0,h.createGroup)(this.game,0,350)};var e=!0,t=!1,n=void 0;try{for(var i,r=Object.keys(this.infoGroups)[Symbol.iterator]();!(e=(i=r.next()).done);e=!0){var o=i.value;this.infoGroup.add(this.infoGroups[o])}}catch(e){t=!0,n=e}finally{try{!e&&r.return&&r.return()}finally{if(t)throw n}}}},{key:"setupInfo",value:function(){var e=this,t=this.game.settings.sidebar;this.infos={};var n=function(e){e.x=t.width-e.width},i=!0,r=!1,o=void 0;try{for(var a,s=Object.keys(t.infoDefs)[Symbol.iterator]();!(i=(a=s.next()).done);i=!0){var u=a.value,h=t.infoDefs[u];this.infos[u]=this.game.add.text(0,h.y,h.text,t.style),this.infoGroups[h.group].add(this.infos[u]),n(this.infos[u])}}catch(e){r=!0,o=e}finally{try{!i&&s.return&&s.return()}finally{if(r)throw o}}this.nextTile=new c.Tile({game:this.game,group:this.infoGroups.nextTile,row:0,col:0,v:1}),this.nextTile.x=135,this.nextTile.y=70,this.levelManager.onEvent({event:"nextTileChange",callback:function(t){var n=t.tile,i=200;(new c.Anim).g().tween({to:{alpha:0},length:i,easing:l.default.Easing.Sinusoidal.In}).tween({to:{scale:{x:0,y:0}},length:i,easing:l.default.Easing.Sinusoidal.Out}).then(function(e){var t=e[0];t.updateValue(n),t.refresh()}).g().tween({to:{alpha:1},length:i,easing:l.default.Easing.Sinusoidal.In}).tween({to:{scale:{x:1,y:1}},length:i,easing:l.default.Easing.Sinusoidal.Out}).target(e.nextTile).run()}}),this.levelManager.onEvent({event:"scoreChange",callback:function(t){var i=t.score;e.infos.score.text=i.toString(),n(e.infos.score)}}),this.levelManager.onEvent({event:"chainChange",callback:function(t){var i=t.chain,r=0===i?1:i;e.infos.chain.text=r.toString()+"x",n(e.infos.chain)}}),this.levelManager.onEvent({event:"longestChainChange",callback:function(t){var i=t.longestChain,r=0===i?1:i;e.infos.chainM.text=r.toString()+"x",n(e.infos.chainM)}}),this.levelManager.onEvent({event:"movesToLevelUp",callback:function(t){var i=t.moves;e.infos.left.text=i.toString(),n(e.infos.left)}}),this.levelManager.onEvent({event:"levelTextChange",callback:function(t){var i=t.level;e.infos.level.text=(i+1).toString(),n(e.infos.level)}})}},{key:"setupColumns",value:function(){var e=this,t=this.game.settings.board;this.columnsArray=[];for(var n=function(e){var n=e*t.col.width,i=0;return{x:n,y:i}},i=0;i<t.cols;i++){var r=n(i),o=r.x,a=r.y,s=this.game.add.button(o,a,"column",function(t,n){return e.Board.dropTile(t.value)},this,0,0,1);s.value=i,this.columnsArray[i]=s,this.columnsGroup.add(s)}}},{key:"createLevel",value:function(){var e=this;this.Board=new c.Board({game:this.game,group:this.tileGroup,levelManager:this.levelManager,onLoss:function(){return e.onLoss()}}),this.levelManager.newGame()}},{key:"startNewGame",value:function(){this.state.start("ClassicGame")}},{key:"onLoss",value:function(){this.lossGroup.alpha=0;var e=this.game.add.bitmapData(750,300);e.ctx.beginPath(),e.ctx.rect(0,0,750,300),e.ctx.fillStyle="#708090",e.ctx.fill();var t=(this.game.add.sprite(0,0,e,null,this.lossGroup),this.game.add.text(0,50," game lost ",{font:"58px Shrikhand",fill:"white"}));t.x=(750-t.width)/2;var n=this.game.add.text(25,120," score: "+this.levelManager.Score.toString(),{font:"36px Shrikhand",fill:"white"}),i=this.game.add.text(25,160," level: "+this.levelManager.Level.toString(),{font:"36px Shrikhand",fill:"white"}),r=this.game.add.text(25,200," longest chain: "+this.levelManager.LongestChain.toString(),{font:"36px Shrikhand",fill:"white"}),o=this.game.add.button(450,150,"buttons",this.startNewGame,this,1,0,0);this.lossGroup.add(t),this.lossGroup.add(n),this.lossGroup.add(i),this.lossGroup.add(r),this.lossGroup.add(o),this.game.add.tween(this.lossGroup).to({alpha:.8},250,l.default.Easing.Sinusoidal.In,!0)}}]),t}(l.default.State);t.default=f},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(1),l=i(u),c=n(5),h=n(2),f=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"create",value:function(){this.setupGroups(),this.setupUI()}},{key:"setupGroups",value:function(){this.titleGroup=(0,h.createGroup)(this.game,125,50),this.buttonsGroup=(0,h.createGroup)(this.game,75,200)}},{key:"setupUI",value:function(){var e=this;this.titleText=this.game.add.text(0,-125,"Chain Factor ",{font:"80px Shrikhand",fill:"black"}),this.titleGroup.add(this.titleText),this.newGameButton=this.game.add.button(-350,0,"buttons",function(){return e.startNewGame()},1,1,0),this.buttonsGroup.add(this.newGameButton);(new c.Anim).g().target(this.titleText).tween({to:{y:0},length:750,easing:l.default.Easing.Bounce.Out}).g().tween({to:{x:160},length:500,easing:l.default.Easing.Sinusoidal.In}).staggerItems(400).target([this.newGameButton]).run()}},{key:"startNewGame",value:function(){this.state.start("ClassicGame")}}]),t}(l.default.State);t.default=f},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(1),l=i(u),c=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"preload",value:function(){this.game.load.spritesheet("tiles",n(22),70,70,10),this.game.load.spritesheet("column",n(21),72,500,2),this.game.load.spritesheet("buttons",n(20),250,75,6)}},{key:"create",value:function(){this.state.start("Menu")}}]),t}(l.default.State);t.default=c},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(11);Object.defineProperty(t,"Boot",{enumerable:!0,get:function(){return i(r).default}});var o=n(14);Object.defineProperty(t,"Preload",{enumerable:!0,get:function(){return i(o).default}});var a=n(13);Object.defineProperty(t,"Menu",{enumerable:!0,get:function(){return i(a).default}});var s=n(12);Object.defineProperty(t,"ClassicGame",{enumerable:!0,get:function(){return i(s).default}})},,,,,function(e,t,n){e.exports=n.p+"e4f2cbe3d67d90effe87fcaadbb99281.png"},function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAH0CAYAAADSVKRAAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAT3SURBVHic7dKxbYNQAABRHLn4PfuvxRZUFCCB5AzgIsUVEOm9Ca6417IsnzHGxLdt26bzPO/OeLT3GGOa5/nujkfa991Af/i5O4D/zUAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjEQCQGIjEQiYFIDERiIBIDkRiIxEAkBiIxEImBSAxEYiASA5EYiMRAJAYiMRCJgUgMRGIgEgORGIjkfRzHtK7r3R2PdF3X3QmP9wuvaRwZozs03AAAAABJRU5ErkJggg=="},function(e,t,n){e.exports=n.p+"fffb41346452b9ec2eb2952c1b061606.png"}]);
//# sourceMappingURL=bundle.js.map