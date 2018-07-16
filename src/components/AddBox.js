import React, { Component } from "react";
import styled from "styled-components";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  margin-bottom: 2rem;
`;

const BoxContent = styled.div`
  flex: 1 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoxTitle = styled.h3`
  margin-top: 0;
`;

export default class AddBox extends Component {
  createBox(event) {
    event.preventDefault();
    const box = {
      name: this.name.value,
      height: this.height.value,
      length: this.length.value,
      width: this.width.value,
      closed: false
    };
    this.props.addBox(box);
    this.boxForm.reset();
  }
  render() {
    return (
      <Container>
        <BoxContent>
          <BoxTitle>Add A Box</BoxTitle>
          <form
            ref={input => (this.boxForm = input)}
            onSubmit={e => this.createBox(e)}
          >
            <FormGroup controlId="name">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Name"
                inputRef={name => (this.name = name)}
              />
            </FormGroup>
            <FormGroup controlId="width">
              <ControlLabel>Width (in)</ControlLabel>
              <FormControl
                type="number"
                placeholder="Width"
                inputRef={width => (this.width = width)}
              />
            </FormGroup>
            <FormGroup controlId="length">
              <ControlLabel>Length (in)</ControlLabel>
              <FormControl
                type="number"
                placeholder="length"
                inputRef={length => (this.length = length)}
              />
            </FormGroup>
            <FormGroup controlId="height">
              <ControlLabel>Height (in)</ControlLabel>
              <FormControl
                type="number"
                placeholder="Height"
                inputRef={height => (this.height = height)}
              />
            </FormGroup>
            <Button type="submit" bsStyle="success" block>
              Submit
            </Button>
          </form>
        </BoxContent>
      </Container>
    );
  }
}
