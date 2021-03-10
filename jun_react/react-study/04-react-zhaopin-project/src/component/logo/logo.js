import logoImg from './favicon.ico';
import React from 'react';
import './logo.css'

class Logo extends React.Component {
    render() {
        return <div className="logo">
            <img src={logoImg} alt="logo"/>
        </div>
    }
}

export default Logo;