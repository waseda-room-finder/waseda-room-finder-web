import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { SyllabusKey } from '../../constants/syllabus-data';
import CourseItem from '../CourseItem';
import MediaQuery from "react-responsive";
import { media, sizes } from '@bit/wasedatime.core.ts.utils.responsive-utils';
import { parseCourse } from '../../utils/milestone';

const Cover = styled.img`
  max-height: 100vh;
  ${media.tablet`max-height: calc(100vh - 50px);`}
  margin: auto;
`;

const get_SILS_category = (course) => {
  if (course[SyllabusKey.CATEGORY].includes("First Year Seminar")) return "First Year Seminar";
  else if (course[SyllabusKey.LEVEL] === "Beginner, initial or introductory") return "Introductory Subjects";
  else if (["Intermediate Seminar", "Advanced Seminar", "Intermediate Subjects", "Advanced Subjects"].includes(course[SyllabusKey.CATEGORY])) return course[SyllabusKey.CATEGORY];
  else if (course[SyllabusKey.CATEGORY] === "Other Foreign Languages") return "Foreign Languages";
  else return "Elective Subjects";
}

const getGroupedCourses = (courses) => {
  let groupedCourses = {
    "First Year Seminar": [],
    "Intermediate Seminar": [],
    "Advanced Seminar": [],
    "Introductory Subjects": [],
    "Intermediate Subjects": [],
    "Advanced Subjects": [],
    "Foreign Languages": [],
    "Elective Subjects": []
  };
  courses.forEach(c => {
    const category = get_SILS_category(c);
    groupedCourses[category].push(c);
  });
  return groupedCourses;
}

const Course = ({ course }) => (
  <CourseItem
    course={course}
    searchLang="en"
    searchTerm=""
    isAddable={false}
    handleOnClick={() => {}}
    expandable={false}
    isMilestone={true}
    reviews={course.reviews || []}
  />
)

const SILS = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    try {
      fetch("https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/reviews/sils_reviews.json")
        .then(res => res.json())
        .then(res => {
          setCourses(res.filter(c => c.sem.match(new Date().getMonth() < 6 ? /0|1|f/g : /2|3|f/g)).map(c => parseCourse(c, "SILS")));
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const groupedCourses = getGroupedCourses(courses);

  return (
    <div>
      <MediaQuery maxWidth={sizes.phone}>
        {
          matches => matches ? (
            <Cover src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils-mobile.jpg" />
          ) : (
            <Cover src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils.jpg" />
          )
        }
      </MediaQuery>
      <div style={{ padding: "0px 10vw" }}>
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils-cat-1.jpg" width="300" height="150" />
        {groupedCourses["First Year Seminar"].map(c => <Course course={c} />)}
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils-cat-2.jpg" width="300" height="150" />
        {groupedCourses["Intermediate Seminar"].map(c => <Course course={c} />)}
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils-cat-3.jpg" width="300" height="150" />
        {groupedCourses["Advanced Seminar"].map(c => <Course course={c} />)}
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils-cat-4.jpg" width="300" height="150" />
        {groupedCourses["Introductory Subjects"].map(c => <Course course={c} />)}
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils-cat-5.jpg" width="300" height="150" />
        {groupedCourses["Intermediate Subjects"].map(c => <Course course={c} />)}
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils-cat-6.jpg" width="300" height="150" />
        {groupedCourses["Advanced Subjects"].map(c => <Course course={c} />)}
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils-cat-7.jpg" width="300" height="150" />
        {groupedCourses["Foreign Languages"].map(c => <Course course={c} />)}
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/sils-cat-8.jpg" width="300" height="150" />
        {groupedCourses["Elective Subjects"].map(c => <Course course={c} />)}
      </div>
    </div>
  )
}

export default SILS;