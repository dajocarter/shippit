import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import styled from "styled-components";

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
  flex: 1 1 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoxTitle = styled.h3`
  margin-top: 0;
`;

const Form = styled.form`
  width: 100%;
`;

export default class AddItem extends Component {
  createItem(event) {
    event.preventDefault();
    const item = {
      name: this.name.value,
      box: this.props.boxId
    };
    this.props.addItem(item);
    this.itemForm.reset();
  }

  render() {
    return (
      <Container>
        <BoxContent>
          <BoxTitle>Add an Item</BoxTitle>
          <Form
            ref={form => (this.itemForm = form)}
            onSubmit={e => this.createItem(e)}
          >
            <FormGroup controlId="name">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Name of item"
                inputRef={name => (this.name = name)}
              />
            </FormGroup>
            <Row>
              <Col xs={6} xsOffset={3}>
                <Button type="submit" bsStyle="success" block>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </BoxContent>
      </Container>
    );
  }
}
