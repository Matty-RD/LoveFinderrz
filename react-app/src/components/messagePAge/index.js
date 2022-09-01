import { getAllMessagesThunk, createMessageThunk, deleteMessageThunk } from "../../store/message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";


function MessagesPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getAllMessagesThunk());
      }, [dispatch]);

      const messagesObject = useSelector((state) => state.messages);
      const messages = Object.values(messagesObject);
      const user = useSelector((state) => state.session.user)
      const sender = user.id;
      const receiver = 3;
      const [message, setMessage] = useState("");
      const updateMessage = (e) => setMessage(e.target.value);

      const handleSubmit = async (e) => {
          e.preventDefault();
          const createdMessage = {
            sender,
            receiver,
            message,
          };

          let newMessage = await dispatch(createMessageThunk(createdMessage))
              if(newMessage) {
              history.push('/messages/')
            }
          }

          const deleteMessage = async(id) => {
            await dispatch(deleteMessageThunk(id))
            history.push('/messages/')
          }

      return (
        <div>
          <h1>Messages!</h1>
          <input type="text" value={message} onChange={updateMessage}/>
          <button type="submit" onClick={handleSubmit}>Post</button>
          {messages.map(messageInfo =>{
            return (
            <>
            <h2>{messageInfo.sender}</h2>
            <h2>{messageInfo.receiver}</h2>
            <h2>{messageInfo.message}</h2>
            <button onClick={() => deleteMessage(messageInfo.id)}>Delete</button>
            </>
          )})}
        </div>
      );
  }


  export default MessagesPage;
