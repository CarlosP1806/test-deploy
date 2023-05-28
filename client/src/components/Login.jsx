import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const defaultFormValues = {
    username: '',
    password: ''
  }
  const [formValues, setFormValues] = useState(defaultFormValues);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormValues({ ...formValues, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      if(!response.ok) {
        throw new Error('cannot login');
      }

      response = await response.json();
      // navigate('/');
      window.location.assign('/');

    } catch(err) {
      console.log(err);
    }
  }

  return (
    <form className='form__login' onSubmit={handleFormSubmit}>
      <header className="login__header">Login</header>
      <input 
        type="text" 
        name="username" 
        placeholder='username'
        value={formValues.username}
        onChange={handleInputChange}
      />
      <input 
        type="password" 
        name="password" 
        placeholder='password'
        value={formValues.password}
        onChange={handleInputChange}
      />
      <button>Login</button>
    </form>
  )
}

export default Login;
