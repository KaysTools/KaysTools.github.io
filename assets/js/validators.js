/* =========================================================
   VALIDATORS.JS
   Strict, deterministic input validation
========================================================= */

/* -------------------------
   REGEX DEFINITIONS
------------------------- */

// IPv4 (no geo guessing, no DNS)
const ipRegex =
  /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

// Domain (no protocol, no path)
const domainRegex =
  /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

// Email (basic OSINT-safe)
const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Username (generic, platform-agnostic)
const usernameRegex =
  /^[a-zA-Z0-9._-]{3,32}$/;

/* -------------------------
   MAIN VALIDATOR
------------------------- */
export function validateInput(type, value) {
  if (!value || !value.trim()) {
    return {
      valid: false,
      reason: "Input is empty"
    };
  }

  const input = value.trim();

  switch (type) {
    case "ip":
      return ipRegex.test(input)
        ? { valid: true }
        : { valid: false, reason: "Invalid IPv4 address" };

    case "domain":
      return domainRegex.test(input)
        ? { valid: true }
        : { valid: false, reason: "Invalid domain format" };

    case "email":
      return emailRegex.test(input)
        ? { valid: true }
        : { valid: false, reason: "Invalid email address" };

    case "username":
      return usernameRegex.test(input)
        ? { valid: true }
        : { valid: false, reason: "Invalid username format" };

    default:
      return {
        valid: false,
        reason: "Unknown target type"
      };
  }
}
