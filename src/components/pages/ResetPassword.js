import React, { Component } from "react";
import {
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import { auth } from "../../utils/firebase";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    email: "",
    feedback: null,
    validationState: null
  };

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() =>
        this.setState({
          feedback: `Password reset email was set to ${this.state.email}.`,
          validationState: "success"
        })
      )
      .catch(error => {
        switch (error.code) {
          case "auth/invalid-email":
            this.setState({
              feedback: "The given email is not valid.",
              validationState: "error"
            });
            break;
          case "auth/user-not-found":
            this.setState({
              feedback: "There is no user corresponding to the given email.",
              validationState: "error"
            });
            break;
          default:
        }
      });
  }

  render() {
    return (
      <Col sm={6} smOffset={3}>
        <h1>Shippit</h1>
        <p>
          Please enter your email address. You will receive a link to create a
          new password via email.
        </p>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="email"
            validationState={this.state.validationState}
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
          {this.state.feedback && (
            <div
              className={
                this.state.validationState === "success"
                  ? `alert alert-success`
                  : `alert alert-danger`
              }
              role="alert"
            >
              <span
                className="glyphicon glyphicon-exclamation-sign"
                aria-hidden="true"
              />
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.feedback}
            </div>
          )}
          <Button type="submit" bsStyle="primary">
            Get New Password
          </Button>
        </form>
      </Col>
    );
  }
}
