// todo use binary switch
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { InvisibleButton } from "@bit/wasedatime.core.ts.styles.button";
import { RowWrapper } from "@bit/wasedatime.core.ts.styles.wrapper";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import QuarterSwitch from "./QuarterSwitch";

const ExtendedRowWrapper = styled(RowWrapper)`
  flex: none;
  justify-content: center;
  font-size: 1.3em;
  ${media.phone`
    font-size: 1.1em;
  `};
  padding: 80px 0 0.1em 0;
  ${media.tablet`padding-top: 1rem;`}
`;

const ExtendedInvisibleButton = styled(InvisibleButton)`
  color: #000;
  &:hover {
    color: #b51e36;
  }
  &:active {
    color: #000;
  }
  ${media.tablet`
    &:focus {
        color: #000;
    }`};
  ${media.phone`
    &:focus {
      color: #000;
    }
  `};
`;

const SemesterTitle = styled("div")`
  width: 10em;
  text-align: center;
`;

interface Props {
  semesterTitle: string;
  semesterKey: string;
  selectedQuarter: string;
  handleIncreaseSemesterIndex: (event: any) => void;
  handleDecreaseSemesterIndex: (event: any) => void;
  handleToggleQuarter: (quarter: string) => void;
}

const SemesterSwitcher = ({
  semesterTitle,
  semesterKey,
  selectedQuarter,
  handleIncreaseSemesterIndex,
  handleDecreaseSemesterIndex,
  handleToggleQuarter,
}) => {
  return (
    <ExtendedRowWrapper>
      <ExtendedInvisibleButton onClick={handleIncreaseSemesterIndex}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} size="1x" />
      </ExtendedInvisibleButton>
      <SemesterTitle>{semesterTitle}</SemesterTitle>
      <ExtendedInvisibleButton
        style={{ marginRight: "2em" }}
        onClick={handleDecreaseSemesterIndex}
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" />
      </ExtendedInvisibleButton>
      <QuarterSwitch
        semesterKey={semesterKey}
        selectedQuarter={selectedQuarter}
        handleToggleQuarter={handleToggleQuarter}
      />
    </ExtendedRowWrapper>
  );
};

export default SemesterSwitcher;