import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import styled from "styled-components";
import { database } from "../../utils/firebase";
import Box from "../Box";
import AddItem from "../AddItem";

export default class Items extends Component {
  state = { items: null, loading: true };
  componentDidMount() {
    const db = database().ref(`items/${this.props.uid}`);
    db.orderByChild("box")
      .equalTo(this.props.match.params.boxId)
      .on("value", snap => {
        let items = [];
        if (snap.exists()) {
          snap.forEach(item => {
            const itemRef = db.child(`${item.key}`);
            itemRef
              .once("value", itemSnapshot => {
                let itemData = itemSnapshot.val();
                itemData["key"] = item.key;
                items.push(itemData);
              })
              .then(() => {
                this.setState({ items, loading: false });
              })
              .catch(error => console.log(error));
          });
        } else {
          this.setState({ loading: false });
        }
      });
  }

  render() {
    return (
      <Col xs={12}>
        <Box
          uid={this.props.uid}
          box={this.props.location.state.box}
          showingItems={true}
        />
        <AddItem
          uid={this.props.uid}
          boxKey={this.props.location.state.box.key}
        />
        {this.state.items && (
          <ListGroup>
            {this.state.items.map(item => (
              <ListGroupItem key={item.key}>{item.name}</ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
    );
  }
}
