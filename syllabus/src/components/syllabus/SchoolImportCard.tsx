import React from "react";
import styled from "styled-components";
import { Card, Icon, Dimmer, Image } from "semantic-ui-react";

const SchoolCardWrapper = styled(Dimmer.Dimmable)`
  color: rgba(0, 0, 0, 0.05);
  width: 70px !important;

  &:hover i {
    color: rgba(0, 0, 0, 0.5);
  }

  .ui.dimmer {
    width: 100% !important;
    .content {
      width: 100% !important;
    }
  }
`;

interface Props {
  loaded: boolean;
  loading: boolean;
  schoolIcon: string;
  onDownload: () => void;
  isBannedToLoad: boolean;
  checked: boolean;
  onCheck: () => void;
}

const SchoolImportCard = ({
  loaded,
  loading,
  schoolIcon,
  onDownload,
  isBannedToLoad,
  checked,
  onCheck,
}: Props) => {
  const handleOnClick = () => {
    !isBannedToLoad && (loaded ? onCheck() : onDownload());
  };

  return (
    <SchoolCardWrapper as={Card} dimmed={!loaded} onClick={handleOnClick}>
      <Dimmer
        active={!loaded}
        style={{
          background: isBannedToLoad
            ? "rgba(0,0,0,0.5)"
            : "rgba(255,255,255,0.7)",
        }}
      >
        {!loaded && (
          <Icon
            name={loading ? "spinner" : "download"}
            style={{
              color: loading ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.05)",
            }}
          />
        )}
      </Dimmer>
      <Image
        src={schoolIcon}
        label={
          checked && { as: "a", corner: "left", icon: "check", color: "red" }
        }
        style={{
          border: loaded ? "2px solid rgba(0,0,200,0.4)" : "none",
          width: "70px",
          height: "70px",
        }}
        width="70"
        height="70"
      />
    </SchoolCardWrapper>
  );
};

export default SchoolImportCard;