import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    onInputChange(e) {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        console.log(inputName, inputValue);
        this.setState({
            [inputName]: inputValue
        });
    }

    render() {
        return <div className="col-md-4 col-md-offset-4">
            <form>
                <div className="form-group">
                    <input type="username"
                           name="username"
                           onChange={(e) => this.onInputChange(e)}
                           className="form-control"
                           placeholder="账号"/>
                </div>
                <div className="form-group">
                    <input type="password"
                           name="password"
                           onChange={(e) => this.onInputChange(e)}
                           className="form-control"
                           placeholder="密码"/>
                </div>
                <button type="submit" className="btn btn-default">登录</button>
            </form>
        </div>
    }
}

export default Login;