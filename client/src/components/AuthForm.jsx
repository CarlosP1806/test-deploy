import React from 'react';
import Login from './Login';

function AuthForm() {
  
  return (
    <>
      <section className="auth-form">
        <header className='form__header'>Authentication App</header>
        <Login />
      </section> 
    </>
  )
}

export default AuthForm;
