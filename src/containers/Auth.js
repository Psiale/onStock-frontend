/* eslint-disable no-console */
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Auth = () => {
  const handleSubmit = () => {
    console.log('heeeeelo');
  };
  return (
    <>
      <LoginForm handleSubmit={handleSubmit} />
      <SignupForm handleSubmit={handleSubmit} />
    </>
  );
};

export default Auth;
