import { createPostThunk } from '../../store/post'
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function CreatePostsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)

    const[userId] = useState(user.id);
    const [caption, setCaption] = useState("");
    const [post_pic, setPost_pic] = useState("");
    const [title, setTitle] = useState("");

    const updatePic = (e) => setPost_pic(e.target.value)
    const updateCaption = (e) => setCaption(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value)


    const handleSubmit = async (e) => {
      e.preventDefault();

      const createdPost = {
        userId,
        caption,
        post_pic,
        title
      };

      let newPost = await dispatch(createPostThunk(createdPost))
          if(newPost) {
          history.push('/posts/')
        }
      }


      return (
        <form>
          <h2>Create new post</h2>
          <input type="text" placeholder="Title" value={title} onChange={updateTitle}/>
          <input type="text" placeholder="Post Pic" value={post_pic} onChange={updatePic}/>
          <input type="text" placeholder="Caption" value={caption} onChange={updateCaption}/>
          <button className="button" type="submit" onClick={handleSubmit}>Post</button>
        </form>
      );

    }

    export default CreatePostsPage;
