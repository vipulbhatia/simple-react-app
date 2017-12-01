import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/home';
import About from './components/about';
import SideMenu from './components/sidemenu';
import { EventEmitter } from 'events';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenIndex: 1
        }
    }

    componentWillMount() {
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.addListener('navigateScreen', ({newScreenIndex}) => {
            this.updateScreen({newScreenIndex});
        });
    }

    updateScreen = ({newScreenIndex}) => {
        this.setState({screenIndex: newScreenIndex});
    }

    render() {
        return (
                <div className="display-table">
                    <div className="display-table-row">
                        <div className="display-table-cell" id="side-menu-container">
                            <SideMenu screenIndex={this.state.screenIndex}/>
                        </div>
                        <div className="display-table-cell" id="content">
                            <Switch>
                                <Redirect exact from="/" to="/home" />
                                <Route exact path="/home" render={() => <Home eventEmitter={this.eventEmitter} {...this.props} />} />
                                <Route exact path="/about" render={() => <About eventEmitter={this.eventEmitter} {...this.props} />} />
                            </Switch>
                        </div>
                    </div>
                </div>
        );
    }
}

const routerRenderer = () => {
    return (
        <Router>
            <Route path="/" component={App}>
            </Route>
        </Router>
    );
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(routerRenderer)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept(routerRenderer, () => { render(routerRenderer) })
}

registerServiceWorker();
