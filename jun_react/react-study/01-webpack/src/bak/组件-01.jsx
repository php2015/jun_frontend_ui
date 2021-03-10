import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Reno Chou.'
        }
    }

    render() {
        return <div>I am {this.state.name}.</div>
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);