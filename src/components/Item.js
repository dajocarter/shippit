import React, { Component } from "react";
import styled from "styled-components";
import { ListGroupItem } from "react-bootstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/fontawesome-pro-light";
import EditItem from "./EditItem";

const ListItem = styled(ListGroupItem)`
  font-weight: bold;
  position: relative;
  padding-right: 72px;
`;

const Icons = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const FAicon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: ${props => props.color}
  font-size: 1.75rem;
  margin-right: 1.6rem;
`;
export default class Item extends Component {
  constructor(props) {
    super(props);

    this.toggleEdit = this.toggleEdit.bind(this);
  }

  state = { edit: false };

  toggleEdit() {
    this.setState(prevState => ({
      edit: !prevState.edit
    }));
  }

  render() {
    if (this.state.edit) {
      return (
        <EditItem
          editItem={this.props.editItem}
          toggleEdit={this.toggleEdit}
          item={this.props.item}
        />
      );
    }
    return (
      <ListItem>
        {this.props.item.name}{" "}
        <Icons>
          <FAicon
            icon={faEdit}
            color={`blue`}
            onClick={() => this.setState({ edit: true })}
          />{" "}
          <FAicon
            icon={faTrashAlt}
            color={`red`}
            onClick={() => this.props.deleteItem(this.props.item.key)}
          />
        </Icons>
      </ListItem>
    );
  }
}
