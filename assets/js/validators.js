/* ==========================================================================
   VALIDATORS.JS
   Deterministic, OSINT-safe input validation
   ========================================================================== */

/* --------------------------------------------------------------------------
   REGEX DEFINITIONS
-------------------------------------------------------------------------- */

/* IPv4 (no CIDR, no DNS resolution) */
const IPV4_REGEX =
  /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

/* Domain (no protocol, no path, ASCII only) */
const DOMAIN_REGEX =
  /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

/* Email (OSINT-safe, non-RFC-exhaustive) */
const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Username (platform-agnostic baseline) */
const USERNAME_REGEX =
  /^[a-zA-Z0-9._-]{3,32}$/;

/* --------------------------------------------------------------------------
   VALIDATOR MAP
-------------------------------------------------------------------------- */
const validators = {
  ip: {
    test: value => IPV4_REGEX.test(value),
    error: "Invalid IPv4 address"
  },

  domain: {
    test: value => DOMAIN_REGEX.test(value),
    error: "Invalid domain format"
  },

  email: {
    test: value => EMAIL_REGEX.test(value),
    error: "Invalid email address"
  },

  username: {
    test: value => USERNAME_REGEX.test(value),
    error: "Invalid username format"
  }
};

/* --------------------------------------------------------------------------
   MAIN VALIDATION FUNCTION
-------------------------------------------------------------------------- */
export function validateInput(type, rawValue) {
  if (typeof rawValue !== "string") {
    return {
      valid: false,
      reason: "Input must be a string"
    };
  }

  const value = rawValue.trim();

  if (!value) {
    return {
      valid: false,
      reason: "Input is empty"
    };
  }

  const validator = validators[type];

  if (!validator) {
    return {
      valid: false,
      reason: "Unknown target type"
    };
  }

  if (!validator.test(value)) {
    return {
      valid: false,
      reason: validator.error
    };
  }

  return {
    valid: true,
    value
  };
}
