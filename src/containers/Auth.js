import AuthForm from '../components/AuthForm'

const Auth = () => {
  const handleSubmit = () => {

  };
  return (
    <>
      <AuthForm labels={['name:', 'email:', 'password:', 'password confirmation:']} btnText="Sign Up" handleSubmit={handleSubmit} />
      <AuthForm labels={['name:', 'email:', 'password:', 'password confirmation:']} btnText="Sign Up" handleSubmit={handleSubmit} />
    </>
  );
};
