const rangeEl = document.querySelector("input[type=range]");
const rangeLabelEl = document.querySelector("label:has(+input[type=range])");
const rootEl = document.querySelector(":root");

const cubeEls = document.querySelectorAll(".cube");
const cubeBgColorEl = document.querySelector("#cubeColor");
const dotColorEl = document.querySelector("#dotColor");

document.addEventListener("DOMContentLoaded", () => {
  changeCubeSize();
  changeBgColor();
  changeDotCOlor();
});

rangeEl.onchange = changeCubeSize;
cubeBgColorEl.onchange = changeBgColor;
dotColorEl.onchange = changeDotCOlor;

function changeCubeSize() {
  rangeLabelEl.querySelector("span").innerText = rangeEl.value;
  rootEl.style.setProperty("--size", rangeEl.value + "px");
}

function changeBgColor() {
  rootEl.style.setProperty("--bg-color", cubeBgColorEl.value);
}

function changeDotCOlor() {
  rootEl.style.setProperty("--dot-color", dotColorEl.value);
}
