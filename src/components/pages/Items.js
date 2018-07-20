import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import styled from "styled-components";
import { database } from "../../utils/firebase";
import Box from "../Box";
import Item from "../Item";
import AddItem from "../AddItem";

const ItemList = styled(ListGroup)`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const FormItem = styled(ListGroupItem)``;

export default class Items extends Component {
  constructor() {
    super();

    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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
      .on("value", snapshot => {
        let items = [];
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            const key = childSnapshot.key;
            const data = childSnapshot.val();
            const item = { key, ...data };
            items.push(item);
          });
          this.setState({ loading: false, items });
        } else {
          this.setState({ loading: false });
        }
      });
  }

  addItem(item) {
    const db = database().ref(`items`);
    db.child(`${this.props.uid}`).push(item);
  }

  editItem(key, name) {
    const db = database().ref(`items`);
    db.child(`${this.props.uid}/${key}`).update({ name });
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
              <Item
                key={item.key}
                item={item}
                editItem={this.editItem}
                deleteItem={this.deleteItem}
              />
            ))}
          </ItemList>
        )}
      </Col>
    );
  }
}

Items.propTypes = {
  uid: PropTypes.string.isRequired
};
