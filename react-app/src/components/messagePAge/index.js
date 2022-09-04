import { getAllMessagesThunk, createMessageThunk, deleteMessageThunk } from "../../store/message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import './messaging.css'


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
            if(user.id === messageInfo.sender) {
              return (
                <>
              <div className="messageBar">
                <div className="nameBlock">
                  <h3>{messageInfo.senderInfo.username}</h3>
                </div>
                <div className="messageBlock">
                  <p>{messageInfo.message}</p>
                </div>
                <div className="timeBlock">
                    {messageInfo.created_at.substring(20,25)}
                </div>
                <div className="deleteBlock">
                <button className="deleteBlockButton" onClick={() => deleteMessage(messageInfo.id)}>Delete</button>
                </div>
              </div>
              </>
            )} else {
              return (
                <>
              <div className="messageBar">
                <div className="nameBlock">
                  <h3>{messageInfo.senderInfo.username}</h3>
                </div>
                <div className="messageBlock">
                  <p>{messageInfo.message}</p>
                </div>
                <div className="timeBlock">
                    {messageInfo.created_at.substring(20,25)}
                </div>
                <div className="deleteBlock2">
                </div>
              </div>
              </>
            )}
          })}
          <div className="messageBar">
          <input className="messageInput" type="text" value={message} onChange={updateMessage}/>
          <button type="submit" onClick={handleSubmit}>Send</button>
          </div>
        </div>
      );
  }


  export default MessagesPage;
