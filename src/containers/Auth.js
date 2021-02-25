/* eslint-disable no-console */
import AuthForm from '../components/AuthForm';

const Auth = () => {
  const handleSubmit = () => {
    console.log('heeeeelo');
  };
  return (
    <>
      <AuthForm labels={['name:', 'email:', 'password:', 'password confirmation:']} btnText="Sign Up" handleSubmit={handleSubmit} />
      <AuthForm labels={['email:', 'password:']} btnText="Log in" handleSubmit={handleSubmit} />
    </>
  );
};

export default Auth;
