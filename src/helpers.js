/* eslint-disable no-console */

export const validatePassword = (password, passwordConfirmation) => {
  if (password === passwordConfirmation) return true;
  return false;
};

export const createInput = (htmlFor, inputValue, changeHandle, type = 'text') => (
  <>
    <label htmlFor={htmlFor}>
      <input
        required
        id={htmlFor}
        placeholder={htmlFor}
        name={htmlFor}
        type={type}
        value={inputValue}
        onChange={changeHandle}
      />
    </label>
  </>
);

export const saveItem = (string, object) => {
  localStorage.setItem(string, object);
};

export const retrieveItem = string => localStorage.getItem(string);

export const colorProgression = percentage => {
  let color = '#addc91';
  if (percentage <= 20) {
    color = 'red';
  } else if (percentage <= 50) {
    color = '#67899c';
  } else if (percentage <= 70) {
    color = '#62b5e5';
  }
  return color;
};

const lowest = (prev, curr) => {
  const prevPercentage = ((prev.remaining_amount / prev.total_amount) * 100);
  const currPercentage = ((curr.remaining_amount / curr.total_amount) * 100);
  if (curr.remaining_amount > 0
    && currPercentage < prevPercentage) {
    return curr;
  }
  return prev;
};

const notFull = materials => materials.filter(
  material => material.remaining_amount !== material.total_amount,
);
export const lowestMaterial = materials => {
  if (materials !== [] && materials.length > 0) {
    const sanitazed = notFull(materials);
    if (sanitazed.length === 0) return materials[0];
    return notFull(materials).reduce(lowest);
  }
  return 'null';
};

export const errorMessage = error => {
  if (typeof error !== 'boolean') {
    const number = error.match(/\d/g).join('');
    switch (number) {
      case '422':
        return 'Email has already been taken';
      default: return 'Wrong password or email';
    }
  }
  return 'undefined error';
};

export const signOut = history => {
  history.push('/');
  localStorage.removeItem('businessID');
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.reload();
};
