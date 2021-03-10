import React from 'react';
import Header from 'component/header/index.jsx'
import Sidebar from 'component/sidebar/index.jsx'

class Layout extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row clearfix">
                        <Sidebar/>
                        {this.props.children}
                    </div>
                </div>

            </div>
        )
    }
}

export default Layout;