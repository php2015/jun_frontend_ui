import React from 'react';
import ReactDOM from 'react-dom';
import {Button, List} from 'antd-mobile';

const Item = List.Item;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: ['张三', '李四', '王五']
        }
    }

    addName() {
        this.setState({
            //
            names: [...this.state.names, Math.random()]
        })

    }

    render() {
        return (<div>
            <List renderHeader="名字列表">
                {
                    this.state.names.map(name => {
                        return <Item key={name}>{name}</Item>
                    })
                }
            </List>
            <Button type="primary" onClick={() => this.addName()}>添加名字</Button>
        </div>)
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
