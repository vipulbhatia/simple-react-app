import { combineReducers, createStore } from 'redux';

const userReducer = (state={}, action) => {
    switch(action.type) {
        case 'CHANGE_NAME': return {...state, name: action.payload};
        default: return state;
    }
}

const tweetsReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD_TWEET': {
            console.log(state, action.payload);
            return [...state, action.payload];
        }
        default: return state;
    }
}

export const store = createStore(combineReducers({
        user: userReducer,
        tweets: tweetsReducer
    }),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
