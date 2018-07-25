import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, FormGroup, FormControl, Button } from "react-bootstrap";
import styled from "styled-components";

const InlineForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const InputWrapper = styled(FormGroup)`
  margin: 0;
  width: calc(100% - 95px);
`;

const Input = styled(FormControl)`
  && {
    width: 100%;
  }
`;

const SubmitButton = styled(Button)`
  margin-left: 1rem;
  border-color: #4cae4c;
  color: #5cb85c;
  transition: all 0.25s ease;

  &:hover,
  &:focus {
    color: #fff;
    background-color: #5cb85c;
  }
`;

const INITIAL_STATE = { name: "" };
export default class AddItem extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = INITIAL_STATE;

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const item = {
      name: this.state.name,
      box: this.props.boxId
    };
    this.props.addItem(item);
    this.setState(INITIAL_STATE);
  }

  render() {
    return (
      <InlineForm inline onSubmit={this.handleSubmit}>
        <InputWrapper controlId="name">
          <Input
            type="text"
            name="name"
            placeholder="Describe your item"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </InputWrapper>
        <SubmitButton type="submit">Add Item</SubmitButton>
      </InlineForm>
    );
  }
}

AddItem.propTypes = {
  addItem: PropTypes.func.isRequired,
  boxId: PropTypes.string.isRequired
};
