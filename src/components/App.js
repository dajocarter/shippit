import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { Grid, Row } from "react-bootstrap";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Boxes from "./pages/Boxes";
import Items from "./pages/Items";
import Header from "./Header";
import Loading from "./Loading";
import { auth } from "../utils/firebase";

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} {...rest} />
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
        authed === false ? <Component {...props} /> : <Redirect to="/boxes" />
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
          uid: currentUser.uid,
          loading: false
        });
      } else {
        this.setState({
          authed: false,
          uid: null,
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
        <div style={{ backgroundColor: `#efefef` }}>
          <Header authed={this.state.authed} logout={this.logout} />
          <Grid>
            <Row>
              <Switch>
                <Route path="/" exact component={Home} />
                <PublicRoute
                  authed={this.state.authed}
                  path="/reset-password"
                  component={ResetPassword}
                />
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
                  path="/boxes/:boxId"
                  component={Items}
                />
                <PrivateRoute
                  authed={this.state.authed}
                  uid={this.state.uid}
                  path="/boxes"
                  component={Boxes}
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
