import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/register" exact component={RegisterScreen} />
          <Route path="/login" exact component={LoginScreen} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
