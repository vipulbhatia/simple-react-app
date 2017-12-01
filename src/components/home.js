import React from 'react';
import { store } from '../redux';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTweet: '',
            tweets: store.getState().tweets
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
                    {this.state.tweets.map((v, k) => (<h3 key={k}>{v}</h3>))}
                </div>
                <input type="text" onChange={(e) => this.setState({currentTweet: e.target.value})} />
            <input type="button" onClick={() => store.dispatch({type: 'ADD_TWEET', payload: this.state.currentTweet})} value="+" />
            </div>
        );
    }

    componentDidMount() {
        this.unsubscribeFromStore = store.subscribe(() => {
            console.log(store.getState());
            this.setState({tweets: store.getState().tweets});
        });

        /*store.dispatch({type: 'CHANGE_NAME', payload: 'BILL'});
        store.dispatch({type: 'ADD_TWEET', payload: 'another hello!!'});
        store.dispatch({type: 'CHANGE_NAME', payload: 'WILL'});
        store.dispatch({type: 'ADD_TWEET', payload: 'another hello from WILL!!'});*/
    }

    componentWillUnMount() {
        this.unsubscribeFromStore();
    }
}
