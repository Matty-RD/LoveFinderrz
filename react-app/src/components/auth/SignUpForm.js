import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css'

const SignUpForm = () => {

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [date_of_birth, setDOB] = useState(0);
  const [profile_pic, setProfilePic] = useState('https://pbs.twimg.com/media/EAmSLPPU4AADHjj.png');
  const [city, setCity] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const onSignUp = async (e) => {
    e.preventDefault();
    if(password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, full_name, date_of_birth, profile_pic, city));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords do not Match.'])
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

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div className='error' key={ind}>{error}</div>
        ))}
      </div>
      <div className='twoRows'>
      <div className='columnOne'>
      <div className='signUpInput'>
        <label className='signupLabel'>Username</label>
        <input  type='text' name='username' onChange={updateUsername} value={username} required={true}></input>
        <label><small>required</small></label>
      </div>
      <div className='signUpInput'>
        <label className='signupLabel'>Full Name</label>
        <input  type='text' name='full_name' onChange={updateFullName} value={full_name} required={true}></input>
        <label><small>required</small></label>
      </div>
      <div className='signUpInput'>
        <label className='signupLabel'>Email</label>
        <input  type='text' name='email' onChange={updateEmail} value={email} required={true}></input>
        <label><small>required</small></label>
      </div>
      <div className='signUpInput'>
        <label className='signupLabel'>Date of Birth</label>
        <input  type='date' name='date_of_birth' onChange={updateDOB} value={date_of_birth} required={true}></input>
        <label><small>required</small></label>
      </div>
      </div>
      <div className='columnTwo'>
      <div className='signUpInput'>
        <label className='signupLabel'>Profile Picture</label>
        <input type='text' name='profile_pic' placeholder='Image URL' onChange={updateProfilePic} required={true}></input>
        <label><small>required</small></label>
      </div>
      <div className='signUpInput'>
        <label className='signupLabel'>City</label>
        <input  type='text' name='city' onChange={updateCity} value={city} required={true}></input>
        <label><small>required</small></label>
      </div>
      <div className='signUpInput'>
        <label className='signupLabel'>Password</label>
        <input  type='password' name='password' onChange={updatePassword} value={password} required={true}></input>
        <label><small>required</small></label>
      </div>
      <div className='signUpInput'>
        <label className='signupLabel'>Repeat Password</label>
        <input  type='password' name='repeat_password' onChange={updateRepeatPassword} value={repeatPassword} required={true}></input>
        <label><small>required</small></label>
      </div>
      </div>
      </div>
      <div>
      <button type='submit'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
