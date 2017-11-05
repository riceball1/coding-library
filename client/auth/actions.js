import axios from 'axios'

import {tokenName} from '../shared/constants'

const baseUrl = '/api/auth';

const apiUrl = {
    signup: `${baseUrl}/signup`,
    login: `${baseUrl}/login`
};

export const types = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT: 'LOGOUT'
};

export const signup = ({username, password}) => dispatch => {

    axios.post(apiUrl.signup, {username, password}).then(response => {
        const {status} = response;
        const {token,user} = response.data;

        if (status && token) {
            localStorage.setItem(tokenName, token);

            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: data
            })
        }

    });
};

export const login = (username, password) => dispatch => {


    axios.post(apiUrl.login, {username, password}).then(response => {
        const {status, data} = response;

        if (status && token) {
            localStorage.setItem(tokenName, data.token);

            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: data
            })
        }

    });
};

export const logout = () => {
    localStorage.removeItem(tokenName);

    return dispatch => ({
        type: types.LOGOUT
    })
};