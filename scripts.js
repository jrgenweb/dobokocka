import {
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
  isTripleMax,
  averageRolls,
  cubeCount,
  rollCount,
} from "./functions.js";

const cubeSides = {
  1: {
    x: 0,
    y: 0,
  },
  2: {
    x: 180,
    y: 0,
  },
  3: {
    x: 0,
    y: 270,
  },
  4: {
    x: 0,
    y: 90,
  },
  5: {
    x: 270,
    y: 0,
  },
  6: {
    x: 90,
    y: 0,
  },
};

const animationTime = 2;
let myChart = [];

document.addEventListener("DOMContentLoaded", () => {
  let cubeEl = document.querySelector(".cube");
  let stageEl = document.querySelector(".stage");
  for (let i = 1; i < cubeCount; i++) {
    let clonedChild = cubeEl.cloneNode(true);
    clonedChild.dataset.id = i;
    stageEl.appendChild(clonedChild);
  }

  const ctx = document.getElementById("myChart");

  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["1", "2", "3", "4", "5", "6"],
      datasets: [
        {
          label: "",
          data: [0, 0, 0, 0, 0, 0],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});

document.getElementById("rollButton").addEventListener("click", function () {
  setAnimationToCube();

  document.querySelector(
    ".task1"
  ).innerHTML = `A dobások átlaga: ${averageRolls()}
  `;
  //averageRolls();
  document.querySelector(
    ".task2"
  ).innerHTML = `A legnagyobb dobás: ${biggestRoll()}
  `;
  document.querySelector(
    ".task3"
  ).innerHTML = `6-os dobások száma: ${getSixRollCount()}
  `;
  document.querySelector(".task4").innerHTML = `Volt-e tripla 6-os dobás: ${
    isTripleMax() ? "igen" : "nem"
  }
  `;

  document.querySelector(
    ".task5"
  ).innerHTML = `Egyforma dobások száma: ${equalRollCount()}
  `;
  document.querySelector(
    ".task6"
  ).innerHTML = `Különböző dobások száma: ${differentRollCount()}
  `;
  document.querySelector(
    ".task7"
  ).innerHTML = `Legkevesebbszer előforduló kocka összeg: ${lessCommonSum()}
  `;
  document.querySelector(
    ".task8"
  ).innerHTML = `Legtöbbször előforduló kocka összeg: ${mostCommonSum()}
  `;

  let percentage = percentageOneToSix();
  document.querySelector(".task9").innerHTML = `A 2-es: ${percentage[2]}
  %-ban, a 4-es: ${percentage[4]}%-ban, a 6-os ${percentage[6]}%-ban fordult elő.`;

  //chart beállítása

  let labels = Array.from(Object.keys(percentage));
  let data = Array.from(Object.values(percentage));
  myChart.data.datasets[0].data = data;
  myChart.data.labels = labels;
  myChart.update();

  document.querySelector(
    ".task10"
  ).innerHTML = `Páratlan dobások száma:${oddCountPerRoll()}`;
  document.querySelector(
    ".task11"
  ).innerHTML = `A következő dobásokkor dobtál sorozatot: ${seriesRoll()}`;
});

function setAnimationToCube() {
  const cubesEl = document.querySelectorAll(".cube");
  const rolls = rollCube();
  for (let i = 0; i < cubesEl.length; i++) {
    cubesEl[i].style.animation = `rotateCube ${animationTime}s ease infinite`;

    setTimeout(() => {
      cubesEl[i].style.setProperty("--x-deg", cubeSides[rolls[i]].x + "deg");
      cubesEl[i].style.setProperty("--y-deg", cubeSides[rolls[i]].y + "deg");
      cubesEl[i].style.animation = `rotateTo ${animationTime}s ease forwards`;
    }, Number(animationTime) * 1000);
  }

  rollCount.push(rolls);
  console.log(rollCount);
}
