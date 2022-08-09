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

    let errorsObj = {};
    const [errors, setErrors] = useState(errorsObj);

    const updatePost_pic = (e) => setPost_pic(e.target.value);
    const updateCaption = (e) => setCaption(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value);

    const handleSubmit = (e) => {
      e.preventDefault();

      let error = false;
      errorsObj = {...errorsObj};
      if(title === '') {
        errorsObj.title = "Requires Title!";
        error = true;
      } else if (title.length > 25) {
        errorsObj.title = "Titles must be longer than 5 characters, but shorter than 25";
        error = true;
      }
      if (!post_pic.includes(".jpg") && !post_pic.includes(".png") && !post_pic.includes(".JPG") && !post_pic.includes(".PNG") && !post_pic.includes("image") && !post_pic.includes(".gif") && !post_pic.includes(".GIF")) {
        errorsObj.post_pic = "Image URL must be in .jpg or .png or .gif format"
        error = true
      }
      else if (post_pic.length < 10) {
        errorsObj.post_pic = "Image URL must be at least 10 characters."
        error = true
      }
      if(caption === '') {
        errorsObj.caption = "Requires a caption!";
        error = true;
      } else if (caption.length < 5 || caption.length > 200) {
        errorsObj.caption = "captions must be longer than 5 characters and shorter than 200";
        error = true;
      }
      setErrors(errorsObj);
      console.log(errorsObj);

      if(!error) {
      const updatedPost = {
        title,
        post_pic,
        caption
      };
      dispatch(updatePostThunk(updatedPost, singlePost.id));
    history.push("/posts/");
  }
}

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/posts/");
  };

  return (
    <form>
      <div>
      <div>
      <h1>Edit your POST!</h1>
      </div>
      <div className="error">
      {Object.values(errors).map((error, idx) => <div><li key={idx}>{error}</li></div>)}
      </div>
      <div>
      <label><b>Title</b></label>
      <input type="text" className='inputs' value={title} onChange={updateTitle}/>
      <label><small>required</small></label>
      </div>
      <div>
      <label><b>Post Pic</b></label>
      <input type="text" className='inputs' value={post_pic} onChange={updatePost_pic}/>
      <label><small>required</small></label>
      </div>
      <div>
      <label><b>Caption</b></label>
      <input type="text" className='inputs' value={caption} onChange={updateCaption}/>
      <label><small>required</small></label>
      </div>
      <div className='buttonDiv'>
      <button className="button" type="submit" onClick={handleSubmit}>Post</button>
      <button className="button" type="button" onClick={handleCancelClick}>Cancel</button>
      </div>
      </div>
    </form>
  );

}

export default EditPostsPage;
