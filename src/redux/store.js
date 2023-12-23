import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { filterReducer, homestayIdReducer, guestNumberReducer, dayReducer } from './reducers';
import thunk from 'redux-thunk';
import authReducer from "./authSlice";
import billReducer from './billSlice';
import detailReducer from './authSlice'
const rootReducer = combineReducers({
  filterReducer,
  homestayIdReducer,
  guestNumberReducer,
  dayReducer,
  authen: authReducer,
  bill:billReducer,
  detail:detailReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
