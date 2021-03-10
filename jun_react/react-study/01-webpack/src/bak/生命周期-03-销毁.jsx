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

    componentWillUnmount(){
        console.log('componentWillUnmount')
    }

    render() {
        console.log('render');
        return <div>APP {this.props.name}
        </div>
    }
}

class Father extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'name': '哈哈',
            'childShowFlag': true
        }
    }

    destroyChild(){
        this.setState({
            'childShowFlag': false
        })
    }

    render() {
        return <div>
            {
                this.state.childShowFlag ? <Child name={this.state.name}/> : null
            }
            <button onClick={()=>this.destroyChild()}>销毁子组件</button>
        </div>
    }
}

ReactDOM.render(
    // 容器式组件
    <Father/>,
    document.getElementById('app')
);