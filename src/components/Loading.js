import React from "react";
import styled, { keyframes } from "styled-components";
import Icon from "@fortawesome/react-fontawesome";
import faSpinner from "@fortawesome/fontawesome-pro-solid/faSpinner";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const PageWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled(Icon)`
  flex: 0 0 auto;
  animation: ${rotate} 2s linear infinite;
  font-size: 8rem;
`;

const Loading = () => {
  return (
    <PageWrap>
      <Spinner icon={faSpinner} />
    </PageWrap>
  );
};

export default Loading;
