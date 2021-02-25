/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import Proptypes from 'prop-types';

const AuthForm = ({ labels, btnText, handleSubmit }) => {
  const [value, setValue] = useState('');
  const handleChange = () => {
    setValue(event.target.value);
    console.log(value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        {labels.map(item => (
          <label htmlFor={item} key={item}>
            {item}
            <input id={item} type="text" value={value} onChange={handleChange} />
          </label>
        ))}
        <input type="submit" value={btnText} />
      </form>
    </>
  );
};

AuthForm.propTypes = {
  labels: Proptypes.arrayOf(
    Proptypes.string,
  ).isRequired,
  btnText: Proptypes.string.isRequired,
  handleSubmit: Proptypes.func.isRequired,
};

export default AuthForm;
