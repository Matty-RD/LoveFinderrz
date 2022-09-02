const UPDATE_USER = 'user/UPDATE_USER';

const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
})

export const updateUserThunk = (user, id) => async(dispatch) => {
  const response = await fetch(`/api/users/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const user = await response.json();
      dispatch(updateUser(user));
      return user;
    }
  }

const initialState = {}

export const userReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
            case UPDATE_USER:
              newState = {...state, [action.user.id]: action.user,};
                return newState
            default:
                return state;
        }
    }
