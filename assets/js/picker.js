/* =========================================================
   PICKER.JS
   Custom target-type picker (deterministic)
========================================================= */

import { state, setTargetType } from "./state.js";

/* -------------------------
   ELEMENTS
------------------------- */
const picker = document.querySelector(".picker");
const toggle = document.querySelector(".picker-toggle");
const menu = document.querySelector(".picker-menu");
const items = document.querySelectorAll(".picker-item");

/* -------------------------
   INIT
------------------------- */
export function initPicker() {
  if (!picker) return;

  toggle.textContent = labelForType(state.targetType);

  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  items.forEach(item => {
    item.addEventListener("click", () => {
      const type = item.dataset.type;
      setTargetType(type);
      toggle.textContent = labelForType(type);
      menu.classList.remove("open");
    });
  });

  document.addEventListener("click", e => {
    if (!picker.contains(e.target)) {
      menu.classList.remove("open");
    }
  });
}

/* -------------------------
   LABELS
------------------------- */
function labelForType(type) {
  switch (type) {
    case "ip": return "IP Address";
    case "domain": return "Domain";
    case "email": return "Email";
    case "username": return "Username";
    default: return "Select Type";
  }
}
