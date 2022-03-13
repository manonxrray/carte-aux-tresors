import { readFileSync } from 'fs';
// import infoText from './tests/info.txt'
// import details from './info.json' assert { type: 'json' };

// TODO : convert txt file to Json 
export function textToJson(file) {
  let mapData = new Array();
  // 1) First, we turn our text file into a string
  const string = readFileSync(file, 'utf-8').toString();
  // 2) Then we split each string at the '\n' character, which returns an object of strings 
  mapData = string.split('\n');
  // 3) Let's init arrays to sort our data
  let C = new Array();
  let M = new Array();
  let T = new Array();
  let A = new Array();

  // 4) Looping through our data to fill our previous arrays
  for (let i = 0; i < mapData.length; i++) {
    if (mapData[i].includes('C', 0)){
      C.push(mapData[i])
    } else if (mapData[i].includes('M', 0)){
      M.push(mapData[i])
    } else if (mapData[i].includes('T', 0)){
      T.push(mapData[i])
    } else if (mapData[i].includes('A', 0)){
      A.push(mapData[i])
    }
  };

  return mapData
};

export function createMap(info) {
  // Init a new Array which will contain our map
  let map = new Array();
  // width is the number of columns, height is the number of lines
  let mapWidth = info.C[0]
  let mapHeight = info.C[1];
  let c = 0;
  let l = 0;

  for (l; l < mapHeight; l++){
    let tmpArray = [];
    for (c; c < mapWidth; c++){
      tmpArray.push('.')
    }
    c = 0;
    map.push(tmpArray)
  }

  let mountains = info.M;
  let m = 0;

  // Replacing each dot in the map array corresponding to the mountains details
  for (m; m < mountains.length; m++){
    map[mountains[m][1]][mountains[m][0]] = 'M';
  }
  
  let treasures = info.T;
  let t = 0;

  // Then we do the same for the treasures and the adventurers
  for (t; t < treasures.length; t++){
    map[treasures[t][1]][treasures[t][0]] = 'T' + '(' + treasures[t][2] + ')'
  };

  let adventurer = info.A;
  let a = 0;

  for (a; a < adventurer.length; a++){
    map[adventurer[a][1]][adventurer[a][2]] = 'A' + '(' + adventurer[a][0] + ')'
  };

  return map;
};

export function move(info) {
  const map = createMap(info);
  return map
}

// Testing what textToJson() returns
// console.log(textToJson());
// Testing what createMap() returns
// console.log(createMap(details));
