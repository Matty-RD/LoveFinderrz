import { getAllPostsThunk, deletePostThunk } from "../../store/post";
import { useDispatch, useSelector} from "react-redux";
import { useEffect} from "react";
import { useHistory } from "react-router-dom"

function PostsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const postsObject = useSelector((state) => state.posts);
    const posts = Object.values(postsObject);

    useEffect(() => {
        dispatch(getAllPostsThunk());
      }, [dispatch]);

    const DeleteClick = async(e) => {
        e.preventDefault();
        const buttonData = Number(e.target.id);
        for (const post of posts) {
          if (post.id === buttonData) {
            dispatch(deletePostThunk(post, buttonData))
            await dispatch(getAllPostsThunk());
            history.push("/posts/")
          }
        }
      }

    const EditClick = (e) => {
      e.preventDefault();
      const buttonData = Number(e.target.id);
          history.push(`/posts/edit/${buttonData}`)
      }

      return (
        <>
        <div>
        { posts.map(post =>{
        return (
        <div key={post.id} style={{border:'solid'}}>
        <h1>Posted by: {post.user.username}</h1>
        <h3>Title: {post.title}</h3>
        <img alt='' src={post.post_pic} width="400" height="280" className="postpic"/>
        <p>caption: {post.caption}</p>
        <button type="button" id={post.id} onClick={DeleteClick}>Delete</button>
        <button type="button" id={post.id} onClick={EditClick}>Edit</button>
        </div>
        )})}
        </div>
        </>
      );
    }

  export default PostsPage;
