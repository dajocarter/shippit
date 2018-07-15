import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/fontawesome-pro-light";
import { database } from "../../utils/firebase";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  margin-bottom: 2rem;
`;

const BoxContent = styled.div`
  flex: 1 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoxTitle = styled.h3`
  margin-top: 0;
  text-align: center;
`;

const Action = styled.div`
  border-radius: 50%;
  background-color: red;
  height: 50px;
  width: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FAicon = styled(FontAwesomeIcon)`
  font-size: 2.5rem;
  color: white;
`;

export default class AddBox extends Component {
  state = { editBox: null };

  createBox = e => {
    e.preventDefault();
    const db = database().ref(`boxes`);
    const boxData = {
      name: "Unnamed Box",
      height: 0,
      length: 0,
      width: 0,
      closed: false
    };
    const boxKey = db.push().key;
    db.child(`${this.props.uid}/${boxKey}`)
      .update(boxData)
      .then(() => this.setState({ boxId: boxKey }));
  };
  render() {
    if (this.state.boxId) {
      return <Redirect to={`boxes/${this.state.boxId}`} />;
    }
    return (
      <Container>
        <BoxContent>
          <BoxTitle>Add A Box</BoxTitle>
          <Action onClick={e => this.createBox(e)}>
            <FAicon icon={faPlus} />
          </Action>
        </BoxContent>
      </Container>
    );
  }
}
