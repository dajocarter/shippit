import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Grid, Row } from "react-bootstrap";
import Login from "./forms/Login";
import Register from "./forms/Register";
import Home from "./Home";
import Dashboard from "./protected/Dashboard";
import EditBox from "../components/forms/EditBox";
import Header from "./partials/Header";
import Loading from "../components/Loading";
import { auth } from "../utils/firebase";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/dashboard" />
        )
      }
    />
  );
}

export default class App extends Component {
  state = { authed: false, loading: true };

  componentDidMount() {
    this.stopAuthListener = auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.setState({
          authed: true,
          loading: false
        });
      } else {
        this.setState({
          authed: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.stopAuthListener();
  }

  logout = () => {
    auth().signOut();
  };

  render() {
    return this.state.loading === true ? (
      <Loading />
    ) : (
      <BrowserRouter>
        <div>
          <Header authed={this.state.authed} logout={this.logout} />
          <Grid>
            <Row>
              <Switch>
                <Route path="/" exact component={Home} />
                <PublicRoute
                  authed={this.state.authed}
                  path="/login"
                  component={Login}
                />
                <PublicRoute
                  authed={this.state.authed}
                  path="/register"
                  component={Register}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  uid={this.state.uid}
                  path="/edit/box/:boxId"
                  component={EditBox}
                />
                  path="/dashboard"
                  component={Dashboard}
                />
                <Route render={() => <h3>404 (page not found)</h3>} />
              </Switch>
            </Row>
          </Grid>
        </div>
      </BrowserRouter>
    );
  }
}
