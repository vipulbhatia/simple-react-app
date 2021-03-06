import React from 'react';
import { connect } from 'react-redux';
import { login } from '../redux';

class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props);
        this.props.eventEmitter.emit('navigateScreen', {newScreenIndex: 2});
    }

    render() {
        //const LoginButton = this.props.user.loggedIn ? (<h1>About us!</h1>) : (<input type="button" value="login" onClick={() => this.props.login()} />);
        return (
            <div>
                <h1>About Us!</h1>
                <input type="button" value="login" onClick={() => this.props.login()} />
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { login }
)(About);
