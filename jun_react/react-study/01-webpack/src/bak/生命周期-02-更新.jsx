import React from 'react';
import ReactDOM from 'react-dom';

class Child extends React.Component {
    constructor(props) {
        console.log('constructor');
        super(props);
    }

    componentWillMount() {
        console.log('componentWillMount')
    }

    componentDidMount() {
        console.log('componentDidMount')
    }

    componentWillReceiveProps() {
        console.log('componentWillReceiveProps')
    }

    // 更新时，从父组件接受props，就会触发 
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true
    }

    componentWillUpdate() {
        console.log('componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
    }

    render() {
        console.log('render');
        return (<div>APP {this.props.name}</div>)
    }
}

class Father extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'name': '哈哈'}
    }

    changeState() {
        console.log('父组件更新:');
        this.setState({'name': '呵呵'});
    }

    render() {
        return <div><Child name={this.state.name}/>
            <button onClick={() => this.changeState()}>修改父组件的值</button>
        </div>
    }
}

ReactDOM.render(
    <Father/>,
    document.getElementById('app')
);