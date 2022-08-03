const GET_ALL_MATCHES = 'matches/GET_ALL_MATCHES';
const CREATE_MATCH = 'matches/CREATE_MATCH';

const getAllMatches = (matches) => ({
    type: GET_ALL_MATCHES,
    matches,
  });

const createMatch = (match) => ({
    type: CREATE_MATCH,
    match,
    })


export const getAllMatchesThunk = () => async(dispatch) => {
    const response = await fetch('/api/matches/')
    const data = await response.json();
    dispatch(getAllMatches(data.matches))
    return data.matches
}

export const createMatchThunk = (match) => async(dispatch) => {
    const response = await fetch('/api/matches/create/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(match),
    });
    if (response.ok) {
      const newMatch = await response.json();
      dispatch(createMatch(newMatch));
      return newMatch;
    }
  };

const initialState = {}

export const matchesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_ALL_MATCHES:
            action.matches.forEach((match) => {
                return newState[match.id] = match;
            })
            return newState;
            case CREATE_MATCH:
              return { ...state, [action.match.id]: {...action.match}}
            default:
                return state;
        }
    }
