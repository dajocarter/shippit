import React, { Component } from "react";
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
      <InlineForm
        inline
        ref={form => (this.itemForm = form)}
        onSubmit={e => this.createItem(e)}
      >
        <InputWrapper controlId="name">
          <Input
            type="text"
            placeholder="Describe your item"
            inputRef={name => (this.name = name)}
          />
        </InputWrapper>
        <SubmitButton type="submit" bsStyle="success">
          Add Item
        </SubmitButton>
      </InlineForm>
    );
  }
}
