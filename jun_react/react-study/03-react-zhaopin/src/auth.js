export function auth(state={isAuth: false, user:'哈哈'}, action) {
    switch (action.type) {
        case 'login':
            console.log('login');
            return {...state, isAuth: true};
        case 'logout':
            console.log('logout');
            let a = {...state, isAuth: false};
            console.log(a);
            return a;
        default:
            return state;
    }
}

export function login() {
    console.log('login');
    return {type: 'login'}
}

export function logout() {
    console.log('logout');

    return {type: 'logout'}
}