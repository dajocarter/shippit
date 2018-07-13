import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import Loading from "../Loading";
import { database, storage } from "../../utils/firebase";

export default class EditBox extends Component {
  state = {
    toDashboard: false,
    loading: true,
    name: "",
    height: null,
    length: null,
    width: null
  };

  componentDidMount() {
    database()
      .ref(`boxes`)
      .child(`${this.props.uid}/${this.props.match.params.boxId}`)
      .once("value")
      .then(snapshot => {
        const {
          name = "",
          height = null,
          length = null,
          width = null
        } = snapshot.val();
        this.setState({ name, height, length, width, loading: false });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const db = database();
    const store = storage();

    const boxData = {
      name: this.name.value,
      height: this.height.value,
      length: this.length.value,
      width: this.width.value
    };

    db.ref(`boxes`)
      .child(`boxes/${this.props.uid}/${this.props.match.params.boxId}`)
      .update(boxData)
      .then(() => this.setState({ toDashboard: true }));
    if (this.file.files.length) {
      let uploadTask = store
        .ref(`boxes`)
        .child(`${this.props.match.params.boxId}`)
        .put(this.file.files[0]);
      uploadTask.on(
        storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          // TODO: Handle upload progress
          console.log(
            `Upload is ${(snapshot.bytesTransferred / snapshot.totalBytes) *
              100}% done`
          );
        },
        error => {
          // TODO: Handle error
          console.log(error);
        },
        () => {
          // TODO: Handle successful upload
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            db.ref(`boxes`)
              .child(`${this.props.uid}/${this.props.match.params.boxId}`)
              .update({
                image: downloadURL
              });
          });
        }
      );
    }
  };

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    if (this.state.toDashboard) {
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }
    return (
      <Col sm={8} smOffset={2}>
        <h1>Edit Box</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              placeholder="Name"
              inputRef={name => (this.name = name)}
              defaultValue={this.state.name}
            />
          </FormGroup>
          <FormGroup controlId="boxImage">
            <ControlLabel>Box Image</ControlLabel>
            <FormControl type="file" inputRef={file => (this.file = file)} />
          </FormGroup>
          <FormGroup controlId="width">
            <ControlLabel>Width (in)</ControlLabel>
            <FormControl
              type="number"
              placeholder="Width"
              inputRef={width => (this.width = width)}
              defaultValue={this.state.width}
            />
          </FormGroup>
          <FormGroup controlId="length">
            <ControlLabel>Length (in)</ControlLabel>
            <FormControl
              type="number"
              placeholder="length"
              inputRef={length => (this.length = length)}
              defaultValue={this.state.length}
            />
          </FormGroup>
          <FormGroup controlId="height">
            <ControlLabel>Height (in)</ControlLabel>
            <FormControl
              type="number"
              placeholder="Height"
              inputRef={height => (this.height = height)}
              defaultValue={this.state.height}
            />
          </FormGroup>
          <Button type="submit" bsStyle="success" block>
            Submit
          </Button>
        </form>
      </Col>
    );
  }
}
