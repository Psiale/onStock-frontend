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
  if (prev.remaining_amount < curr.remaining_amount) {
    return prev;
  }
  return curr;
};
export const lowestMaterial = materials => {
  if (materials !== []) {
    console.log(materials.reduce(lowest));
    return materials.reduce(lowest);
  }
  return 'null';
};

// export const handleInvalidInput = (message, e) => e.target.setCustomValidity(message);
