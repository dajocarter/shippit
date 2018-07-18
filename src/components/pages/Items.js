import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/fontawesome-pro-light";
import { database } from "../../utils/firebase";
import Box from "../Box";
import AddItem from "../AddItem";

const ItemList = styled(ListGroup)`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FormItem = styled(ListGroupItem)``;

const Item = styled(ListGroupItem)`
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
export default class Items extends Component {
  constructor() {
    super();

    this.addItem = this.addItem.bind(this);
  }

  state = { items: [], loading: true };

  componentDidMount() {
    const db = database();

    db.ref(`boxes/${this.props.uid}/${this.props.match.params.boxId}`)
      .once("value")
      .then(snap => {
        const key = snap.key;
        const data = snap.val();
        const box = { key, ...data };
        this.setState({ box });
      });

    db.ref(`items/${this.props.uid}`)
      .orderByChild("box")
      .equalTo(this.props.match.params.boxId)
      .on("value", snap => {
        let items = [];
        if (snap.exists()) {
          snap.forEach(item => {
            const itemRef = db
              .ref(`items`)
              .child(`${this.props.uid}/${item.key}`);
            itemRef
              .once("value", itemSnapshot => {
                let itemData = itemSnapshot.val();
                itemData["key"] = item.key;
                items.push(itemData);
              })
              .then(() => {
                this.setState({
                  items,
                  loading: false
                });
              })
              .catch(error => console.log(error));
          });
        } else {
          this.setState({ loading: false });
        }
      });
  }

  addItem(item) {
    const db = database().ref(`items`);
    db.child(`${this.props.uid}`).push(item);
  }

  deleteItem(itemKey) {
    const db = database().ref(`items`);
    db.child(`${this.props.uid}/${itemKey}`).remove();
  }

  render() {
    return (
      <Col xs={12}>
        {this.state.box &&
          this.state.items && (
            <Box
              box={this.state.box}
              items={this.state.items}
              showingItems={true}
            />
          )}
        {this.state.items && (
          <ItemList>
            {this.state.box && (
              <FormItem>
                <AddItem boxId={this.state.box.key} addItem={this.addItem} />
              </FormItem>
            )}
            {this.state.items.map(item => (
              <Item key={item.key}>
                {item.name}{" "}
                <Icons>
                  <FAicon icon={faEdit} color={`blue`} />{" "}
                  <FAicon
                    icon={faTrashAlt}
                    color={`red`}
                    onClick={() => this.deleteItem(item.key)}
                  />
                </Icons>
              </Item>
            ))}
          </ItemList>
        )}
      </Col>
    );
  }
}
