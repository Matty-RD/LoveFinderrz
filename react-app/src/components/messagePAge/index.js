import { getAllMessagesThunk, createMessageThunk, deleteMessageThunk } from "../../store/message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";


function MessagesPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
      dispatch(getAllMessagesThunk());
    }, [dispatch]);

    const messagesObject = useSelector((state) => state.messages);
    const messages = Object.values(messagesObject);
    const user = useSelector((state) => state.session.user)
    const sender = user.id;
    const receiver = Number(id);


    const filteredMessages = messages.filter(message => {
      if(message.sender === sender && message.receiver === receiver) {
        return message
      } else if (message.sender === receiver && message.receiver === sender) {
        return message
      }
    })

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
              setMessage("")
            history.push(`/messages/${id}`)
          }
        }

        const deleteMessage = async(messageId) => {
          await dispatch(deleteMessageThunk(messageId))
          history.push(`/messages/${id}`)
        }

      return (
        <div>
          <h1>Messages!</h1>
          {filteredMessages.map(messageInfo =>{
            return (
              <>
            <h2>{messageInfo.sender}</h2>
            <h2>{messageInfo.receiver}</h2>
            <h2>{messageInfo.message}</h2>
            <button onClick={() => deleteMessage(messageInfo.id)}>Delete</button>
            </>
          )})}
          <input type="text" value={message} onChange={updateMessage}/>
          <button type="submit" onClick={handleSubmit}>Post</button>
        </div>
      );
  }


  export default MessagesPage;
