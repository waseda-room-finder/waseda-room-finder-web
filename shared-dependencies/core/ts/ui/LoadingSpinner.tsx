import React from "react";
import styled, { keyframes } from "styled-components";

import { Wrapper } from "@bit/wasedatime.core.ts.styles.wrapper";
import { Overlay } from "@bit/wasedatime.core.ts.styles.overlay";
import { Logo } from "@bit/wasedatime.core.ts.ui.logo";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ExtendedWrapper = styled(Wrapper)`
  flex: 1 0 0;
`;

const ExtendedOverlay = styled(Overlay)`
  align-items: center;
  justify-content: center;
  padding: 25px;
`;

const AnimatedLogo = styled(Logo)`
  height: 100px;
  width: 100px;
  transition: transform(0, 12vh);
  animation: ${spin} 3s linear infinite;
  transform-style: preserve-3d;
`;

const Description = styled("p")`
  font-size: 2rem;
  text-align: center;
`;

type Props = {
  message: string;
};

type State = {
  delayMessage: string;
};

class LoadingSpinner extends React.Component<Props, State> {
  _isMounted: boolean;
  constructor(props: Props) {
    super(props);

    // isMounted pattern to prevent setTimeOut executing after the component unmounts.
    this._isMounted = false;

    this.state = {
      delayMessage: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      setTimeout(() => {
        this._isMounted &&
          this.setState({
            delayMessage:
              "Slow network is detected. Please wait we're almost done 💪",
          });
      }, 4000);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <ExtendedWrapper>
        <ExtendedOverlay>
          <div>
            <AnimatedLogo alt="WasedaTime logo" />
          </div>
          <Description>{this.props.message || "Loading..."}</Description>
          <Description>{this.state.delayMessage}</Description>
        </ExtendedOverlay>
      </ExtendedWrapper>
    );
  }
}

export default LoadingSpinner;