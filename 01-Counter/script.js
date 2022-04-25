"use strict";

let counter = 0; // Keep track of counter

const buttons = document.querySelectorAll(".button");
const value = document.querySelector("#value");

buttons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const button = e.currentTarget.classList;

    if (button.contains("decrease")) counter--;
    if (button.contains("increase")) counter++;
    if (button.contains("reset")) counter = 0;

    if (counter > 0) value.style.color = "#e67700";
    if (counter < 0) value.style.color = "#845ef7";
    if (counter === 0) value.style.color = "#212529";

    value.textContent = counter;
  });
});
