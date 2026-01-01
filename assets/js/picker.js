/* =========================================================
   PICKER.JS
   Custom target-type picker (NO browser select)
========================================================= */

import { setTargetType } from "./state.js";

const picker = document.querySelector(".picker");
const toggle = picker.querySelector(".picker-toggle");
const menu = picker.querySelector(".picker-menu");
const items = picker.querySelectorAll(".picker-item");

let isOpen = false;

/* -------------------------
   OPEN / CLOSE PICKER
------------------------- */
function openPicker() {
  menu.style.display = "block";
  isOpen = true;
}

function closePicker() {
  menu.style.display = "none";
  isOpen = false;
}

toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  isOpen ? closePicker() : openPicker();
});

/* -------------------------
   ITEM SELECTION
------------------------- */
items.forEach(item => {
  item.addEventListener("click", () => {
    const type = item.dataset.type;
    const label = item.textContent;

    // Update UI
    toggle.textContent = label;

    // Update state
    setTargetType(type);

    closePicker();
  });
});

/* -------------------------
   CLICK OUTSIDE TO CLOSE
------------------------- */
document.addEventListener("click", (e) => {
  if (!picker.contains(e.target)) {
    closePicker();
  }
});

/* -------------------------
   DEFAULT STATE
------------------------- */
setTargetType("ip");
toggle.textContent = "IP Address";
