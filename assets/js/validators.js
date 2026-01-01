/* =========================================================
   VALIDATORS.JS
   Strict input validation (no inference)
========================================================= */

/* -------------------------
   IP ADDRESS
------------------------- */
export function isValidIP(value) {
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  return ipRegex.test(value);
}

/* -------------------------
   DOMAIN
------------------------- */
export function isValidDomain(value) {
  const domainRegex =
    /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(value);
}

/* -------------------------
   EMAIL
------------------------- */
export function isValidEmail(value) {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/* -------------------------
   USERNAME
------------------------- */
export function isValidUsername(value) {
  const usernameRegex =
    /^[a-zA-Z0-9_.-]{3,32}$/;
  return usernameRegex.test(value);
}

/* -------------------------
   MASTER CHECK
------------------------- */
export function validateByType(type, value) {
  if (!value) return false;

  switch (type) {
    case "ip":
      return isValidIP(value);
    case "domain":
      return isValidDomain(value);
    case "email":
      return isValidEmail(value);
    case "username":
      return isValidUsername(value);
    default:
      return false;
  }
}
