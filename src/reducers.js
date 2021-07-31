import { combineReducers } from 'redux';
import notificationsReducer from './features/notifications/notificationsSlice';

export const rootReducer = combineReducers({
    notifications: notificationsReducer
});

export default rootReducer;