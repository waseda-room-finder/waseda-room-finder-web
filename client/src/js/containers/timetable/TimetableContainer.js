import React from "react";
import { Helmet } from "react-helmet";

import { Wrapper } from "../../styled-components/Wrapper";
import Timetable from "../../components/timetable/Timetable";
import SemesterSwitcher from "../../components/timetable/SemesterSwitcher";
import withFetchCourses from "../../hocs/withFetchCourses";
import { withNamespaces } from "react-i18next";

class TimetableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.semesters = [
      { title: "Fall Semester", key: "fall" },
      { title: "Spring Semester", key: "spring" }
    ];
    this.state = {
      semesterIndex: 1
    };
  }

  handleIncreaseSemesterIndex = event => {
    event.preventDefault();
    const newSemesterIndex =
      (this.state.semesterIndex + 1) % this.semesters.length;
    this.setState({
      semesterIndex: newSemesterIndex
    });
  };

  handleDecreaseSemesterIndex = event => {
    event.preventDefault();
    const newSemesterIndex = Math.abs(
      (this.state.semesterIndex - 1) % this.semesters.length
    );
    this.setState({
      semesterIndex: newSemesterIndex
    });
  };

  render() {
    const { t } = this.props;
    const { title, key } = this.semesters[this.state.semesterIndex];
    const addedCoursesAndPrefs = this.props.addedCoursesAndPrefs[key];

    return (
      <Wrapper>
        <Helmet>
          <title>WasedaTime - Timetable</title>
          <meta
            name="description"
            content="Create Your Own Timetable at Waseda University."
          />
          <meta property="og:title" content="WasedaTime - Timetable" />
          <meta
            property="og:description"
            content="Create Your Own Timetable at Waseda University."
          />
          <meta property="og:site_name" content="WasedaTime - Timetable" />
        </Helmet>
        <SemesterSwitcher
          semesterTitle={t(`timetable.${title}`)}
          handleIncreaseSemesterIndex={this.handleIncreaseSemesterIndex}
          handleDecreaseSemesterIndex={this.handleDecreaseSemesterIndex}
        />
        <Timetable
          addedCoursesAndPrefs={addedCoursesAndPrefs}
          semesterKey={key}
        />
      </Wrapper>
    );
  }
}

export default withNamespaces("translation")(
  withFetchCourses(TimetableContainer)
);
