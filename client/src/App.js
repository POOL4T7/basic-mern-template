import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Switch>
          <Route path="/" exact component={HomeScreen} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
