import React from 'react';

export default class About extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.eventEmitter.emit('navigateScreen', {newScreenIndex: 2});
    }

    render() {
        return (
            <h1>About us!</h1>
        );
    }
}
