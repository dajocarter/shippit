import React from "react";
import styled from "styled-components";
import { ListGroupItem } from "react-bootstrap";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/fontawesome-pro-light";

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

const Item = props => {
  return (
    <ListItem>
      {props.item.name}{" "}
      <Icons>
        <FAicon icon={faEdit} color={`blue`} />{" "}
        <FAicon
          icon={faTrashAlt}
          color={`red`}
          onClick={() => props.deleteItem(props.item.key)}
        />
      </Icons>
    </ListItem>
  );
};

export default Item;
