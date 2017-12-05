import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './components/home';
import About from './components/about';
import Protected from './components/protected';
import SideMenu from './components/sidemenu';
import { EventEmitter } from 'events';
import { Provider } from 'react-redux';
import { store } from './redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenIndex: 1
        }
    }

    componentWillMount() {
        console.log(this.props);
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
                                <PrivateRoute exact path="/protected" component={Protected} loggedIn={store.getState().user.loggedIn} eventEmitter={this.eventEmitter} {...this.props} />
                            </Switch>
                        </div>
                    </div>
                </div>
        );
    }
}

const PrivateRoute = ({ component: Component, exact, path, loggedIn, ...rest }) => (
    <Route exact path={path} render={() => (
        loggedIn ? <Component {...rest} /> : <Redirect to="/" />
    )} />
)

const routerRenderer = () => {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={App}>
                </Route>
            </Router>
        </Provider>
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
