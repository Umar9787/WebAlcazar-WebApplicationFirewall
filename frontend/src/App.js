import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "./components/credentials/SignUp";
import Login from "./components/credentials/Login";
import MyNavbar from "./components/Navbar/MyNavbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <Route path="/home">
            <MyNavbar />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
