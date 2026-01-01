/* ==========================================================================
   STATE.JS
   Centralized UI state store
   ========================================================================== */

/* --------------------------------------------------------------------------
   INTERNAL STATE
-------------------------------------------------------------------------- */
const _state = {
  targetType: "ip",      // ip | domain | email | username
  targetValue: "",
  isSearching: false
};

const allowedTargetTypes = new Set([
  "ip",
  "domain",
  "email",
  "username"
]);

/* --------------------------------------------------------------------------
   READ ONLY ACCESS
-------------------------------------------------------------------------- */
export function getState() {
  return { ..._state };
}

/* --------------------------------------------------------------------------
   SUBSCRIPTIONS (optional, future-ready)
-------------------------------------------------------------------------- */
const listeners = new Set();

export function subscribe(fn) {
  if (typeof fn !== "function") return;
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  listeners.forEach(fn => fn(getState()));
}

/* --------------------------------------------------------------------------
   SETTERS
-------------------------------------------------------------------------- */
export function setTargetType(type) {
  if (!allowedTargetTypes.has(type)) {
    console.warn(`[State] Invalid targetType: ${type}`);
    return;
  }

  _state.targetType = type;
  notify();
}

export function setTargetValue(value) {
  if (typeof value !== "string") return;

  _state.targetValue = value.trim();
  notify();
}

export function setSearching(flag) {
  _state.isSearching = Boolean(flag);
  notify();
}

/* --------------------------------------------------------------------------
   INITIALIZATION
-------------------------------------------------------------------------- */
notify();
