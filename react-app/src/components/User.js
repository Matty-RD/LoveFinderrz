import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <img alt='profile pic' className="profilepicture" src={user.profile_pic}/>
      </li>
      <li>
        <strong>User Id:</strong> {userId}
      </li>
      <li>
        <strong>Username:</strong> {user.username}
      </li>
      <li>
        <strong>Full Name:</strong> {user.full_name}
      </li>
      <li>
        <strong>City:</strong> {user.city}
      </li>
      <li>
        <strong>State:</strong> {user.state}
      </li>
    </ul>
  );
}
export default User;
