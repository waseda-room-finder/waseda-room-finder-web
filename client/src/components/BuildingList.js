import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BuildingItem from '../components/BuildingItem';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  background-image: url(${props => props.backgroundUrl});
  background-position: center, center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Overlay = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding: 40px 25px 25px 25px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const TitleWrapper = styled('div')`
  align-self: flex-start;
  margin-top: 30px;
  margin-left: -40px;
  padding: 3px 10px;
  border-radius: 0px 8px 8px 0px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Title = styled('h3')`
  margin: 0 0;
  padding-left: 25px;
  font-family: 'Times';
  font-size: 3.2rem;
  font-weight: lighter;
  color: #ffffff;
`;

const StyledList = styled('ul')`
  text-align: center;
  padding: 0;
  list-style: none;
  list-style-type: none;
`;

const BuildingList = props => {
  if (props.bldgNames !== 0) {
    const listItems = props.bldgNames.map(bldgName => (
      <BuildingItem key={bldgName} name={bldgName} />
    ));
    return (
      <Wrapper backgroundUrl={props.backgroundUrl}>
        <Overlay>
          <TitleWrapper>
            <Title>{props.name}</Title>
          </TitleWrapper>
          <StyledList>{listItems}</StyledList>
        </Overlay>
      </Wrapper>
    );
  } else {
    return <div />;
  }
};

export default BuildingList;

BuildingList.propTypes = {
  name: PropTypes.string.isRequired,
  bldgNames: PropTypes.array.isRequired,
  backgroundUrl: PropTypes.string.isRequired
};