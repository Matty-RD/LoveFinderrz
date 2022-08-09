import React, { useState, useEffect } from 'react';
import { getAllPostsThunk, deletePostThunk  } from "../../store/post";
import { useDispatch, useSelector} from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { createMatchThunk } from "../../store/match";
import { getAllMatchesThunk } from "../../store/match";
import './userPage.css'



function UserProfile() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({});
  const { userId }  = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const postsObject = useSelector((state) => state.posts);
  const posts = Object.values(postsObject);
  const sortedPost = posts.filter((post => post.userId === user.id)).sort().reverse();
  const matchesObject = useSelector((state) => state.matches);
  const matches = Object.values(matchesObject);
  const usersMatches = matches.filter(match => match.first_userId === sessionUser.id)

  useEffect(() => {
    dispatch(getAllPostsThunk());
    dispatch(getAllMatchesThunk());
  }, [dispatch]);

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


  const EditClick = (e) => {
    e.preventDefault();
    const buttonData = Number(e.target.id);
        history.push(`/posts/edit/${buttonData}`)
    }

    const AdmireClick = (postInfo) => {
        const postId = postInfo.id
        const first_userId = Number(sessionUser.id);
        const second_userId = Number(postInfo.userId);
        const matched = false;
        const match = {
          postId,
          first_userId,
          second_userId,
          matched
        };
        dispatch(createMatchThunk(match))
      }

  return (
    <>
    <ul className='userInfo'>
      <li>
        <img alt='profile pic' className="profilepicture" src={user.profile_pic}/>
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
    </ul>
    <div>
    <h1>{user.username}'s posts</h1>
    {sortedPost.map(post =>{
          if(sessionUser.id === post.userId) {
            return (
              <div key={post.id} className='userPage'>
            <h1 className='posterName' >{post.user.username}</h1>
            <h4 className="postTitle">{post.title}</h4>
            <img alt='' src={post.post_pic} width="400" height="210" className="postpic" onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/PiuLhut.png"}}/>
            <p className="caption">{post.caption}</p>
            <div className='buttonDiv'>
            <button type="button" onClick={() => dispatch(deletePostThunk(post.id))}>Delete</button>
            <button type="button" id={post.id} onClick={EditClick}>Edit</button>
            </div>
            </div>
            )

          } else {
          let button = <button type="submit" className='admire' id={'test'} onClick={() => AdmireClick(post)}>Admire</button>
          return (
            <div key={post.id} className='postPage'>
            <h1 className='posterName' >{post.user.username}</h1>
            <h4 className="postTitle">{post.title}</h4>
            <img alt='' src={post.post_pic} width="400" height="210" className="postpic" onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/PiuLhut.png"}}/>
            <p className="caption">{post.caption}</p>
            <div className='buttonDiv'>
            {usersMatches.map(match => {
              if(match.postId === post.id && match.first_userId === sessionUser.id) {
                button = <button type="submit" className='admire' id={'test'} onClick={() => AdmireClick(post)} disabled>Admired</button>
                return
              } else if (match.postId === post.id && match.first_userId !== sessionUser.id){
                button = <button type="submit" className='admire' id={'test'} onClick={() => AdmireClick(post)}>Admire</button>
                return
              }
            })}
            {button}
            </div>
            </div>
            )
        }
      })}
    </div>
    </>
  );
}
export default UserProfile;
