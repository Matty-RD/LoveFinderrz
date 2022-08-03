const GET_ALL_MATCHES = 'matches/GET_ALL_MATCHES';
const CREATE_MATCH = 'matches/CREATE_MATCH';
const UPDATE_MATCH = 'matches/UPDATE_MATCH';
const DELETE_MATCHES = 'matches/DELETE_MATCHES'

const getAllMatches = (matches) => ({
    type: GET_ALL_MATCHES,
    matches,
  });

const createMatch = (match) => ({
    type: CREATE_MATCH,
    match,
    })

const updateMatch = (match) => ({
  type: UPDATE_MATCH,
  match,
})

const deleteMatches = deleteMatch => ({
  type: DELETE_MATCHES,
  deleteMatch,
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

export const updateMatchThunk = (match, id) => async(dispatch) => {
  const response = await fetch(`/api/matches/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(match),
    });
    if (response.ok) {
      const match = await response.json();
      dispatch(updateMatch(match));
      return match;
    }
  }

export const deleteMatchesThunk = (deleteMatch, id) => async(dispatch) => {
  const res = await fetch(`/api/matches/${id}`, {
      method: 'DELETE',
  });

  if (res.ok) {
      const deleted = await res.json(deleteMatch);
      dispatch(deleteMatches(deleted));
      return deleted
  }
}

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
            case UPDATE_MATCH:
              newState = {...state, [action.match.id]: action.match,};
                return newState
            case DELETE_MATCHES:
              delete newState[action.deleteMatch.id];
              return newState
            default:
                return state;
        }
    }
