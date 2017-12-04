import React from 'react';
import { connect } from 'react-redux';
import { addTweet } from '../redux';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTweet: ''
        }
    }

    componentWillMount() {
        console.log(this.props);
        this.props.eventEmitter.emit('navigateScreen', {newScreenIndex: 1});
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.tweets.map((v, k) => (<h3 key={k}>{v}</h3>))}
                </div>
                <input type="text" onChange={(e) => this.setState({currentTweet: e.target.value})} />
                <input type="button" onClick={() => this.props.addTweet(this.state.currentTweet)} value="+" />
            </div>
        );
    }
}

export default connect(
    state => ({ tweets: state.tweets }),
    { addTweet }
)(Home);
