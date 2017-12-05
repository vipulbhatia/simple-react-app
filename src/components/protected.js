import React from 'react';

export default class Protected extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.eventEmitter.emit('navigateScreen', {newScreenIndex: 1});
    }

    render() {
        return (
            <h1>Protected Component!</h1>
        )
    }
}
