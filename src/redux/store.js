import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import { cartReducer } from './cartReducer';

const composeEnhancers = composeWithDevTools({});

const initialStore = {
    cartReducer: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}
export const store = createStore(rootReducer, initialStore, composeEnhancers());