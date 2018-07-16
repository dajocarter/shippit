import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faBoxCheck, faBoxOpen } from "@fortawesome/fontawesome-pro-light";
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
  margin: ${props => (props.showingItems ? `2rem auto` : `0 auto 2rem`)};
`;

const BoxImage = styled.img`
  height: auto;
  width: 200px;
  flex: 0 0 auto;
`;

const PlaceHolder = styled.div`
  flex: 0 0 auto;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FAicon = styled(FontAwesomeIcon)`
  font-size: 7.5rem;
  color: ${props => props.color};
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
  color: ${props => props.color};

  &:not(:first-child) {
    margin-left: 1rem;
  }
`;

const ActionLink = styled(Link)`
  color: ${props => props.color};
  &:hover {
    text-decoration: none;
  }
`;

export default class Box extends Component {
  state = { box: {}, numItems: 0 };

  componentDidMount() {
    const db = database();
    db.ref("boxes")
      .child(`${this.props.uid}/${this.props.boxId}`)
      .on("value", box => this.setState({ box: box.val() }));
    db.ref(`items`)
      .child(`${this.props.uid}`)
      .orderByChild("box")
      .equalTo(this.props.boxId)
      .on("value", items => this.setState({ numItems: items.numChildren() }));
  }
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

  openBox = (boxKey, e) => {
    e.preventDefault();
    const db = database().ref(`boxes`);
    db.child(`${this.props.uid}/${boxKey}`)
      .update({ closed: false })
      .catch(error => console.log(error));
  };

  closeBox = (boxKey, e) => {
    e.preventDefault();
    const db = database().ref(`boxes`);
    db.child(`${this.props.uid}/${boxKey}`)
      .update({ closed: true })
      .catch(error => console.log(error));
  };

  deleteBox = (boxKey, e) => {
    e.preventDefault();
    const db = database().ref(`boxes`);
    db.child(`${this.props.uid}/${boxKey}`)
      .remove()
      .catch(error => console.log(error));
  };

  render() {
    const { box } = this.state;
    const { boxId, showingItems } = this.props;
    if (this.state.boxId) {
      return <Redirect to={`edit/box/${this.state.boxId}`} />;
    }
    return (
      <Container showingItems={this.props.showingItems}>
        {box.image ? (
          <BoxImage src={box.image} alt={box.name} />
        ) : (
          <PlaceHolder>
            <FAicon
              icon={box.closed ? faBoxCheck : faBoxOpen}
              color={box.closed ? `green` : `blue`}
            />
          </PlaceHolder>
        )}
        <BoxContent>
          <BoxInfo>
            <BoxTitle>{box.name || `Unnamed Box`}</BoxTitle>
            <BoxDetails>
              <Detail>{box.height || 0}"</Detail> H x{" "}
              <Detail>{box.width || 0}"</Detail> W x{" "}
              <Detail>{box.length || 0}"</Detail> L
            </BoxDetails>
            <BoxDetails>
              <Detail>{this.state.numItems}</Detail> items
            </BoxDetails>
          </BoxInfo>
          {boxId &&
            !showingItems && (
              <div>
                {box.closed ? (
                  <BoxActions>
                    <Action
                      onClick={e => this.openBox(boxId, e)}
                      color={`blue`}
                    >
                      Open Box
                    </Action>
                    <Action
                      onClick={e => this.deleteBox(boxId, e)}
                      color={`red`}
                    >
                      Delete Box
                    </Action>
                  </BoxActions>
                ) : (
                  <BoxActions>
                    <Action
                      onClick={e => this.closeBox(boxId, e)}
                      color={`green`}
                    >
                      Close Box
                    </Action>
                    <Action>
                      <ActionLink to={`boxes/${boxId}`} color={`blue`}>
                        Edit Box
                      </ActionLink>
                    </Action>
                    <Action>
                      <ActionLink to={`boxes/${boxId}/items`} color={`blue`}>
                        Edit Items
                      </ActionLink>
                    </Action>
                    <Action
                      onClick={e => this.deleteBox(boxId, e)}
                      color={`red`}
                    >
                      Delete Box
                    </Action>
                  </BoxActions>
                )}
              </div>
            )}
          {!boxId &&
            !showingItems && (
              <BoxActions>
                <Action onClick={e => this.createBox(e)} color={`green`}>
                  Start Packing
                </Action>
              </BoxActions>
            )}
        </BoxContent>
      </Container>
    );
  }
}
