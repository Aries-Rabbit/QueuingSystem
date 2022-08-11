import thunk from "redux-thunk";
import { applyMiddleware, createStore } from 'redux';
// import {configureStore} from '@reduxjs/toolkit';
import reducers from "./Reducer/index";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// import {configureStore} from '@reduxjs/toolkit';
// export default configureStore({
//     reducer: reducers,
// })