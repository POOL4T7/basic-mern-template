import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/authScreens/RegisterScreen";
import LoginScreen from "./screens/authScreens/LoginScreen";
import ProfileScreen from "./screens/userScreens/ProfileScreen";
import NotFound from "./screens/NotFound";
import UserListScreen from "./screens/adminScreens/UserListScreen";
import UserEditScreen from "./screens/adminScreens/UserEditScreen";

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
            <Route path="/admin/userlist" exact component={UserListScreen} />
            <Route
              path="/admin/user/:id/edit"
              exact
              component={UserEditScreen}
            />
            <Route path="/*" exact component={NotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
