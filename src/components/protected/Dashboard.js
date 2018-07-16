import React, { Component } from "react";
import { database } from "../../utils/firebase";
import { Col } from "react-bootstrap";

import Loading from "../Loading";
import Box from "../Box";
import Move from "../Move";
import AddBox from "../AddBox";

export default class Dashboard extends Component {
  state = { boxKeys: [], loading: true };

  componentDidMount() {
    const db = database().ref(`boxes`);
    const userBoxes = db.child(`${this.props.uid}`).orderByChild("closed");
    userBoxes.on("value", boxes => {
      let boxKeys = [];
      if (boxes.exists()) {
        boxes.forEach(box => {
          boxKeys.push(box.key);
        });
        this.setState({ loading: false, boxKeys });
      } else {
        this.setState({ loading: false });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Col xs={12}>
        <Move uid={this.props.uid} />
        {this.state.boxKeys.length ? (
          <div>
            <AddBox uid={this.props.uid} />
            {this.state.boxKeys.map(boxKey => (
              <Box
                key={boxKey}
                uid={this.props.uid}
                boxId={boxKey}
                showingItems={false}
              />
            ))}
          </div>
        ) : (
          <Box uid={this.props.uid} showingItems={false} />
        )}
      </Col>
    );
  }
}
