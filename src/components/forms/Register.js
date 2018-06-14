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
  state = { feedback: null, validationState: null };

  handleSubmit = e => {
    e.preventDefault();
    auth()
      .createUserWithEmailAndPassword(this.email.value, this.password.value)
      .then(({ user }) => {
        console.log(`User created`, user);
        database()
          .ref("users")
          .child(user.uid)
          .set({ email: user.email, uid: user.uid })
          .then(() => {
            console.log("user added to database");
          })
          .catch(error => console.log(`Error adding user to database`, error));
      })
      .catch(error => {
        console.log(error);
        this.setState({ feedback: error.message, validationState: error });
      });
  };
  render() {
    return (
      <Col sm={6} smOffset={3}>
        <h1>Register</h1>
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
              placeholder="Password"
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
