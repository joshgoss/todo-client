import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import './App.scss';

import LoginLayoutRoute from './layouts/LoginLayout';
import CreateAccountPage from './features/account/CreateAccountPage';
import LoginPage from './features/account/LoginPage';

function App() {
  return (
    <Router>
      <Switch>
        <LoginLayoutRoute exact path="/create-account" component={CreateAccountPage} />
        <LoginLayoutRoute exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default App;
