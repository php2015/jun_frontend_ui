import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Link, Route, Switch} from 'react-router-dom'

class A extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                A <br/>
                <Switch>
                    <Route exact path={`${this.props.match.path}`} render={
                        (route) => {
                            return <div>当前组件是不带参数的A</div>
                        }
                    }>
                    </Route>
                    <Route exact path={`${this.props.match.path}/sub`} render={
                        (route) => {
                            return <div>当前组件是A组件的子路径sub</div>
                        }
                    }>
                    </Route>
                    <Route exact path={`${this.props.match.path}/:id`} render={
                        (route) => {
                            return <div>当前组件是带参数的A 参数：{route.match.params.id}</div>
                        }
                    }>
                    </Route>
                </Switch>
            </div>
        )
    }
}

class B extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>B</div>
        )
    }
}

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Link to="/a">不带参数的组件A</Link>
                <br/>
                <Link to="/a/123">带参数的组件A</Link>
                <br/>
                <Link to="/a/sub">A组件的子路径</Link>
                <br/>
                <Link to="/b">组件B</Link>
                {this.props.children}
            </div>
        )
    }
}

ReactDOM.render(
    <Router>
        <Wrapper>
            <Route path="/a" component={A}/>
            <Route path="/b" component={B}/>
        </Wrapper>
    </Router>,
    document.getElementById('app')
);