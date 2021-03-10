import axios from 'axios';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const ERROR = 'error';

let initState = {redirectTo: '', username: '', password: '', type: ''};

export function user(state = initState, action) {
    console.log('action.payload',action.payload);
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state, msg: '注册成功',

                redirectTo: getRedirectPath(action.payload),
                ...action.payload
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                redirectTo: getRedirectPath({type: 'employee'}),
                ...action.payload
            };
        case ERROR:
            return {...state, error: action.error};
        default:
            return state;
    }
}

function getRedirectPath({type, avator}) {
    let url = type === 'boss' ? '/boss' : '/employee';
    if (!avator) {
        url += '/info'
    }
    return url;
}

function registerSuccess(data) {
    return {type: REGISTER_SUCCESS, payload: data}
}

function loginSuccess({username, type}) {
    return {type: LOGIN_SUCCESS, payload: {username, type}}
}

function errorMsg(error) {
    return {type: ERROR, error}
}

export function githubLoginSuccess(response) {
    let code = response.code;
    let checkLoginURL = '/github/callback?code=' + code;

    console.log('code', code, 'checkLoginURL', checkLoginURL);
    // 调用后台，设置cookie等
    return dispatch => axios.get(checkLoginURL)
        .then(res => {
                let data = res.data.data;
                console.log('后端返回', data);
                dispatch(loginSuccess({username: data.username, type: 'employee'}));
            }
        )
}

export function register({username, password, type, confirmPassword}) {
    return dispatch => {
        axios.post('/register', {username, password, type})
            .then(res => {
                if (res.data.status === 200) {
                    console.log('注册成功', res);
                    dispatch(
                        registerSuccess({username, password, type})
                    );
                }
                else {
                    console.log('注册失败', res);
                    dispatch(
                        errorMsg(res.data.error)
                    );
                }
            })
    }
}
