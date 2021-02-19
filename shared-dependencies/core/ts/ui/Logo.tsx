import React from "react";
import styled from "styled-components";
import logo from "@bit/wasedatime.core.assets.img.logo";
import logoJp from "@bit/wasedatime.core.assets.img.logo-jp";

const StyledLogo = styled("img")`
  width: 120px;
  height: 120px;
`;

const StyledSmallLogo = styled("img")`
  width: 50px;
  height: 50px;
`;

export const Logo = () => <StyledLogo src={logo} width="120" height="120" alt="WasedaTime Logo" />;
export const LogoJp = () => <StyledLogo src={logoJp} width="120" height="120" alt="WasedaTime JP Logo" />;
export const SmallLogo = () => <StyledSmallLogo src={logo} width="50" height="50" alt="WasedaTime small Logo" />;
export const SmallLogoJp = () => <StyledSmallLogo src={logoJp} width="50" height="50" alt="WasedaTime small JP Logo" />;

export default Logo;