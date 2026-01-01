/* ==========================================================================
   PICKER.JS
   Custom target-type picker (no native <select>)
   ========================================================================== */

import { setTargetType } from "./state.js";

/* --------------------------------------------------------------------------
   ELEMENT REFERENCES
-------------------------------------------------------------------------- */
const picker = document.querySelector(".picker");

if (!picker) {
  console.warn("[Picker] .picker element not found");
  return;
}

const toggle = picker.querySelector(".picker-toggle");
const menu = picker.querySelector(".picker-menu");
const items = picker.querySelectorAll(".picker-item");

let isOpen = false;

/* --------------------------------------------------------------------------
   STATE CONTROL
-------------------------------------------------------------------------- */
function openPicker() {
  if (isOpen) return;

  menu.classList.add("open");
  toggle.setAttribute("aria-expanded", "true");
  isOpen = true;
}

function closePicker() {
  if (!isOpen) return;

  menu.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  isOpen = false;
}

function togglePicker(event) {
  event.stopPropagation();
  isOpen ? closePicker() : openPicker();
}

/* --------------------------------------------------------------------------
   ITEM SELECTION
-------------------------------------------------------------------------- */
function selectItem(item) {
  const { type } = item.dataset;
  const label = item.textContent.trim();

  if (!type) return;

  // Update UI
  toggle.textContent = label;

  // Update global state
  setTargetType(type);

  closePicker();
}

/* --------------------------------------------------------------------------
   EVENT BINDINGS
-------------------------------------------------------------------------- */
toggle.addEventListener("click", togglePicker);

items.forEach(item => {
  item.addEventListener("click", () => selectItem(item));
});

/* Close picker when clicking outside */
document.addEventListener("click", (event) => {
  if (!picker.contains(event.target)) {
    closePicker();
  }
});

/* Close picker on Escape key */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePicker();
  }
});

/* --------------------------------------------------------------------------
   INITIAL DEFAULT STATE
-------------------------------------------------------------------------- */
(function initPicker() {
  const defaultItem = picker.querySelector('[data-type="ip"]');

  if (defaultItem) {
    toggle.textContent = defaultItem.textContent.trim();
    setTargetType("ip");
  }

  toggle.setAttribute("aria-haspopup", "listbox");
  toggle.setAttribute("aria-expanded", "false");
})();
