import React, { Component } from "react";
import {
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import { auth, database } from "../../utils/firebase";

export default class Register extends Component {
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
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(({ user: { email, uid } }) => {
        database()
          .ref("users")
          .child(uid)
          .set({ email });
      })
      .catch(error => {
        switch (error.code) {
          case "auth/email-already-in-use":
            this.setState({
              feedback: error.message,
              emailValidity: "error"
            });
            break;
          case "auth/invalid-email":
            this.setState({
              feedback: error.message,
              emailValidity: "error"
            });
            break;
          case "auth/weak-password":
            this.setState({
              feedback: error.message,
              passwordValidity: "error"
            });
            break;
          default:
            this.setState({ feedback: error.message });
        }
      });
  }

  render() {
    return (
      <Col sm={6} smOffset={3}>
        <h1>Register</h1>
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
              placeholder="Password"
              name="password"
              value={this.state.password}
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
          <Button type="submit" bsStyle="primary">
            Register
          </Button>
        </form>
      </Col>
    );
  }
}
