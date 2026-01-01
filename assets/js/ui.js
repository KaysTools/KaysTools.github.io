/* ==========================================================================
   UI.JS
   UI orchestration & interaction logic
   ========================================================================== */

import { getState, setTargetValue, setSearching } from "./state.js";
import { validateInput } from "./validators.js";

/* --------------------------------------------------------------------------
   ELEMENT REFERENCES
-------------------------------------------------------------------------- */
const inputEl = document.getElementById("searchInput");
const buttonEl = document.getElementById("searchBtn");

if (!inputEl || !buttonEl) {
  console.warn("[UI] Required elements not found");
}

/* --------------------------------------------------------------------------
   UI HELPERS
-------------------------------------------------------------------------- */
function setButtonLoading(isLoading) {
  buttonEl.disabled = isLoading;
  buttonEl.textContent = isLoading ? "Searching…" : "Search";
}

function showInputError(message) {
  inputEl.classList.add("input-error");
  inputEl.setAttribute("aria-invalid", "true");
  inputEl.title = message;
}

function clearInputError() {
  inputEl.classList.remove("input-error");
  inputEl.removeAttribute("aria-invalid");
  inputEl.removeAttribute("title");
}

/* --------------------------------------------------------------------------
   SEARCH HANDLER
-------------------------------------------------------------------------- */
function handleSearch() {
  const { targetType } = getState();
  const rawValue = inputEl.value;

  clearInputError();

  const result = validateInput(targetType, rawValue);

  if (!result.valid) {
    showInputError(result.reason);
    return;
  }

  // Update state
  setTargetValue(result.value);
  setSearching(true);
  setButtonLoading(true);

  // 🔒 Placeholder for real OSINT logic
  console.info("[Search]", {
    type: targetType,
    value: result.value
  });

  // Simulated async operation (replace later)
  setTimeout(() => {
    setSearching(false);
    setButtonLoading(false);
  }, 800);
}

/* --------------------------------------------------------------------------
   EVENT BINDINGS
-------------------------------------------------------------------------- */
buttonEl.addEventListener("click", handleSearch);

inputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

inputEl.addEventListener("input", () => {
  clearInputError();
});

/* --------------------------------------------------------------------------
   INITIAL STATE
-------------------------------------------------------------------------- */
setButtonLoading(false);
