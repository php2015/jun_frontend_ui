import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>{this.props.children}</h1>
    }
}

ReactDOM.render(
    // 容器式组件
    <Component>
        <div>aaa <a href="#">link</a></div>
    </Component>,
    document.getElementById('app')
);