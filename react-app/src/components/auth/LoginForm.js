import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUserOne = async (e) => {
    e.preventDefault();
    const DemoEmail = "demo@aa.io"
    const DemoPassword = "password"
    const data = await dispatch(login(DemoEmail, DemoPassword));
    if (data) {
      setErrors(data);
    }
  };

  const demoUserTwo = async (e) => {
    e.preventDefault();
    const DemoEmail = "Gojo@aa.io"
    const DemoPassword = "password"
    const data = await dispatch(login(DemoEmail, DemoPassword));
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
      <div>
        {errors.map((error, ind) => (
          <div className='error' key={ind}>{error}</div>
        ))}
      </div>
      <div className='formWrapper'>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className='formWrapper'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        </div>
        <div className='buttonDiv'>
        <button type='submit' className="button">Login</button>
        <button type='submit' className="button" onClick={demoUserOne}>Demo 1</button>
        <button type='submit' className="button" onClick={demoUserTwo}>Demo 2</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
