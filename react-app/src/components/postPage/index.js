import { getAllPostsThunk, deletePostThunk } from "../../store/post";
import { createMatchThunk } from "../../store/match"
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import { useHistory, NavLink } from "react-router-dom"
import './postPage.css'

function PostsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector((state) => state.session.user)
    const postsObject = useSelector((state) => state.posts);
    const posts = Object.values(postsObject);


    useEffect(() => {
        dispatch(getAllPostsThunk());
      }, [dispatch]);


    const EditClick = (e) => {
      e.preventDefault();
      const buttonData = Number(e.target.id);
          history.push(`/posts/edit/${buttonData}`)
      }


      const AdmireClick = (e) => {
        e.preventDefault();

        const admireButton = document.getElementById(e.target.id);
        admireButton.style.display = 'none';

        const first_userId = Number(user.id);
        const second_userId = Number(e.target.id);
        const matched = false;
        const match = {
          first_userId,
          second_userId,
          matched
        };
        dispatch(createMatchThunk(match))
      }


      return (
        <>
        <div>
        {posts.map(post =>{
        if(sessionUser.id === post.userId) {

          return (
            <div key={post.id} className='postPage'>
            <h1 className='posterName' ><NavLink to={`/users/${post.userId}`}>{post.user.username}</NavLink></h1>
            <h4 className="postTitle">{post.title}</h4>
            <img alt='' src={post.post_pic} width="400" height="210" className="postpic"/>
            <p>{post.caption}</p>
            <div className='buttonDiv'>
            <button type="button" onClick={() => dispatch(deletePostThunk(post.id))}>Delete</button>
            <button type="button" id={post.id} onClick={EditClick}>Edit</button>
            </div>
            </div>
            )

        } else {
          return (
            <div key={post.id} className='postPage'>
            <h1 className='posterName' ><NavLink to={`/users/${post.userId}`}>{post.user.username}</NavLink></h1>
            <h4 className="postTitle">{post.title}</h4>
            <img alt='' src={post.post_pic} width="400" height="210" className="postpic"/>
            <p>{post.caption}</p>
            <div className='buttonDiv'>
            <button type="submit" id={post.userId} onClick={AdmireClick}>Admire</button>
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
