import React, { Component } from "react";
import { database } from "../../utils/firebase";
import { Col } from "react-bootstrap";

import Loading from "../Loading";
import Box from "../Box";
import Move from "../Move";
import AddBox from "../AddBox";

export default class Dashboard extends Component {
  state = { boxes: [], loading: true };

  componentDidMount() {
    const db = database().ref(`boxes`);
    const userBoxesRef = db.child(`${this.props.uid}`);
    userBoxesRef.on("value", boxesSnapshot => {
      let boxes = [];
      if (boxesSnapshot.exists()) {
        boxesSnapshot.forEach(box => {
          const boxRef = db.child(`${this.props.uid}/${box.key}`);
          boxRef
            .once("value", boxSnapshot => {
              let boxData = boxSnapshot.val();
              boxData["key"] = box.key;
              boxes.push(boxData);
            })
            .then(() => {
              if (boxes.length > 1) {
                this.setState({
                  boxes,
                  loading: false
                });
              } else {
                if (!!boxes[0].name) {
                  this.setState({
                    boxes,
                    loading: false
                  });
                } else {
                  this.setState({
                    boxes,
                    loading: false
                  });
                }
              }
            })
            .catch(error => console.log(error));
        });
      } else {
        this.setState({
          loading: false
        });
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
        {this.state.boxes.length ? (
          <div>
            <AddBox uid={this.props.uid} />
            {this.state.boxes.map(box => <Box key={box.key} box={box} />)}
          </div>
        ) : (
          <Box uid={this.props.uid} history={this.props.history} />
        )}
      </Col>
    );
  }
}
