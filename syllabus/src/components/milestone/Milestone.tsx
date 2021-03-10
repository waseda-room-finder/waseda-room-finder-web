import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { SyllabusKey } from "../../constants/syllabus-data";
import rawReviews from "../../constants/reviews.json"
import schoolCodeMap from '../../constants/school-code';
import { ReduxRootState } from "../../redux/reducers";
import { Course } from '../../types/course';
import { getFetchedCoursesList } from '../../redux/reducers/fetchedCourses';
import PSE from './PSE';
import CJL from './CJL';
import SILS from './SILS';
import SSS from './SSS';
import Rikou from './Rikou';
import MediaQuery from "react-responsive";
import { media, sizes } from '@bit/wasedatime.core.ts.utils.responsive-utils';
import cover from "./images/cover.jpg";
import mobileCover from "./images/cover-mobile.jpg";
import { undergradSchoolNameIconMap, otherSchoolNameIconMap } from '@bit/wasedatime.syllabus.ts.constants.school-name-icon-map-en';

const SchoolSwitch = styled.img`
  cursor: pointer;
  margin: 0px 1em;
  ${media.tablet`width: 90px; margin: 0px; height: 90px;`}
  ${media.phone`width: 60px; margin: 0px; height: 60px;`}
`;

const RikouSchoolSwitch = styled.img`
  cursor: pointer;
  ${media.tablet`width: 45px; height: 45px;`}
  ${media.phone`width: 30px; height: 30px;`}
`;

const FSESchoolSwitch = styled(RikouSchoolSwitch)`
  margin: 30px 0px;
  ${media.tablet`margin: 22.5px 0px;`}
  ${media.tablet`margin: 15px 0px;`}
`;

interface ReduxStateProps {
  fetchedCourses: Course[],
  fetchedCoursesBySchool: {
    [school: string]: {
      [id: string]: Course
    }
  };
}

class Milestone extends React.Component<ReduxStateProps> {
  state = {
    isLoaded: false,
    school: "",
    courseKeys: rawReviews.map(r => r.Item.course_key.S).filter((value, index, self) => self.indexOf(value) === index),
    courses: {},
    reviews: rawReviews.reduce(function (result, review) {
      if (!result[review.Item.course_key.S]) result[review.Item.course_key.S] = [];
      result[review.Item.course_key.S].push({
        benefit: parseInt(review.Item.benefit.N),
        comment_en: review.Item.comment_en.S,
        comment_ja: review.Item.comment_ja.S,
        comment_ko: review.Item.comment_ko.S,
        "comment_zh-CN": review.Item["comment_zh-CN"].S,
        "comment_zh-TW": review.Item["comment_zh-TW"].S,
        course_key: review.Item.course_key.S,
        created_at: review.Item.created_at.S,
        difficulty: parseInt(review.Item.difficulty.N),
        instructor: review.Item.instructor.S,
        instructor_jp: review.Item.instructor_jp.S,
        satisfaction: parseInt(review.Item.satisfaction.N),
        src_lang: review.Item.src_lang.S,
        title: review.Item.title.S,
        title_jp: review.Item.title_jp.S,
        uid: review.Item.uid.S,
        updated_at: review.Item.updated_at.S,
        year: parseInt(review.Item.year.N),
        school: schoolCodeMap[review.Item.course_key.S.substring(0, 2)]
      })
      return result;
    }, {})
  }
  
  render () {
    const { courseKeys, school } = this.state;
    const courses = this.props.fetchedCourses
      .filter(c => 
        courseKeys.includes(c[SyllabusKey.ID].substring(0, 12))
        && (
          c[SyllabusKey.SCHOOL] === school
          || school === "Rikou" && ["FSE", "CSE", "ASE"].includes(c[SyllabusKey.SCHOOL])
        )
        && c[SyllabusKey.TERM].match(/0|1|f/g)
      );
      return (
        <div className="theme-default">
          <div style={{ position: "absolute", width: "100%" }}>
            <div style={{ maxWidth: "1280px", display: "flex", justifyContent: "center" }}>
              <SchoolSwitch src={undergradSchoolNameIconMap["PSE"]} width="120" height="120" onClick={() => this.setState({ school: "PSE" })} />
              <SchoolSwitch src={undergradSchoolNameIconMap["SILS"]} width="120" height="120" onClick={() => this.setState({ school: "SILS" })} />
              <SchoolSwitch src={undergradSchoolNameIconMap["SSS"]} width="120" height="120" onClick={() => this.setState({ school: "SSS" })} />
              <SchoolSwitch src={otherSchoolNameIconMap["CJL"]} width="120" height="120" onClick={() => this.setState({ school: "CJL" })} />
              <div style={{ display: "flex" }}>
                <FSESchoolSwitch src={undergradSchoolNameIconMap["FSE"]} width="60" height="60" onClick={() => this.setState({ school: "Rikou" })} />
                <div>
                  <RikouSchoolSwitch src={undergradSchoolNameIconMap["CSE"]} width="60" height="60" onClick={() => this.setState({ school: "Rikou" })} />
                  <RikouSchoolSwitch src={undergradSchoolNameIconMap["ASE"]} width="60" height="60" onClick={() => this.setState({ school: "Rikou" })} />
                </div>
              </div>
            </div>
          </div>

          {!school && <MediaQuery maxWidth={sizes.tablet}>
            {(matches) =>
              matches ? (
                <img src={mobileCover} />
              ) : (
                <img src={cover} width="1280" height="720" />
              )
            }
          </MediaQuery>}
          
          {school === "PSE" && <PSE courses={courses} reviews={this.state.reviews} />}
          {school === "CJL" && <CJL courses={courses} reviews={this.state.reviews} />}
          {school === "SILS" && <SILS courses={courses} reviews={this.state.reviews} />}
          {school === "SSS" && <SSS courses={courses} reviews={this.state.reviews} />}
          {school === "Rikou" && <Rikou courses={courses} reviews={this.state.reviews} />}
        </div>
      )
  }
}

const mapStateToProps = (state: ReduxRootState) => ({
  fetchedCourses: getFetchedCoursesList(state.fetchedCourses.coursesBySchool),
  fetchedCoursesBySchool: state.fetchedCourses.coursesBySchool
});

export default connect<ReduxStateProps, {}>(
  mapStateToProps,
  null
)(Milestone);