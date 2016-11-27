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

export {sleep, createGroup, getNeighbours};