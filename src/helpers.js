export const validatePassword = (password, passwordConfirmation) => {
  if (password === passwordConfirmation) return true;
  return false;
};

export const createInput = (htmlFor, inputValue, changeHandle, type = 'text') => (
  <>
    <label htmlFor={htmlFor}>
      {htmlFor}
      <input
        required
        id={htmlFor}
        name={htmlFor}
        type={type}
        value={inputValue}
        onChange={changeHandle}
      />
    </label>
  </>
);

export const saveItem = (string, object) => {
  localStorage.setItem(string, JSON.stringify(object));
};

export const retrieveItem = string => JSON.parse(localStorage.getItem(string));

// export const handleInvalidInput = (message, e) => e.target.setCustomValidity(message);
