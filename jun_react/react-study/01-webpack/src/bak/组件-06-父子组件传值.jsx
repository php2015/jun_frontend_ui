import React from 'react';
import ReactDOM from 'react-dom';

class Father extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: '#ddd'
        }
    }

    changeColorParent(color) {
        this.setState({
            bgColor: color
        });
    }

    render() {
        return <div style={{background: this.state.bgColor}}>
            <Child bgColor={this.state.bgColor}
                   changeColorProp={(color) => this.changeColorParent(color)}/>
        </div>
    }
}

class Child extends React.Component {
    constructor(props) {
        super(props);
    }

    changeColor(e) {
        // 读取父组件所使用的changeColorProp属性
        this.props.changeColorProp('red');
    }

    render() {
        return <div>
            <h1>父组件的背景色：{this.props.bgColor}</h1>
            <button onClick={(e) => this.changeColor(e)}>改变颜色</button>
        </div>
    }
}

ReactDOM.render(
    // 容器式组件
    <Father/>,
    document.getElementById('app')
);