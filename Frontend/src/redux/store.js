import reducer from "./reducer";
import { legacy_createStore as createStore } from 'redux';
import initialToken from "./initialToken";

const store = createStore(reducer, initialToken);
export default store;