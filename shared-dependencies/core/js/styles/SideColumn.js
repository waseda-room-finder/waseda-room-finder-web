import styled from "styled-components";

const SideColumn = styled("div")`
  display: flex;
  flex-direction: column;
  flex: ${(props) => `0 0 ${props.flexBasis};`};
`;

export default SideColumn;