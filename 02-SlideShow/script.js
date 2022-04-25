"use strict";

// local data
const scientistsData = [
  {
    id: 0,
    name: "Nikola Tesla",
    job: "Electrical Engineer",
    img: "./images/nikola-tesla.JPG",
    text: "Nikola Tesla was a Serbian-American inventor, electrical engineer, mechanical engineer, and futurist best known for his contributions to the design of the modern alternating current electricity supply system.",
    link: "https://en.wikipedia.org/wiki/Nikola_Tesla",
  },
  {
    id: 1,
    name: "Albert Einstein",
    job: "Theoretical Physicist",
    img: "./images/albert-einstein.JPG",
    text: "Albert Einstein was a German-born theoretical physicist, widely acknowledged to be one of the greatest physicists of all time. Einstein is best known for developing the theory of relativity.",
    link: "https://en.wikipedia.org/wiki/Albert_Einstein",
  },
  {
    id: 2,
    name: "Isac Newton",
    job: "Mathematicians ",
    img: "./images/isac-newton.JPG",
    text: "Sir Isaac Newton PRS was an English mathematician, physicist, astronomer, alchemist, theologian, and author widely recognised as one of the greatest mathematicians and physicists of all time.",
    link: "https://en.wikipedia.org/wiki/Isaac_Newton",
  },
  {
    id: 3,
    name: "Charles Darwin",
    job: "Evolutionary Biologist",
    img: "./images/charles-darwin.JPG",
    text: "Charles Robert Darwin FRS FRGS FLS FZS was an English naturalist, geologist and biologist, best known for his contributions to evolutionary biology.",
    link: "https://en.wikipedia.org/wiki/Charles_Darwin",
  },
  {
    id: 4,
    name: "Thomas Edison",
    job: "Inventor",
    img: "./images/thomas-edison.JPG",
    text: "Thomas Alva Edison was an American inventor and businessman. He developed many devices in fields such as electric power generation, mass communication, sound recording, and motion pictures.",
    link: "https://en.wikipedia.org/wiki/Thomas_Edison",
  },
];

const img = document.getElementById("person-img");
const scientist = document.getElementById("scientist");
const job = document.getElementById("job");
const info = document.getElementById("info");
const link = document.getElementById("link");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

let currentItem = 0;
let randomNumber = 0;

// load initial item
window.addEventListener("DOMContentLoaded", function () {
  const item = scientistsData[0];
  img.src = item.img;
  scientist.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
  link.href = item.link;
});

// show person based on item
function showScientist(newScientist) {
  const item = scientistsData[newScientist];
  img.src = item.img;
  scientist.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
  link.href = item.link;
}

// show next scientist
nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > scientistsData.length - 1) currentItem = 0;
  showScientist(currentItem);
});

// show previous scientist
prevBtn.addEventListener("click", function () {
  currentItem--;
  if (currentItem < 0) currentItem = scientistsData.length - 1;
  showScientist(currentItem);
});

// show random scientist
randomBtn.addEventListener("click", function () {
  randomNumber = Math.floor(Math.random() * scientistsData.length);
  while (currentItem === randomNumber) {
    randomNumber = Math.floor(Math.random() * scientistsData.length);
  }
  currentItem = randomNumber;
  showScientist(currentItem);
});
