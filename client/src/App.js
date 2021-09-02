import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotFound from "./screens/NotFound";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/register" exact component={RegisterScreen} />
            <Route path="/login" exact component={LoginScreen} />
            <Route path="/profile" exact component={ProfileScreen} />
            <Route path="/*" exact component={NotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
