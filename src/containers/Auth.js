/* eslint-disable no-console */
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Auth = () => {
  const history = useHistory();
  const handleSubmit = () => {
    // do this with the store, I think maybe a isAuth boolean to make it work
    history.push('/dashboard');
  };
  return (
    <>
      <LoginForm handleSubmit={handleSubmit} />
      <SignupForm handleSubmit={handleSubmit} />
    </>
  );
};

export default Auth;
