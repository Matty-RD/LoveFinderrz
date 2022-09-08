import React, { useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import { updateUserThunk } from '../../store/user';


function EditUser() {

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();


  console.log(user.id)

  let errorsObj = {};
  const [errors, setErrors] = useState(errorsObj);
  const [username, setUsername] = useState(user.username);
  const [full_name, setFullName] = useState(user.full_name);
  const [profile_pic, setProfilePic] = useState(user.profile_pic);
  const [city, setCity] = useState(user.city);


  const updateUsername = (e) => {setUsername(e.target.value)};
  const updateFullName = (e) => {setFullName(e.target.value)};
  const updateProfilePic = (e) => {setProfilePic(e.target.value)};
  const updateCity = (e) => {setCity(e.target.value)};

  const updateUserInfo = () => {
    let error = false;
      errorsObj = {...errorsObj};
      if(username === '') {
        errorsObj.username = "Requires Username.";
        error = true;
      } else if (username.length > 15 || username.length < 5) {
        errorsObj.username = "Username must be longer than 5 characters, but shorter than 15";
        error = true;
      }
      if (!profile_pic.includes(".jpg") && !profile_pic.includes(".png") && !profile_pic.includes(".JPG") && !profile_pic.includes(".PNG") && !profile_pic.includes("image") && !profile_pic.includes(".gif") && !profile_pic.includes(".GIF")) {
        errorsObj.profile_pic = "Image URL must be in .jpg or .png or .gif format"
        error = true
      }
      else if (profile_pic.length < 10) {
        errorsObj.post_pic = "Image URL must be at least 10 characters."
        error = true
      }
      if(full_name === '') {
        errorsObj.full_name = "Requires a full name!";
        error = true;
      } else if (full_name.length < 5) {
        errorsObj.full_name = "Requires a full name!";
        error = true;
      }
      if(city === '') {
        errorsObj.city = "Requires a city!";
        error = true;
      }
      setErrors(errorsObj);

      if(!error) {
    const newInfo = {
        username,
        full_name,
        profile_pic,
        city
    }
    dispatch (updateUserThunk(newInfo, user.id))
    history.push(`/users/${user.id}`)
  }
}

  return (
    <form>
        <img alt='' src={user.profile_pic} width="400" height="400" className="postpic" onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/PiuLhut.png"}}></img>
    <div className="error">
      {Object.values(errors).map((error, idx) => <div><li key={idx}>{error}</li></div>)}
      </div>
      <div className='twoRows'>
      <div className='columnOne'>
      <div className='signUpInput'>
        <label className='signupLabel'> Change Username</label>
        <input  type='text' name='username' onChange={updateUsername} value={username} required={true}></input>
        <label><small>required</small></label>
      </div>
      <div className='signUpInput'>
        <label className='signupLabel'>Change Full Name</label>
        <input  type='text' name='full_name' onChange={updateFullName} value={full_name} required={true}></input>
        <label><small>required</small></label>
      </div>
      </div>
      <div className='columnTwo'>
      <div className='signUpInput'>
        <label className='signupLabel'>New Profile Picture</label>
        <input type='text' name='profile_pic' placeholder='Image URL' onChange={updateProfilePic} required={true}></input>
      </div>
      <div className='signUpInput'>
        <label className='signupLabel'>Change City</label>
        <input  type='text' name='city' onChange={updateCity} value={city} required={true}></input>
        <label><small>required</small></label>
      </div>
      </div>
      </div>
      <div>
      <button type='button' onClick={updateUserInfo}>Submit</button>
      </div>
    </form>
  );
};

  export default EditUser;
