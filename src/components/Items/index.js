import React, { Component } from "react";
import { Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { database } from "../../utils/firebase";
import Box from "../Box";
import AddItem from "../AddItem";

export default class Items extends Component {
  state = { items: [], loading: true };
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
          boxId={this.props.match.params.boxId}
          showingItems={true}
        />
        <AddItem uid={this.props.uid} boxId={this.props.match.params.boxId} />
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
