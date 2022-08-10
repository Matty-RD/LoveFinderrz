import { getAllPostsThunk, deletePostThunk } from "../../store/post";
import { getAllMatchesThunk } from "../../store/match";
import { createMatchThunk } from "../../store/match";
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import { useHistory, NavLink } from "react-router-dom";
import './postPage.css';

function PostsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector((state) => state.session.user)
    const postsObject = useSelector((state) => state.posts);
    const posts = Object.values(postsObject);
    const sortedPost = posts.sort().reverse();
    const matchesObject = useSelector((state) => state.matches);
    const matches = Object.values(matchesObject);
    const usersMatches = matches.filter(match => match.first_userId === sessionUser.id)

    useEffect(() => {
        dispatch(getAllPostsThunk());
        dispatch(getAllMatchesThunk());
      }, [dispatch]);


    const EditClick = (e) => {
      e.preventDefault();
      const buttonData = Number(e.target.id);
          history.push(`/posts/edit/${buttonData}`)
      }


      const AdmireClick = (postInfo) => {
        const postId = postInfo.id
        const first_userId = Number(user.id);
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
        <div>
        {sortedPost.map(post =>{
          if(sessionUser.id === post.userId) {
            return (
            <div key={post.id} className='postPage'>
            <span className="pfp">
            <img alt='' src={post.user.profile_pic} width="75" height="75" className="postpic" onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/PiuLhut.png"}}/>
            <h1 className='posterName' ><NavLink to={`/users/${post.userId}`}>{post.user.username}</NavLink></h1>
            </span>
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
            <span className="pfp">
            <img alt='' src={post.user.profile_pic} width="75" height="75" className="postpic" onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/PiuLhut.png"}}/>
            <h1 className='posterName' ><NavLink to={`/users/${post.userId}`}>{post.user.username}</NavLink></h1>
            </span>
            <h4 className="postTitle">{post.title}</h4>
            <img alt='' src={post.post_pic} width="400" height="210" className="postpic" onError={(e)=>{e.target.onerror = null; e.target.src="https://i.imgur.com/PiuLhut.png"}}/>
            <p className="caption">{post.caption}</p>
            <div className='buttonDiv'>
            {usersMatches.map(match => {
              if(match.postId === post.id && match.first_userId === user.id) {
                button = <button type="submit" className='admire' id={'test'} onClick={() => AdmireClick(post)} disabled>Admired</button>
                return
              } else if (match.postId === post.id && match.first_userId !== user.id){
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


  export default PostsPage;
