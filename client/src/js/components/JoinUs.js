import React from "react";
import { Helmet } from "react-helmet";
import { Wrapper } from "../styled-components/Wrapper";
import { Overlay } from "../styled-components/Overlay";
import styled from "styled-components";
import { Header, List, Icon, Segment, Divider } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faUserCog } from "@fortawesome/free-solid-svg-icons";

const ExtendedOverlay = styled(Overlay)`
  align-items: center;
  background-color: #fff;
  padding: 0 20vw;
  color: #666;
`;

const TopColoredHeader = styled(Header)`
  margin-top: 1rem !important;
  color: #555 !important;
  margin-bottom: 3rem !important;
`;

const ButtomColoredHeader = styled(Header)`
  margin-top: 3rem !important;
  margin-bottom: 1em !important;
  color: #555 !important;
`;

const DividerTitle = styled(Divider)`
  width: 60vw;
  margin-top: 5em !important;
  margin-bottom: 5em !important;
`;

const TextSegment = styled(Segment)`
  font-size: 10em;
  width: 60vw;
  color: #888 !important;
`;

const JoinUs = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>WasedaTime - Join Us</title>
        <meta
          name="description"
          content="Recruitment document for WasedaTime."
        />
        <meta property="og:title" content="WasedaTime - Join Us" />
        <meta
          property="og:description"
          content="Recruitment document for WasedaTime."
        />
        <meta property="og:site_name" content="WasedaTime - Join Us" />
      </Helmet>

      <ExtendedOverlay>
        <TopColoredHeader size="huge" icon textAlign="center">
          <Icon name="users" circular />
          WasedaTime is back, AND WE WANT YOU!
        </TopColoredHeader>
        <p>
          WasedaTime has been working on supporting students' academic
          activities since launching. Its well-tested Syllabus Search feature is
          favored by thousands of students. More than 50% of international
          students are using this website. We never expect this could happen and
          are always grateful for all our users.
        </p>
        <p>
          With the quick iterations of the product, WasedaTime is running short
          of talented minds! We want to extend a sincere invitation to you, and
          let's build this fantastic product together! WasedaTime is a 100%
          student-run, open-source project.
        </p>

        <DividerTitle horizontal>
          <Header size="huge">
            <FontAwesomeIcon icon={faUserCog} /> Technology Roles
          </Header>
        </DividerTitle>
        <List bulleted size="big">
          <List.Item>General Software Developer / Apprentice</List.Item>
          <List.Item>Frontend Developer / Apprentice</List.Item>
          <List.Item>Backend Developer / Apprentice</List.Item>
          <List.Item>Infrastructure Developer / Apprentice</List.Item>
        </List>
        <p>
          We are looking for experienced developers, but we also love to provide
          mentorship to passionate beginners with little background! You will be
          working with a talented team whose members entered the world's top 4
          CS schools and interned at recognized employers in the industry:
          Google, Tencent, Yahoo, Bilibili, etc. They are happy to provide
          guidance in your career development :D
        </p>

        <DividerTitle horizontal>
          <Header size="huge">
            <FontAwesomeIcon icon={faUserTie} /> Performance Marketing &
            Business Operations
          </Header>
        </DividerTitle>
        <List bulleted size="big">
          <List.Item>Product management</List.Item>
          <List.Item>Marketing & Advertising</List.Item>
          <List.Item>Business expansion/liaison</List.Item>
          <List.Item>Finance</List.Item>
        </List>
        <p>
          The “Non-Tech” team builds bridges across technology to users. They
          transform WasedaTime from code to a vivid product. We are looking for
          innovative minds who possess outstanding analytical skills. You will
          be working with our excellent members who entered the world's top 10
          business schools and interned at prestigious companies: Morgan
          Stanley, Accenture, etc.
        </p>

        <DividerTitle horizontal>
          <Header size="huge">🤗 How to get started</Header>
        </DividerTitle>
        <p>
          We welcome students who are interested to send an email with a brief
          self-introduction or a CV/resume to the following address:
          wasedatime@gmail.com
          <br />
          <br />
          The self-introduction should contain your name, department, year,
          interests, and highlight projects (if possible). You're welcome to add
          more information!
        </p>

        <ButtomColoredHeader
          size="huge"
          textAlign="center"
          content="We look forward to hearing from you!"
        />
      </ExtendedOverlay>
    </Wrapper>
  );
};

export default JoinUs;
