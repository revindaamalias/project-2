import { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Keranjang from "./Keranjang";
import Product from "./Product";
import Home from "./Home";
import About from "./About";
import Navigation from "./Navigation";

// function App() {
//   useEffect(() => {

//   }, []);

//   return <div className='App'>My App</div>;
// }

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/product">
            <Product />
          </Route>
          <Route path="/keranjang">
            <Keranjang />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
