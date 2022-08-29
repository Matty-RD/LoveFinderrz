import { getAllMessagesThunk } from "../../store/message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";

function MessagesPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllMessagesThunk());
      }, [dispatch]);

      const messagesObject = useSelector((state) => state.messages);
      const messages = Object.values(messagesObject);
      console.log(messages)

      return (
        <div>
          <h1>Messages!</h1>
          {messages.map(messageInfo =>{
            return (
            <>
            <h2>{messageInfo.sender}</h2>
            <h2>{messageInfo.receiver}</h2>
            <h2>{messageInfo.message}</h2>
            </>
          )})}
        </div>
      );
    }


  export default MessagesPage;
