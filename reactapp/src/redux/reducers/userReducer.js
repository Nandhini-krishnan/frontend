import * as types from '../actions/actionTypes';

const initialState = {
    users: [],
    user: {}
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return { ...state, users: action.payload };
        case types.DELETE_USER:
        case types.ADD_USER:
        case types.UPDATE_USER:
            return { ...state };
        case types.GET_USER_BY_ID:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export default userReducer;