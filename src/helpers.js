const validatePassword = (password, passwordConfirmation) => {
  if (password === passwordConfirmation) return true;
  return false;
};

// export const handleInvalidInput = (message, e) => e.target.setCustomValidity(message);

export default validatePassword;
