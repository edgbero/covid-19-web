import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StoreProvider, createStore } from "easy-peasy";
import model from "./redux";
import Home from "./components/home";
import About from "./components/about";
import NotFound from "./components/not-found";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";

const store = createStore(model);

const App = (): React => {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Navigation />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </StoreProvider>
  );
};

export default App;
