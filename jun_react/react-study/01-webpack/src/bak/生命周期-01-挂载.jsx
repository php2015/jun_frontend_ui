import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');
    }
    componentWillMount(){
        console.log('componentWillMount')
    }
    componentDidMount(){
        console.log('componentDidMount')
    }

    render() {
        console.log('render');
        return <div>APP</div>
    }
}

ReactDOM.render(
    // 容器式组件
    <App/>,
    document.getElementById('app')
);