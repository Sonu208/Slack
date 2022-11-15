export const nameValidation = (name) => {
  if (name.length < 3) {
    return "Name must be at least 3 characters long";
  }
  if (name.length > 30) {
    return "Name must be less than 30 characters long";
  }
  return '';
}

export const emailValidation = (email) => {
  if (!email.includes("@")) {
    return "Email must be valid";
  }
  return '';
}

export const passwordValidation = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  if (password.length > 30) {
    return "Password must be less than 30 characters long";
  }
  if(password.search(/[a-z]/i) < 0) {
    return "Password must contain at least one letter";
  }
  if(password.search(/[0-9]/) < 0) {
    return "Password must contain at least one digit";
  }
  if(password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) < 0) {
    return "Password must contain at least one special character";
  }
  return '';
}