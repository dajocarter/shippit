import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import { auth } from "../../utils/firebase";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    email: "",
    password: "",
    feedback: null,
    emailValidity: null,
    passwordValidity: null
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        switch (error.code) {
          case "auth/invalid-email":
            this.setState({
              feedback: "The given email is not valid.",
              emailValidity: "error"
            });
            break;
          case "auth/user-disabled":
            this.setState({
              feedback:
                "The user corresponding to the given email has been diabled.",
              emailValidity: "error"
            });
            break;
          case "auth/user-not-found":
            this.setState({
              feedback: "There is no user corresponding to the given email.",
              emailValidity: "error"
            });
            break;
          case "auth/wrong-password":
            this.setState({
              feedback: "The password does not match the given email.",
              emailValidity: "error",
              passwordValidity: "error"
            });
            break;
          default:
        }
      });
  }

  render() {
    return (
      <Col sm={6} smOffset={3}>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="email"
            validationState={this.state.emailValidity}
          >
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup
            controlId="password"
            validationState={this.state.passwordValidity}
          >
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              placeholder="Password
            "
              name="password"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </FormGroup>
          {this.state.feedback && (
            <div className="alert alert-danger" role="alert">
              <span
                className="glyphicon glyphicon-exclamation-sign"
                aria-hidden="true"
              />
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.feedback}
            </div>
          )}
          <Link to={`reset-password`}>Lost your password?</Link>
          <Button type="submit" bsStyle="primary">
            Login
          </Button>
        </form>
      </Col>
    );
  }
}
