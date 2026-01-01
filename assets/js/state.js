/* =========================================================
   STATE.JS
   Single source of truth for UI state
========================================================= */

export const state = {
  targetType: "ip",      // ip | domain | email | username
  targetValue: "",
  isSearching: false
};

/* -------------------------
   SETTERS
------------------------- */
export function setTargetType(type) {
  state.targetType = type;
}

export function setTargetValue(value) {
  state.targetValue = value.trim();
}

export function setSearching(flag) {
  state.isSearching = flag;
}
