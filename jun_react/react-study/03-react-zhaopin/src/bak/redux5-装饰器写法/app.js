import React from 'react';
import {connect} from 'react-redux';
import {add, addAsync, sub} from './redux.index.js'

@connect(
    // 你要state里的什么属性放到props
    (state) => ({count: state}),
    // 你要哪些方法放到props里，会自动dispatch
    {add, sub, addAsync}
)
class App extends React.Component {
    render() {
        const count = this.props.count;
        const add = this.props.add;
        const sub = this.props.sub;
        const addAsync = this.props.addAsync;

        return (<div>
            <h1>count: {count}</h1>
            <button onClick={add}>加1</button>
            <button onClick={sub}>减1</button>
            <button onClick={addAsync}>异步加1</button>
        </div>)
    }
}

export default App;
