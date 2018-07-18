import React, { Component } from "react";
import styled from "styled-components";
import {
  ListGroupItem,
  Form,
  FormGroup,
  FormControl,
  Button
} from "react-bootstrap";

const FormItem = styled(ListGroupItem)``;

const InlineForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const InputWrapper = styled(FormGroup)`
  margin: 0;
  width: calc(100% - 161px);
`;

const Input = styled(FormControl)`
  && {
    width: 100%;
  }
`;

const FormButton = styled(Button)`
  margin-left: 1rem;
`;

export default class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = { name: props.item.name };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state;
    this.props.editItem(this.props.item.key, name);
    this.props.toggleEdit();
  }

  render() {
    return (
      <FormItem>
        <InlineForm inline onSubmit={this.handleSubmit}>
          <InputWrapper controlId="name">
            <Input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </InputWrapper>
          <FormButton type="submit" bsStyle="success">
            Submit
          </FormButton>
          <FormButton bsStyle="danger" onClick={this.props.toggleEdit}>
            Cancel
          </FormButton>
        </InlineForm>
      </FormItem>
    );
  }
}
