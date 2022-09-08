const GET_ALL_MESSAGES = 'messages/GET_ALL_MESSAGES';
const CREATE_MESSAGE = 'messages/CREATE_MESSAGE';
const DELETE_MESSAGES = 'messages/DELETE_MESSAGES'

const getAllMessages = (messages) => ({
    type: GET_ALL_MESSAGES,
    messages,
  });

const createMessages = (createdMessage) => ({
    type: CREATE_MESSAGE,
    createdMessage,
})

const deleteMessage = (id) => ({
  type: DELETE_MESSAGES,
  id,
})

  export const getAllMessagesThunk = () => async(dispatch) => {
    const response = await fetch(`/api/messages/`)
    const data = await response.json();
    dispatch(getAllMessages(data.messages))
    return data.messages
}

export const createMessageThunk = (createdMessage) => async(dispatch) => {
    const response = await fetch('/api/messages/new', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdMessage),
    });
    if (response.ok) {
      const createdmessage = await response.json();
      dispatch(createMessages(createdmessage));
      return createdmessage;
    }
  };



export const deleteMessageThunk = (id) => async(dispatch) => {
  const res = await fetch(`/api/messages/${id}`, {
      method: 'DELETE',
  });
  if (res.ok) {
      const deleted = await res.json();
      if(deleted.deleted === "message") {
        dispatch(deleteMessage(id));
      } else {
        const error = await res.json()
        console.log(error)
      }
      return deleted
  }
}

const initialState = {}

export const messagesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_ALL_MESSAGES:
            action.messages.forEach((message) => {
                return newState[message.id] = message;
            })
            return newState;
        case CREATE_MESSAGE:
            if (!state[action.createdMessage.id]) {
                newState = {
                    ...state,
                    [action.createdMessage.id]: action.createdMessage,
                };
            }
            return newState;
          case DELETE_MESSAGES:
            delete newState[action.id];
            return newState
            default:
                return state;
        }
    }
