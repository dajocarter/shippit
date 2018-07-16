import React, { Component } from "react";
import {
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import { auth } from "../../utils/firebase";

export default class Login extends Component {
  state = { feedback: null, validationState: null };

  handleSubmit = e => {
    e.preventDefault();
    auth()
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .catch(error => {
        console.log(error);
        this.setState({
          feedback: "Invalid username/password.",
          validationState: "error"
        });
      });
  };

  resetPassword = () => {
    auth()
      .sendPasswordResetEmail(this.email.value)
      .then(() =>
        this.setState({
          feedback: `Password reset email set to ${this.email.value}.`,
          validationState: "warning"
        })
      )
      .catch(error => {
        console.log(error);
        this.setState({
          feedback: `Email address not found.`,
          validationState: "error"
        });
      });
  };

  render() {
    return (
      <Col sm={6} smOffset={3}>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="email"
            validationState={this.state.validationState}
          >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              placeholder="Email"
              inputRef={email => (this.email = email)}
            />
          </FormGroup>
          <FormGroup
            controlId="password"
            validationState={this.state.validationState}
          >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Password
            "
              inputRef={password => (this.password = password)}
            />
          </FormGroup>
          {this.state.validationState && (
            <div className="alert alert-danger" role="alert">
              <span
                className="glyphicon glyphicon-exclamation-sign"
                aria-hidden="true"
              />
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.feedback}{" "}
              <p onClick={this.resetPassword} className="alert-link">
                Forgot Password?
              </p>
            </div>
          )}
          <Button type="submit" bsStyle="primary">
            Login
          </Button>
        </form>
      </Col>
    );
  }
}
