import axios from 'axios';

export const CancelToken = axios.CancelToken;
let cancel;

// Actions

export const userLoading = () => ({
    type: 'USER_LOAD_START'
});

export const userLoaded = (user) => ({
    type: 'USER_LOAD_SUCCESS',
    payload: user,
});

export const userLoadingError = (reason) => ({
    type: 'USER_LOAD_ERROR',
    payload: reason,
});

export const userInterruptLoading = () => ({
    type: 'USER_LOAD_INTERRUPT',
});

export const handleChangeColor = (colorValue) => ({
  type: 'CHANGE_THEME',
  payload: colorValue,
});

export const fetchUsers = () => async (dispatch) => {
    dispatch(userLoading());
    try {
      const response = await axios.get('https://randomuser.me/api/', {
        cancelToken: new CancelToken( function executor(c) {
          cancel = c;
        })
      });
      console.log(response);
      const user = response.data.results[0];
      dispatch(userLoaded(user));
    } catch (error) {
      if (axios.isCancel(error)) {
        const errorMessage = error.message || 'Server Error';
        dispatch(userLoadingError(errorMessage));
        console.log(error.message);
      } 
      else {
        dispatch(userLoadingError(error.message || error || error.response.data));
      }
      console.error(error.message || error || error.response.data);
    }
}

export const interruptRequest = () => (dispatch) => {
  cancel('Operation canceled by the user.');
  dispatch(userInterruptLoading());
}


// Reducer
export const usersReducer = (state = userState, action) => {

    switch(action.type) {
        case 'USER_LOAD_START': {
            return {
                ...state,
                loading: true,
            }
        }
        case 'USER_LOAD_SUCCESS': {
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload
            }
        }
        case 'USER_LOAD_ERROR': {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
        case 'USER_LOAD_INTERRUPT': {
            return {
                ...state,
                data: null
            }
        }
        case 'CHANGE_THEME': {
            return {
                ...state,
                color: action.payload
            }
        }
        default: return state;
    }
};

export const userState = {
    data: null, 
    error: null,
    color: 'coral',
    loading: false,
};