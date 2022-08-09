import { createPostThunk } from '../../store/post'
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './postform.css'

function CreatePostsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)

    const[userId] = useState(user.id);
    const [caption, setCaption] = useState("");
    const [post_pic, setPost_pic] = useState("");
    const [title, setTitle] = useState("");

    let errorsObj = {};
    const [errors, setErrors] = useState(errorsObj);

    const updatePic = (e) => setPost_pic(e.target.value)
    const updateCaption = (e) => setCaption(e.target.value);
    const updateTitle = (e) => setTitle(e.target.value)


    const handleSubmit = async (e) => {
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

    if(!error) {
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
    }


      return (
        <form className='postForm'>
          <div className='formDiv'>
          <div>
          <h1 className='postFormHeader'>Create new post</h1>
          </div>
          <div className="error">
          {Object.values(errors).map((error, idx) => <div><li key={idx}>{error}</li></div>)}
          </div>
          <div className='formWrapper'>
          <label><b>Title</b></label>
          <input type="text" value={title} onChange={updateTitle}/>
          <label><small>required</small></label>
          </div>
          <div className='formWrapper'>
          <label><b>Post Pic</b></label>
          <input type="text" value={post_pic} onChange={updatePic}/>
          <label><small>required</small></label>
          </div>
          <div className='formWrapper'>
          <label><b>Caption</b></label>
          <input type="text" value={caption} onChange={updateCaption}/>
          <label><small>required</small></label>
          </div>
          <div className='button'>
          <button type="submit" onClick={handleSubmit}>Post</button>
          </div>
          </div>
        </form>
      );

    }

    export default CreatePostsPage;
