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
    if (mapData[i].includes('C', 0)){
      C.push(format(mapData[i]));
    } else if (mapData[i].includes('M', 0)){
      M.push(format(mapData[i]))
    } else if (mapData[i].includes('T', 0)){
      T.push(format(mapData[i]))
    } else if (mapData[i].includes('A', 0)){
      let formatedArr = mapData[i].slice(4).split('-');
      formatedArr[1] = parseInt(formatedArr[1]);
      formatedArr[2] = parseInt(formatedArr[2]);
      A.push(formatedArr)
    }
  };

  console.log("🚀 ~ file: index.js ~ line 55 ~ textToJson ~ data", data);
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

  console.log("🚀 ~ file: index.js ~ line 65 ~ createMap ~ map", map)

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

// TODO: moving the adventurer function
// export function move(info) {
//   const map = createMap(info);
//   return map
// }

// Testing what createMap() returns
console.log("🚀 ~ file: index.js ~ line 111 ~ createMap", createMap(textToJson('./tests/info.txt')));
