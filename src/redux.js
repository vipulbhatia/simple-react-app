import { combineReducers, createStore } from 'redux';

//actions.js
export const addTweet = (payload) => ({ type: 'ADD_TWEET', payload: payload });
export const login = () => ({ type: 'USER_LOGIN' });

const userReducer = (state={}, action) => {
    switch(action.type) {
        case 'CHANGE_NAME': return {...state, name: action.payload};
        case 'USER_LOGIN': return {...state, loggedIn: true};
        default: return state;
    }
}

const tweetsReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD_TWEET': return [...state, action.payload];
        default: return state;
    }
}

export const store = createStore(combineReducers({
        user: userReducer,
        tweets: tweetsReducer
    }),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
