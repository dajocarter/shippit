import React, { Component } from "react";
import { database } from "../../utils/firebase";
import { Col } from "react-bootstrap";

import Loading from "../Loading";
import Box from "../Box";
import Move from "../Move";
import AddBox from "../AddBox";

export default class Dashboard extends Component {
  constructor() {
    super();

    this.addBox = this.addBox.bind(this);
    this.toggleBoxStatus = this.toggleBoxStatus.bind(this);
    this.deleteBox = this.deleteBox.bind(this);
  }

  state = { boxes: [], items: [], loading: true };

  componentDidMount() {
    const db = database();
    const userBoxes = db
      .ref(`boxes`)
      .child(`${this.props.uid}`)
      .orderByChild("closed");
    userBoxes.on("value", snapshot => {
      let boxes = [];
      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          const box = { key, ...data };
          boxes.push(box);
        });
        this.setState({ loading: false, boxes });
      } else {
        this.setState({ loading: false });
      }
    });
    const userItems = db
      .ref(`items`)
      .child(`${this.props.uid}`)
      .orderByChild("box");
    userItems.on("value", snapshot => {
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

  addBox(box) {
    const db = database().ref(`boxes`);
    const boxKey = db.push().key;
    db.child(`${this.props.uid}/${boxKey}`).update(box);
  }

  toggleBoxStatus(boxKey, status) {
    const db = database().ref(`boxes`);
    db.child(`${this.props.uid}/${boxKey}`).update({ closed: status });
  }

  deleteBox(boxKey) {
    const db = database().ref(`boxes`);
    db.child(`${this.props.uid}/${boxKey}`).remove();
  }

  render() {
    const { boxes, items, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <Col xs={12}>
        <Move boxes={boxes} items={items} />
        {boxes.length ? (
          <div>
            <AddBox addBox={this.addBox} />
            {boxes.map(box => (
              <Box
                key={box.key}
                box={box}
                items={items}
                showingItems={false}
                toggleBoxStatus={this.toggleBoxStatus}
                deleteBox={this.deleteBox}
              />
            ))}
          </div>
        ) : (
          <Box showingItems={false} />
        )}
      </Col>
    );
  }
}
