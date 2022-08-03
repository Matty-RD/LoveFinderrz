import { updatePostThunk } from '../../store/post'
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";

function EditPostsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const {id} = useParams();
    const post = useSelector(state => state.posts)
    const singlePost = post[id]

    const [post_pic, setPost_pic] = useState(singlePost.post_pic);
    const [caption, setCaption] = useState(singlePost.caption);
    const [title, setTitle] = useState(singlePost.title);


    const updatePost_pic = (e) => setPost_pic(e.target.value);
    const updateCaption = (e) => setCaption(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);

    const handleSubmit = (e) => {
      e.preventDefault();

      const updatedPost = {
        title,
        post_pic,
        caption
      };
      dispatch(updatePostThunk(updatedPost, id));
    history.push("/posts/");
  }

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/posts/");
  };


  return (
    <form>
      <h1>Edit your POST!</h1>
      <input type="text" className='inputs' placeholder="Title" value={title} onChange={updateTitle}/>
      <input type="text" className='inputs' placeholder="Post Picture" value={post_pic} onChange={updatePost_pic}/>
      <input type="text" className='inputs' placeholder="Caption" value={caption} onChange={updateCaption}/>
      <button type="submit" onClick={handleSubmit}>POST THAT POST HOMIE</button>
      <button type="button" onClick={handleCancelClick}>Cancel</button>
    </form>
  );

}

export default EditPostsPage;
