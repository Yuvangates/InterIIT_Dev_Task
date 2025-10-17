import React, { useState } from 'react';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchModeHandler = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <div className="auth-container">
      {isLogin ? <LoginForm /> : <SignupForm />}
      <button onClick={switchModeHandler} className="switch-btn">
        {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
      </button>
    </div>
  );
};

export default AuthPage;