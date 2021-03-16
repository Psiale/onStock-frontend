/* eslint-disable no-console */
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

export const retrieveItem = string => localStorage.getItem(string);

export const extractID = element => element.id;

export const colorProgression = percentage => {
  let color = 'green';
  console.log(percentage);
  if (percentage <= 20) {
    color = 'red';
  } else if (percentage <= 50) {
    color = 'orange';
  } else if (percentage <= 70) {
    color = 'yellow';
  }
  return color;
};

const lowest = (prev, curr) => {
  console.log(`this is prev ${prev.remaining_amount} and this is curr: ${curr.remaining_amount}`);
  if (curr.remaining_amount > 0
    && curr.remaining_amount < prev.remaining_amount) {
    return curr;
  }
  return prev;
};
export const lowestMaterial = materials => {
  if (materials !== [] && materials.length > 0) {
    return materials.reduce(lowest);
  }
  return 'null';
};

// export const handleInvalidInput = (message, e) => e.target.setCustomValidity(message);
