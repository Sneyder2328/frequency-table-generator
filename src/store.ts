import {createStore, compose, applyMiddleware} from 'redux';
// @ts-ignore
import thunk from 'redux-thunk';
import {mainReducer} from "./mainReducer";

// @ts-ignore
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// @ts-ignore
export const store = createStore(
    mainReducer,
    composeEnhancer(applyMiddleware(thunk))
);


