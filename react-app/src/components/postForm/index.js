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
    if (!post_pic.includes(".jpg") && !post_pic.includes(".png") && !post_pic.includes(".JPG") && !post_pic.includes(".PNG") && !post_pic.includes("image") && !post_pic.includes(".gif") && !post_pic.includes(".GIF")) {
      errorsObj.post_pic = "Image URL must be in .jpg or .png or .gif format"
      error = true
    }
    else if (post_pic.length < 10) {
      errorsObj.post_pic = "Image URL must be at least 10 characters."
      error = true
    }
    if(title === '') {
      errorsObj.caption = "Requires Title!";
      error = true;
    } else if (title.length > 25) {
      errorsObj.title = "Titles must be longer than 5 characters, but shorter than 25";
      error = true;
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
        <form>
          <div>
          <h2>Create new post</h2>
          {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
          <input type="text" placeholder="Title" value={title} onChange={updateTitle}/>
          <input type="text" placeholder="Post Pic" value={post_pic} onChange={updatePic}/>
          <input type="text" placeholder="Caption" value={caption} onChange={updateCaption}/>
          <button className="button" type="submit" onClick={handleSubmit}>Post</button>
          </div>
        </form>
      );

    }

    export default CreatePostsPage;
