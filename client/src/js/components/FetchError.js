import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Wrapper } from "../styled-components/Wrapper";
import { Button } from "../styled-components/Button";
import { Overlay } from "../styled-components/Overlay";

const ExtendedWrapper = styled(Wrapper)`
  flex: 1 0 0;
`;

const ExtendedOverlay = styled(Overlay)`
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 25px;
`;

const FetchError = ({ onRetry }) => {
  return (
    <ExtendedWrapper>
      <ExtendedOverlay>
        <h3>Uh oh, something went wrong.</h3>
        <Button onClick={onRetry}>Retry</Button>
        <p>
          Kindly <a href="mailto:wasedatime@gmail.com">send me an email</a> if
          this keeps happening.
        </p>
      </ExtendedOverlay>
    </ExtendedWrapper>
  );
};

export default FetchError;

FetchError.propTypes = {
  onRetry: PropTypes.func.isRequired,
};
