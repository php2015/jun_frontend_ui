import axios from "axios";

const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function userReducer(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, redirectTo: '/'};
        default:
            return state;
    }
}

export function login({username, password}) {
    return dispatch => {
        axios.post('/login', {username, password})
            .then(res => {
                console.log(res.data);
                if (res.data.code === '200') {
                    localStorage.setItem('token', res.data.data);
                    console.log('hahah');
                    dispatch({type: LOGIN_SUCCESS})
                }
            })
    }
}