import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/fontawesome-pro-light";
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
`;

const BoxImage = styled.img`
  height: auto;
  width: auto;
  flex: 0 0 auto;
  max-width: 200px;
`;

const PlaceHolder = styled.div`
  flex: 0 0 auto;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FAicon = styled(FontAwesomeIcon)`
  font-size: 7.5rem;
`;

const BoxContent = styled.div`
  flex: 1 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const BoxInfo = styled.div`
  flex: 0 0 auto;
`;

const BoxTitle = styled.h3`
  margin-top: 0;
`;

const BoxDetails = styled.p``;

const Detail = styled.strong``;

const BoxActions = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Action = styled.span`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  flex: 0 0 auto;
  padding: 1rem;
  cursor: pointer;
  color: green;

  & + & {
    margin-left: 1rem;
  }
`;

const ActionLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

export default class Box extends Component {
  state = { editBox: null };

  createBox = e => {
    e.preventDefault();
    const db = database().ref(`boxes`);
    const boxData = {
      name: "Unnamed Box",
      height: 0,
      length: 0,
      width: 0,
      user: this.props.uid
    };
    const boxKey = db.push().key;
    db.child(`${this.props.uid}/${boxKey}`)
      .update(boxData)
      .then(() => this.setState({ editBox: boxKey }));
  };

  render() {
    const { box } = this.props;
    if (this.state.editBox) {
      return <Redirect to={`edit/box/${this.state.editBox}`} />;
    }
    return (
      <Container>
        {box.image ? (
          <BoxImage src={box.image} alt={box.name} />
        ) : (
          <PlaceHolder>
            <FAicon icon={faBoxOpen} />
          </PlaceHolder>
        )}
        <BoxContent>
          <BoxInfo>
            <BoxTitle>{box.name || `Your First Box`}</BoxTitle>
            <BoxDetails>
              <Detail>{box.height || 0}"</Detail> H x{" "}
              <Detail>{box.width || 0}"</Detail> W x{" "}
              <Detail>{box.length || 0}"</Detail> L
            </BoxDetails>
            <BoxDetails>
              <Detail>{box.items || 0}</Detail> items
            </BoxDetails>
          </BoxInfo>
          {box.key ? (
            <BoxActions>
              <Action onClick={e => this.closeBox(box.key, e)}>
                Close Box
              </Action>
              <Action>
                <ActionLink to={`edit/box/${box.key}`}>Edit Box</ActionLink>
              </Action>
              <Action>
                <ActionLink to={`edit/item/${box.key}`}>Edit Items</ActionLink>
              </Action>
              <Action onClick={e => this.deleteBox(box.key, e)}>
                Delete Box
              </Action>
            </BoxActions>
          ) : (
            <BoxActions>
              <Action onClick={e => this.createBox(e)}>Start Packing</Action>
            </BoxActions>
          )}
        </BoxContent>
      </Container>
    );
  }
}
