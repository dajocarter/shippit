import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faBoxCheck, faBoxOpen } from "@fortawesome/fontawesome-pro-light";

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

const Box = props => {
  let numItems = 0;
  if (props.items.length) {
    const boxItems = Array.from(props.items).filter(
      item => item.box === props.box.key
    );
    numItems = boxItems.length;
  }

  const { box } = props;

  return (
    <Container showingItems={props.showingItems}>
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
          <BoxTitle>{box.name}</BoxTitle>
          <BoxDetails>
            <Detail>{box.height}"</Detail> H x <Detail>{box.width}"</Detail> W x{" "}
            <Detail>{box.length}"</Detail> L
          </BoxDetails>
          <BoxDetails>
            <Detail>{numItems}</Detail> items
          </BoxDetails>
        </BoxInfo>
        {box.key &&
          !props.showingItems && (
            <div>
              {box.closed ? (
                <BoxActions>
                  <Action
                    onClick={() => props.toggleBoxStatus(box.key, false)}
                    color={`blue`}
                  >
                    Open Box
                  </Action>
                  <Action
                    onClick={() => props.deleteBox(box.key)}
                    color={`red`}
                  >
                    Delete Box
                  </Action>
                </BoxActions>
              ) : (
                <BoxActions>
                  <Action
                    onClick={() => props.toggleBoxStatus(box.key, true)}
                    color={`green`}
                  >
                    Close Box
                  </Action>
                  <Action>
                    <ActionLink to={`boxes/${box.key}`} color={`blue`}>
                      Edit Items
                    </ActionLink>
                  </Action>
                  <Action
                    onClick={() => props.deleteBox(box.key)}
                    color={`red`}
                  >
                    Delete Box
                  </Action>
                </BoxActions>
              )}
            </div>
          )}
      </BoxContent>
    </Container>
  );
};

export default Box;
