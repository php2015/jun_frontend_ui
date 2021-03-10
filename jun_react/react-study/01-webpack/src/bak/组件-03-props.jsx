import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>I am {this.props.name}.</div>
    }
}

ReactDOM.render(
    <Component name="哈哈"/>,
    document.getElementById('app')
);