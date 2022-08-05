import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [date_of_birth, setDOB] = useState(0);
  const [profile_pic, setProfilePic] = useState('https://pbs.twimg.com/media/EAmSLPPU4AADHjj.png');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, full_name, date_of_birth, profile_pic, city, state));
      if (data) {
        setErrors(data)
      }
    }
};

  const updateUsername = (e) => {setUsername(e.target.value)};
  const updateEmail = (e) => {setEmail(e.target.value)};
  const updateFullName = (e) => {setFullName(e.target.value)};
  const updatePassword = (e) => {setPassword(e.target.value)};
  const updateRepeatPassword = (e) => {setRepeatPassword(e.target.value)};
  const updateDOB = (e) => {setDOB(e.target.value)};
  const updateProfilePic = (e) => {setProfilePic(e.target.value)};
  const updateCity = (e) => {setCity(e.target.value)};
  const updateState = (e) => {setState(e.target.value)};

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input type='text' name='username' onChange={updateUsername} value={username}></input>
      </div>
      <div>
        <label>Full Name</label>
        <input type='text' name='full_name' onChange={updateFullName} value={full_name} required={true}></input>
      </div>
      <div>
        <label>Age</label>
        <input type='integer' name='date_of_birth' onChange={updateDOB} value={date_of_birth} required={true}></input>
      </div>
      <div>
        <label>Profile Picture</label>
        <input type='text' name='profile_pic' onChange={updateProfilePic} required={true}></input>
      </div>
      <div>
        <label>City</label>
        <input type='text' name='city' onChange={updateCity} value={city} required={true}></input>
      </div>
      <div>
        <label>State</label>
        <input type='text' name='state' onChange={updateState} value={state} required={true}></input>
      </div>
      <div>
        <label>Email</label>
        <input type='text' name='email' onChange={updateEmail} value={email}></input>
      </div>
      <div>
        <label>Password</label>
        <input type='password' name='password' onChange={updatePassword} value={password}></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input type='password' name='repeat_password' onChange={updateRepeatPassword} value={repeatPassword} required={true}></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
