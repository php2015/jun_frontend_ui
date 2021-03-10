import React from 'react';
import ReactDOM from 'react-dom';

// 组件
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Reno Chou.'
        }
    }

    render() {
        setTimeout(()=> this.setState({
            name:'haha'
        }),2000);
        return <div>I am {this.state.name}.</div>
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);