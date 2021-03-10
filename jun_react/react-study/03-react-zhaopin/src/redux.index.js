// 定义reducer
export function counter(state = 0, action) {
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        default:
            return 0;
    }
}
export function add() {
    return {type:'add'}
}
export function sub() {
    return {type:'sub'}
}

export function addAsync() {
    return dispatch => {
        setTimeout(
            () => dispatch({type: 'add'}),
            500
        );
    }
}