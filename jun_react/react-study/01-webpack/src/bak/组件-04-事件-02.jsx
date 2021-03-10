import React from 'react';
import ReactDOM from 'react-dom';

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '里目',
            age: 18
        };
    }

    render() {
        return <div>
            <p>I am {this.state.name}，我{this.state.age}岁。</p>
            <button onClick={() => this.add()}>加1岁</button>
        </div>
    }

    add() {
        this.setState({
            age: this.state.age + 1
        });
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app')
);