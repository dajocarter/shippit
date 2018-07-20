import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faBoxFull,
  faBoxesAlt,
  faContainerStorage
} from "@fortawesome/fontawesome-pro-light";

const Box = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  text-align: center;
`;

const BoxTitle = styled.h1`
  margin-top: 0;
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const Detail = styled.span`
  flex: 0 0 auto;
`;

const FAicon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`;

const Move = ({ boxes, items }) => {
  const boxesData = Array.from(boxes).reduce(
    (allBoxes, currentBox) => {
      allBoxes["totalBoxes"]++;
      allBoxes["totalHeight"] += currentBox["height"];
      allBoxes["totalLength"] += currentBox["length"];
      allBoxes["totalWidth"] += currentBox["width"];
      return allBoxes;
    },
    {
      totalBoxes: 0,
      totalHeight: 0,
      totalLength: 0,
      totalWidth: 0
    }
  );

  return (
    <Box>
      <BoxTitle>Your Move</BoxTitle>
      <Details>
        <Detail>
          <FAicon icon={faBoxesAlt} />
          <strong>{boxesData["totalBoxes"]}</strong>
          {boxesData["totalBoxes"] === 1 ? ` Box` : ` Boxes`}
        </Detail>
        <Detail>
          <FAicon icon={faBoxFull} />
          <strong>{items.length}</strong>
          {items.length === 1 ? ` Item` : ` Items`}
        </Detail>
        <Detail>
          <FAicon icon={faContainerStorage} />
          <strong>
            {(
              (boxesData["totalHeight"] / 12) *
              (boxesData["totalLength"] / 12) *
              (boxesData["totalWidth"] / 12)
            ).toFixed(2)}
          </strong>{" "}
          ft<sup>3</sup>
        </Detail>
      </Details>
    </Box>
  );
};

export default Move;

Move.propTypes = {
  boxes: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      length: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired
    })
  ).isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};
