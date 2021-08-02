import { combineReducers } from "redux";
import notificationsReducer from "./features/notifications/notificationsSlice";
import accountReducer from "./features/account/accountSlice";
import todoReducer from "./features/todo/todoSlice";

export const rootReducer = combineReducers({
  notifications: notificationsReducer,
  session: accountReducer,
  todo: todoReducer,
});

export default rootReducer;
