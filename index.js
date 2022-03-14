import { readFileSync } from 'fs';

export function textToJson(file) {
  let mapData = new Array();
  // 1) First, we turn our text file into a string
  const string = readFileSync(file, 'utf-8').toString();
  // 2) Then we split each string at the '\n' character, which returns an object of strings 
  mapData = string.split('\n');
  console.log("🚀 ~ file: index.js ~ line 9 ~ textToJson ~ mapData", mapData)
  // 3) Let's init arrays to sort our data
  let C = [];
  let M = [];
  let T = [];
  let A = [];

  // 4) Let's init our future data Object
  let data = {
    "C": C,
    "M": M,
    "T": T,
    "A": A
  };

  // Function we'll use to format our data as expected
  const format = (entry) => {
    const newEntry = entry.slice(4).replace(/-/g, '').replace(/ /g, '').split('');
    for (let e = 0; e < newEntry.length; e++) {
      newEntry[e] = parseInt(newEntry[e])
    };
    return newEntry;
  };

  // 5) Looping through our data to fill our previous arrays and format data
  for (let i = 0; i < mapData.length; i++) {
    if (mapData[i][0] === '#'){
      console.log('ignored comment', mapData[i]);
    } else if (mapData[i][0] === 'C'){
      C.push(format(mapData[i]));
    } else if (mapData[i][0] === 'M'){
      M.push(format(mapData[i]))
    } else if (mapData[i][0] === 'T'){
      T.push(format(mapData[i]))
    } else if (mapData[i][0] === 'A'){
      console.log(mapData[i]);
      let formatedArr = mapData[i].slice(4).split('-');
      formatedArr[1] = parseInt(formatedArr[1]);
      formatedArr[2] = parseInt(formatedArr[2]);
      A.push(formatedArr)
    } else {
      console.log('Error : character not supported !');
    }
  };

  console.log("🚀 ~ file: index.js ~ line 49 ~ textToJson ~ data", data);
  return data;
};

export function createMap(info) {
  // Init a new Array which will contain our map
  let map = new Array();
  // width is the number of columns, height is the number of lines
  let mapWidth = info.C[0][0]
  let mapHeight = info.C[0][1];

  let c = 0;
  let l = 0;

  // Creating an empty map based on the width and height info we have
  for (l; l < mapHeight; l++){
    let tmpArray = [];
    for (c; c < mapWidth; c++){
      tmpArray.push('.')
    }
    c = 0;
    map.push(tmpArray)
  };

  console.log("🚀 ~ file: index.js ~ line 73 ~ createMap ~ map", map)

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

  let adventurers = info.A;
  let a = 0;

  for (a; a < adventurers.length; a++){
    map[adventurers[a][1]][adventurers[a][2]] = 'A' + '(' + adventurers[a][0] + ')'
  };

  // * Now moving our adventurers and collecting their treasures ! 

  return move(adventurers, map);
};

export function move(adventurers, map){
  let a = 0;
  // Init an object which will contain our adventurers data
  let data = {};

  // Looping through our adventurers to set up their travel details
  for (a; a < adventurers.length; a++){
    let adventurer = adventurers[a][0];
    data[adventurer] = { "position": [], "orientation": [], "actions": []};
    data[adventurer].position.push(adventurers[a][1], adventurers[a][2]);
    data[adventurer].orientation.push(adventurers[a][3]);
    data[adventurer].actions.push(adventurers[a][4])
  };

  // TODO conditions and moving adventurer on the map
  return data;
};

// Testing what createMap() returns
console.log("🚀 ~ file: index.js ~ line 53 ~ createMap", createMap(textToJson('./tests/info.txt')));
// Testing what the move() function returns
// console.log("🚀 ~ file: index.js ~ line 103 ~ move ~ move", move);
