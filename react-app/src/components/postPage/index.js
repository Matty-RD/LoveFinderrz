import { getAllPostsThunk, deletePostThunk } from "../../store/post";
import { createMatchThunk } from "../../store/match"
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import { useHistory } from "react-router-dom"
import './postPage.css'

function PostsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user)
    const postsObject = useSelector((state) => state.posts);
    const posts = Object.values(postsObject);

    useEffect(() => {
        dispatch(getAllPostsThunk());
      }, [dispatch]);

    const DeleteClick = (e) => {
        e.preventDefault();
        const buttonData = Number(e.target.id);
        for (const post of posts) {
          if (post.id === buttonData) {
            dispatch(deletePostThunk(post, buttonData))
            history.push("/posts/")
          }
        }
      }

    const EditClick = (e) => {
      e.preventDefault();
      const buttonData = Number(e.target.id);
          history.push(`/posts/edit/${buttonData}`)
      }

      const AdmireClick = (e) => {
        e.preventDefault();
        const first_userId = Number(user.id);
        const second_userId = Number(e.target.id);
        const matched = false;

        const match = {
          first_userId,
          second_userId,
          matched
        };
        dispatch(createMatchThunk(match))
            history.push(`/matches`)
        }

      return (
        <>
        <div>
        { posts.map(post =>{
        return (
        <div key={post.id} className='postPage'>
        <h1>Posted by: {post.user.username}</h1>
        <h3>Title: {post.title}</h3>
        <img alt='' src={post.post_pic} width="400" height="210" className="postpic"/>
        <p>caption: {post.caption}</p>
        <div className='buttonDiv'>
        <button type="button" id={post.id} onClick={DeleteClick}>Delete</button>
        <button type="button" id={post.id} onClick={EditClick}>Edit</button>
        <button type="submit" id={post.userId} onClick={AdmireClick}>Admire</button>
        </div>
        </div>
        )})}
        </div>
        </>
      );
    }

  export default PostsPage;
