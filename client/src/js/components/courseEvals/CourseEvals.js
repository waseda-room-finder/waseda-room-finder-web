import React from 'react';
import qs from 'qs';
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import axios from "axios";
// import { normalize } from "normalizr";
// import { coursesSchema } from "../../data/schema";
import { wasetimeApiStatic } from "../../config/api";

import { media } from "../../styled-components/utils";
import { RowWrapper } from "../../styled-components/Wrapper";
import { Overlay } from "../../styled-components/Overlay";
import { Wrapper } from "../../styled-components/Wrapper";
import FetchedCourseItem from "../../containers/syllabus/FetchedCourseItem";
import CourseEvalsGroup from './CourseEvalsGroup';
import EvalsList from "./EvalsList";
import EvaluationStars from "./EvaluationStars";
import withFetchCourses from "../../hocs/withFetchCourses";

export const LongWrapper = styled(Wrapper)`
  flex: 0 0 70%;
`;

export const ShortWrapper = styled(Wrapper)`
  flex: 0 0 30%;
`;

const ExtendedOverlay = styled(Overlay)`
  padding: 0 25px;
`;

const StyledSubHeading = styled("h2")`
  align-self: flex-start;
  margin-top: 1rem 0px;
  padding-left: 1rem;
  border-left: 5px solid rgb(148, 27, 47);
  font-size: 2.5rem;
  font-weight: 300;
  ${media.phone`font-size: 2rem;`};
`;

const EvalsListWrapper = styled("div")`
  max-height: 60vh;
  overflow-y: auto;
`;

const RelatedCoursesWrapper = styled("div")`
  max-height: 80vh;
  overflow-y: auto;
`;

const EvaluationScalesRow = styled("div")`
  display: flex;
  flex-direction: row;
  font-size: 1.5em;
  background: #eee;
`;

const EvaluationScale = styled("div")`
  flex: 2;
  padding: 1rem 0px;
  text-align: center;
  color: #333;
`;

async function getAllCourses () {
  // const res = await axios.get(wasetimeApiStatic.courseListAll);
  // return normalize(res.data, coursesSchema).entities['courses'];
  return [];
}

const getCourse = (fetchedCourses, courseID) => {
  // Todo: get the course from courses list by id
  // return fetchedCourses[courseID];

  return {
    "_id":"2603013002012020260301300226",
    "course_code": 'INFP31ZL',
    "year":2020,
    "term":"springSem",
    "title":"Software Engineering A",
    "title_jp":"ソフトウェア工学A",
    "instructor":"FUKAZAWA, Yoshiaki/WASHIZAKI, Hironori",
    "instructor_jp":"深澤 良彰/鷲崎 弘宜",
    "occurrences":[
      {
         "day":5,
         "start_period":2,
         "end_period":2,
         "building":"63",
         "classroom":"202",
         "location":"63-202"
      }
    ],
    "lang":"JP",
    "keys":[
      {
         "school":"FSE",
         "key":"2603013002012020260301300226"
      }
    ]
  };
}

const getCourseCode = course => course["course_code"];

const getCourseKey = course => course["_id"].substring(0, 10);

