import React from 'react';

class App extends React.Component {
    render() {
        const store = this.props.store;
        const add = this.props.add;
        return (<div>
            <h1>count: {store.getState()}</h1>
            <button onClick={() => store.dispatch(add())}>加1</button>
        </div>)
    }
}

export default App;
