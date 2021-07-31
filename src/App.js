
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import './App.scss';

import LoginLayoutRoute from './layouts/LoginLayout';
import CreateAccountPage from './features/account/CreateAccountPage';

function App() {
  return (
    <Router>
      <Switch>
        <LoginLayoutRoute exact path="/create-account" component={CreateAccountPage} />
      </Switch>
    </Router>
  );
}

export default App;
