// Function to check if an email is valid
export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // The regular expression pattern matches strings that have no whitespace characters,
  // followed by an @ symbol, followed by more characters without whitespace,
  // followed by a dot, and then more characters without whitespace.
  return emailRegex.test(email);
}

// Function to check if a username is valid
export function isValidUsername(username: string) {
  const usernameRegex = /^(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]{3,20}(?<![_-])$/;
  // The regular expression pattern matches strings that are between 3 to 20 characters long,
  // and contain only letters, digits, hyphens, and underscores,
  // with the condition that the string does not start or end with a hyphen or underscore.
  return usernameRegex.test(username);
}

// Function to check if a password is valid
export function isValidPassword(password: string) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  // The regular expression pattern matches strings that are at least 8 characters long,
  // and contain at least one digit, one lowercase letter, one uppercase letter,
  // and one letter (any case).
  return passwordRegex.test(password);
}

// Function to check if a phone number is valid
export function isValidPhone(phone: string) {
  const phoneRegex = /^\(?([0-9]{4})\)?([0-9]{3})?([0-9]{4})$/;
  // The regular expression pattern matches US phone numbers in various formats,
  // including the formats: (123) 456-7890, 123-456-7890, and 1234567890.
  return phoneRegex.test(phone);
}
