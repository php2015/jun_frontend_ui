import React from 'react';
import {createStore} from 'redux';

// 1. 通过reducer建立store
function counter(state = 0, action) {
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        default:
            return 0;
    }
}

// 新建store
const store = createStore(counter);

// 监听state变化
function listener(){
    const count = store.getState();
    console.log('当前状态', count);
}
store.subscribe(listener);

// 派发事件，传递action
store.dispatch({type: 'add'});
store.dispatch({type: 'sub'});
store.dispatch({type: 'sub'});
store.dispatch({type: 'add'});

