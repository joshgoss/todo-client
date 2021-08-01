import { combineReducers } from 'redux';
import notificationsReducer from './features/notifications/notificationsSlice';
import accountReducer from './features/account/accountSlice';

export const rootReducer = combineReducers({
    session: accountReducer,
    notifications: notificationsReducer
});

export default rootReducer;