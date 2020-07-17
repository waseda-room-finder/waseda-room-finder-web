import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import PropTypes from "prop-types";

import { InvisibleButton } from "../../styled-components/Button";

const ExtendedInvisibleButton = styled(InvisibleButton)`
  position: fixed;
  z-index: 2000;
  width: 56px;
  height: 56px;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: #b51e36;
  color: white;
  border-radius: 30px;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.4), 0 6px 10px 0 rgba(0, 0, 0, 0.2),
    0 1px 18px 0 rgba(0, 0, 0, 0.15);
  -webkit-tap-highlight-color: transparent;
`;

const FilterButton = ({ isModalOpen, handleToggleModal }) => {
  return (
    <ExtendedInvisibleButton onClick={handleToggleModal}>
      <FontAwesomeIcon
        icon={isModalOpen ? faTimes : faFilter}
        size="2x"
        transform="shrink-3"
      />
    </ExtendedInvisibleButton>
  );
};

export default FilterButton;

FilterButton.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleToggleModal: PropTypes.func.isRequired,
};
