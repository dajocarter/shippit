import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faBoxCheck,
  faBoxOpen,
  faEdit
} from "@fortawesome/fontawesome-pro-light";

const Container = styled.div`
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  margin: ${props => (props.showingItems ? `2rem auto` : `0 auto 2rem`)};
`;

const BoxContent = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const BoxImage = styled.div`
  flex: 1 0 30%;
  width: 200px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
    flex: 1 0 100%;
  }
`;

const FAicon = styled(FontAwesomeIcon)`
  font-size: 7.5rem;
  color: ${props => props.color};
`;

const BoxInfo = styled.div`
  flex: 2 0 70%;
  padding: 1rem;
  @media (max-width: 480px) {
    flex: 1 0 100%;
    text-align: center;
  }
`;

const BoxTitle = styled.h3`
  margin-top: 0;
`;

const EditIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 1.75rem;
  color: #2e6da4;
  margin-left: 1rem;
`;

const BoxDetails = styled.p``;

const Detail = styled.strong``;

const BoxActions = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Action = styled.span`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  flex: 0 0 auto;
  margin: 0 1rem 1rem;
  padding: 1rem;
  cursor: pointer;
  color: ${props =>
    props.color === "green"
      ? `#5cb85c`
      : props.color === "red"
        ? `#d9534f`
        : `#337ab7`};
  border-color: ${props =>
    props.color === "green"
      ? `#4cae4c`
      : props.color === "red"
        ? `#d43f3a`
        : `#2e6da4`};
  transition: all 0.25s ease;

  &:hover,
  &:focus {
    color: #fff;
    background-color: ${props =>
      props.color === "green"
        ? `#5cb85c`
        : props.color === "red"
          ? `#d9534f`
          : `#337ab7`};
  }
`;

const ActionLink = styled(Link)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  flex: 0 0 auto;
  margin: 0 1rem 1rem;
  padding: 1rem;
  cursor: pointer;
  color: ${props =>
    props.color === "green"
      ? `#5cb85c`
      : props.color === "red"
        ? `#d9534f`
        : `#337ab7`};
  border-color: ${props =>
    props.color === "green"
      ? `#4cae4c`
      : props.color === "red"
        ? `#d43f3a`
        : `#2e6da4`};
  &:hover {
    color: #fff;
    background-color: ${props =>
      props.color === "green"
        ? `#5cb85c`
        : props.color === "red"
          ? `#d9534f`
          : `#337ab7`};
    text-decoration: none;
  }
`;

export default class Box extends Component {
  static propTypes = {
    deleteBox: PropTypes.func,
    box: PropTypes.shape({
      closed: PropTypes.bool.isRequired,
      height: PropTypes.number.isRequired,
      key: PropTypes.string.isRequired,
      length: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired
    }),
    items: PropTypes.arrayOf(PropTypes.object),
    showingItems: PropTypes.bool.isRequired,
    toggleBoxStatus: PropTypes.func
  };

  state = { editName: false };

  countItems() {
    const boxItems = Array.from(this.props.items).filter(
      item => item.box === this.props.box.key
    );
    return boxItems.length;
  }

  render() {
    const { box = {} } = this.props;
    return (
      <Container showingItems={this.props.showingItems}>
        <BoxContent>
          <BoxImage>
            <FAicon
              icon={box.closed ? faBoxCheck : faBoxOpen}
              color={box.closed ? `green` : `blue`}
            />
          </BoxImage>
          <BoxInfo>
            <BoxTitle>
              {box.name}{" "}
              <EditIcon
                icon={faEdit}
                onClick={() => this.setState({ editName: true })}
              />
            </BoxTitle>
            <BoxDetails>
              <Detail>{box.height}"</Detail> H x <Detail>{box.width}"</Detail> W
              x <Detail>{box.length}"</Detail> L
            </BoxDetails>
            {this.props.items && (
              <BoxDetails>
                <Detail>{this.countItems()}</Detail> items
              </BoxDetails>
            )}
          </BoxInfo>
        </BoxContent>
        {box.key &&
          !this.props.showingItems && (
            <BoxContent>
              {box.closed ? (
                <BoxActions>
                  <Action
                    onClick={() => this.props.toggleBoxStatus(box.key, false)}
                    color={`blue`}
                  >
                    Open Box
                  </Action>
                  <Action
                    onClick={() => this.props.deleteBox(box.key)}
                    color={`red`}
                  >
                    Delete Box
                  </Action>
                </BoxActions>
              ) : (
                <BoxActions>
                  <Action
                    onClick={() => this.props.toggleBoxStatus(box.key, true)}
                    color={`green`}
                  >
                    Close Box
                  </Action>
                  <ActionLink to={`boxes/${box.key}`} color={`blue`}>
                    Edit Items
                  </ActionLink>
                  <Action
                    onClick={() => this.props.deleteBox(box.key)}
                    color={`red`}
                  >
                    Delete Box
                  </Action>
                </BoxActions>
              )}
            </BoxContent>
          )}
      </Container>
    );
  }
}
