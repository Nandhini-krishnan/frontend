import * as types from './actionTypes';
import axios from 'axios';

const setUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});

const userDeleted = () => ({
    type: types.DELETE_USER,
});

const userAdded = () => ({
    type: types.ADD_USER,
});

const userUpdated = () => ({
    type: types.UPDATE_USER,
});

const setSingleUser= (user) => ({
    type: types.GET_USER_BY_ID,
    payload : user,
});


export const getUsers = () => {
    return async function (dispatch) {
        const response = await axios.get("http://localhost:5000/users/");
        if (response.status === 200) {
            dispatch(setUsers(response.data));
        }
    }
}

export const deleteUser = (id) => {
    return async function (dispatch) {
        const response = await axios.delete(`http://localhost:5000/users/${id}`);
        if (response.status === 200) {
            alert("User deleted successfully");
            dispatch(userDeleted());
            dispatch(getUsers());
        }
    }
}

export const addUser = (user) => {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:5000/users/', user);
        if (response.status === 200) {
            alert("user created successfully");
            dispatch(userAdded());
        }
    }
}

export const getUserById = (id) => {
    return async function (dispatch) {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        if (response.status === 200) {
            dispatch(setSingleUser(response.data.user));
        }
    }
}

export const updateUser = (id, user) => {
    return async function (dispatch) {
        const response = await axios.put(`http://localhost:5000/users/${id}`, user);
        if (response.status === 200) {
            alert("User updated successfully");
            dispatch(userUpdated());
        }
    }
}

