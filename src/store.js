import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(rootReducer, applyMiddleware(thunk));
// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}
export default store;