import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";

const Container = styled.div`
  background: #fff;
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

const SubmitButton = styled(Button)`
  border-color: #4cae4c;
  color: #5cb85c;
  transition: all 0.25s ease;

  &:hover,
  &:focus {
    color: #fff;
    background-color: #5cb85c;
  }
`;

const INITIAL_STATE = { name: "", height: 0, length: 0, width: 0 };

export default class AddBox extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = INITIAL_STATE;

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, height, length, width } = this.state;
    const box = {
      name,
      height: parseFloat(height),
      length: parseFloat(length),
      width: parseFloat(width),
      closed: false
    };
    this.props.addBox(box);
    this.setState(INITIAL_STATE);
  }

  render() {
    return (
      <Container>
        <BoxContent>
          <BoxTitle>Add a Box</BoxTitle>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={12}>
                <FormGroup controlId="name">
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter a good description of your box"
                    value={this.state.name}
                    name="name"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <FormGroup controlId="width">
                  <ControlLabel>Width (in)</ControlLabel>
                  <FormControl
                    type="number"
                    step={1 / 16}
                    placeholder="Width"
                    name="width"
                    value={this.state.width}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup controlId="length">
                  <ControlLabel>Length (in)</ControlLabel>
                  <FormControl
                    type="number"
                    step={1 / 16}
                    placeholder="Length"
                    name="length"
                    value={this.state.length}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
              <Col xs={4}>
                <FormGroup controlId="height">
                  <ControlLabel>Height (in)</ControlLabel>
                  <FormControl
                    type="number"
                    step={1 / 16}
                    placeholder="Height"
                    name="height"
                    value={this.state.height}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={6} xsOffset={3}>
                <SubmitButton type="submit" block>
                  Submit
                </SubmitButton>
              </Col>
            </Row>
          </Form>
        </BoxContent>
      </Container>
    );
  }
}

AddBox.propTypes = {
  addBox: PropTypes.func.isRequired
};