async function getCourseEvals (courseCode) {
  try {
    const res = await axios.get(wasetimeApiStatic.courseEvalsBaseURL + courseCode);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

const getRelatedCourses = (fetchedCourses, courseCode, thisCourseKey) => {
  // Todo: Get related courses with course code
  // let relatedCourses = fetchedCourses.filter(c => c.course_code === courseCode && getCourseKey(c) !== thisCourseKey);

  return [
    {
      "_id":"2603033019012020260303301926",
      "course_code": 'INFP31ZL',
      "year":2020,
      "term":"fallSem",
      "title":"Software Engineering B",
      "title_jp":"ソフトウェア工学B",
      "instructor":"HAGIMOTO, Junzo/HIRANABE, Kenji/FUKAZAWA, Yoshiaki/WASHIZAKI, Hironori",
      "instructor_jp":"萩本 順三/平鍋 健児/深澤 良彰/鷲崎 弘宜",
      "occurrences":[
        {
           "day":3,
           "start_period":5,
           "end_period":5,
           "building":"-1",
           "classroom":"undecided",
           "location":"-1-undecided"
        }
      ],
      "lang":"JP",
      "keys":[
        {
           "school":"FSE",
           "key":"2603033019012020260303301926"
        }
      ]
    },
    {
      "_id":"26GC02300301202026MC03300926",
      "course_code": 'INFP31ZL',
      "year":2020,
      "term":"fallSem",
      "title":"Software Engineering",
      "title_jp":"Software Engineering",
      "instructor":"ARCAINI, Paolo/KOBAYASHI, Tsutomu/FUKAZAWA, Yoshiaki/HONIDEN, Shinichi/WASHIZAKI, Hironori",
      "instructor_jp":"アルカイニ パオロ/小林 努/深澤 良彰/本位田 真一/鷲崎 弘宜",
      "occurrences":[
        {
           "day":1,
           "start_period":3,
           "end_period":3,
           "building":"-1",
           "classroom":"undecided",
           "location":"-1-undecided"
        }
      ],
      "keywords":[
        "IPSE"
      ],
      "lang":"EN",
      "keys":[
        {
           "school":"FSE",
           "key":"26GC02300301202026MC03300926"
        }
      ]
    }
  ];
}

const filterCourseEvalsByKey = (evaluations, courseKey) => evaluations.filter(e => e.course_key === courseKey);

class CourseEvals extends React.Component {
  state = {
    thisCourse: {},
    relatedCourses: [],
    courseEvals: [],
    thisCourseEvals: [],
    avgSatisfaction: 0,
    avgDifficulty: 0,
    avgBenefit: 0,
    isLoaded: false
  };

  async componentDidMount () {
    const courseID = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).courseID;
    const searchLang = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).searchLang;

    const thisCourse = getCourse(this.props.fetchedCourses, courseID);
    const thisCourseCode = getCourseCode(thisCourse);
    const thisCourseKey = getCourseKey(thisCourse);
    const relatedCourses = getRelatedCourses(this.props.fetchedCourses, thisCourseCode, thisCourseKey);

    const evalsWithSameCode = await getCourseEvals(thisCourseCode);
    const thisCourseEvals = filterCourseEvalsByKey(evalsWithSameCode, thisCourseKey);

    let satisfactionSum = 0, difficultySum = 0, benefitSum = 0;
    thisCourseEvals.forEach(evaluation => {
      satisfactionSum += evaluation.satisfaction;
      difficultySum += evaluation.difficulty;
      benefitSum += evaluation.benefit;
    });
    
    const avgSatisfaction = Math.round(satisfactionSum / thisCourseEvals.length * 2) / 2;
    const avgDifficulty = Math.round(difficultySum / thisCourseEvals.length * 2) / 2;
    const avgBenefit = Math.round(benefitSum / thisCourseEvals.length * 2) / 2;

    this.setState({
      thisCourse: thisCourse,
      relatedCourses: relatedCourses,
      courseEvals: evalsWithSameCode,
      thisCourseEvals: thisCourseEvals,
      avgSatisfaction: avgSatisfaction,
      avgDifficulty: avgDifficulty,
      avgBenefit: avgBenefit,
      searchLang: searchLang,
      isLoaded: true
    });
  }

  render () {
    const { thisCourse, relatedCourses, courseEvals, thisCourseEvals, avgSatisfaction, avgDifficulty, avgBenefit, isLoaded, searchLang } = this.state;
    return (
      <RowWrapper>
        <Helmet>
          <title>WasedaTime - Course Evaluations</title>
          <meta
            name="description"
            content="Latest Course Evaluations by Waseda Students."
            />
          <meta property="og:title" content="WasedaTime - Course Evaluations" />
          <meta
            property="og:description"
            content="Latest Course Evaluations by Waseda Students."
            />
          <meta property="og:site_name" content="WasedaTime - Course Evaluations" />
        </Helmet>

        <LongWrapper>
          <ExtendedOverlay>
            <div>
              <br />
              {
                isLoaded && <FetchedCourseItem searchTerm={""} searchLang={searchLang} course={thisCourse} isInCourseEvalsPage={true} />
              }


              <StyledSubHeading>
                Evaluations
              </StyledSubHeading>
              <EvalsListWrapper>
                <EvaluationScalesRow>
                  <EvaluationScale>
                    Satisfaction{' '}<EvaluationStars scale={avgSatisfaction} />
                  </EvaluationScale>
                  <EvaluationScale>
                    Difficulty{' '}<EvaluationStars scale={avgDifficulty} />
                  </EvaluationScale>
                  <EvaluationScale>
                    Benefit{' '}<EvaluationStars scale={avgBenefit} />
                  </EvaluationScale>
                  <EvaluationScale style={{ flex: '1', color: '#777', fontSize: '0.7em', paddingTop: '1.5rem' }}>
                    {thisCourseEvals.length} Evaluations
                  </EvaluationScale>
                </EvaluationScalesRow>
                <EvalsList evaluations={thisCourseEvals} />
              </EvalsListWrapper>

            </div>
          </ExtendedOverlay>
        </LongWrapper>

        <ShortWrapper>
          <ExtendedOverlay>
            <StyledSubHeading>
              Related courses
            </StyledSubHeading>
            <RelatedCoursesWrapper>
              {
                relatedCourses.map(relatedCourse => <CourseEvalsGroup
                  course={relatedCourse}
                  evaluations={filterCourseEvalsByKey(courseEvals, getCourseKey(relatedCourse))}
                  key={getCourseKey(relatedCourse)}
                />)
              }
            </RelatedCoursesWrapper>
          </ExtendedOverlay>
        </ShortWrapper>
      </RowWrapper>
    );
  }
};

export default withFetchCourses(CourseEvals);