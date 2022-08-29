const GET_ALL_MESSAGES = 'messages/GET_ALL_MESSAGES';


const getAllMessages = (messages) => ({
    type: GET_ALL_MESSAGES,
    messages,
  });

  export const getAllMessagesThunk = () => async(dispatch) => {
    const response = await fetch('/api/messages/')
    const data = await response.json();
    dispatch(getAllMessages(data.messages))
    return data.messages
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
            default:
                return state;
        }
    }
