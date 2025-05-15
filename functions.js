export const cubeCount = 3; //minimum 2
export let rollCount = [];

function rollCube() {
  let rolls = [];
  for (let i = 0; i < cubeCount; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  return rolls;
}

function averageRolls() {
  let count = rollCount.length * cubeCount;
  let sum = 0;
  for (let i = 0; i < rollCount.length; i++) {
    for (let j = 0; j < cubeCount; j++) {
      sum += rollCount[i][j];
    }
  }

  return (sum / count).toFixed(2);
}
function biggestRoll() {
  let biggestRoll = 0;

  for (let i = 0; i < rollCount.length; i++) {
    let helper = 0;
    for (let j = 0; j < cubeCount; j++) {
      helper += rollCount[i][j];
    }

    if (helper > biggestRoll) {
      biggestRoll = helper;
    }
  }
  return biggestRoll;
}

function getSixRollCount() {
  let sixRollCount = 0;
  for (let i = 0; i < rollCount.length; i++) {
    for (let j = 0; j < cubeCount; j++) {
      if (rollCount[i][j] == 6) {
        sixRollCount++;
      }
    }
  }
  //console.log("Hatos dobások száma:", sixRollCount);
  return sixRollCount;
}

function isTripleMax() {
  let isTripleSixRoll = false;
  for (let i = 0; i < rollCount.length; i++) {
    let sum = 0;
    for (let j = 0; j < cubeCount; j++) {
      sum += rollCount[i][j];
    }
    if (sum === 18) {
      isTripleSixRoll = true;
      break;
    }
  }
  if (isTripleSixRoll) {
    return true;
  } else {
    return false;
  }
}
/** Hányszór volt */
function equalRollCount() {
  let sameCount = 0;

  for (let i = 0; i < rollCount.length; i++) {
    let isSame = true;
    let firstElement = rollCount[i][0];
    for (let j = 0; j < cubeCount; j++) {
      if (firstElement != rollCount[i][j]) {
        isSame = false;
      }
    }
    if (isSame) {
      sameCount++;
    }
  }
  //console.log("Egyforma dobások száma: ", sameCount);
  return sameCount;
  //resultEl.innerHTML += `5 ször volt egyforma dobás ${sameCount}`;
}

/**
 * SZORGALMI
 */

function differentRollCount() {
  let count = 0;

  for (let i = 0; i < rollCount.length; i++) {
    let isDifferent = true;
    let firstElement = rollCount[i][0];
    for (let j = 1; j < cubeCount; j++) {
      if (firstElement == rollCount[i][j]) {
        isDifferent = false;
      }
    }
    if (isDifferent) {
      count++;
    }
  }

  return count;
}

//összegzem egy tömbbe a kocka összegeket, 0-ik elem a kockák  összege, 1 elem a darabszám
function cubeSums() {
  let sumObj = {};
  for (let i = 0; i < rollCount.length; i++) {
    let sum = 0;
    for (let j = 0; j < cubeCount; j++) {
      sum += rollCount[i][j];
    }
    //cubeSums.push(sum);
    if (sumObj[sum]) {
      sumObj[sum]++;
    } else {
      sumObj[sum] = 1;
    }
  }
  return Array.from(Object.entries(sumObj));
}

function lessCommonSum() {
  let array = cubeSums();
  let min = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i][1] < min[1]) {
      min = array[i];
    }
  }

  return min[0];
}

function mostCommonSum() {
  let array = cubeSums();
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][1] > max[1]) {
        max = array[i];
      }
    }
  }
  return max[0];
}
/**
 *
 * nem a legszebb egy object-el tér vissza a fgv, és ezt jelenítem meg
 * {
 * 1:0
 * 2:0,
 * 3:1
 * 4:10,
 * 6:20
 * }
 */
function percentageOneToSix() {
  let helperObj = {};
  for (let i = 0; i < rollCount.length; i++) {
    for (let j = 0; j < cubeCount; j++) {
      if (helperObj[rollCount[i][j]]) {
        helperObj[rollCount[i][j]]++;
      } else {
        helperObj[rollCount[i][j]] = 1;
      }
    }
  }

  let sum = 0;
  for (let value of Object.values(helperObj)) {
    sum += value;
  }

  for (let i = 1; i <= 6; i++) {
    if (helperObj[i]) {
      helperObj[i] = ((helperObj[i] / sum) * 100).toFixed(2);
    } else {
      helperObj[i] = Number(0).toFixed(2);
    }
  }
  console.log(helperObj);
  return helperObj;
}
function oddCountPerRoll() {
  let count = 0;

  for (let i = 0; i < rollCount.length; i++) {
    let isOdd = true;
    for (let j = 0; j < cubeCount; j++) {
      if (rollCount[i][j] % 2 === 0) {
        isOdd = false;
      }
    }
    if (isOdd) {
      count++;
    }
  }

  return count;
}

function isSeries(array) {
  let isAscending = true;
  for (let i = 1; i < cubeCount; i++) {
    if (array[i] - array[i - 1] !== 1) {
      isAscending = false;
      break;
    }
  }

  if (isAscending) {
    return true;
  }

  let isDescending = true;
  for (let i = 1; i < cubeCount; i++) {
    if (array[i - 1] - array[i] !== 1) {
      isDescending = false;
      break;
    }
  }

  return isDescending;
}
function seriesRoll() {
  let rolls = [];

  for (let i = 0; i < rollCount.length; i++) {
    if (isSeries(rollCount[i])) {
      rolls.push(i + 1);
    }
  }

  return rolls.length > 0 ? rolls.join(", ") : "Még nem dobtál sorozatot!";
  return rolls.join(", ");
}

export {
  seriesRoll,
  mostCommonSum,
  lessCommonSum,
  oddCountPerRoll,
  percentageOneToSix,
  differentRollCount,
  equalRollCount,
  rollCube,
  getSixRollCount,
  biggestRoll,
  averageRolls,
  isTripleMax,
};
