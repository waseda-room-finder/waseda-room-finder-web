import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { SyllabusKey } from '../../constants/syllabus-data';
import CourseItem from '../CourseItem';
import { media, sizes } from '@bit/wasedatime.core.ts.utils.responsive-utils';
import MediaQuery from "react-responsive";
import { parseCourse } from '../../utils/milestone';

const Cover = styled.img`
  max-height: 100vh;
  ${media.tablet`max-height: calc(100vh - 50px);`}
  margin: auto;
`;

const GroupA_courses = [
  "History of Philosophy",
  "Introduction to Logic",
  "History of Japan",
  "Introduction to Ethics",
  "Introduction to Social and Political Thought",
  "Philosophy of Science",
  "Topics in History and Philosophy of Science",
  "Great Books of the West",
  "Great Books of the East",
  "Great Art of the West",
  "Great Art of the East",
  "Topics in Art and Literature",
  "Japanese Civil Law",
  "Jurisprudence",
  "Comparative Politics",
  "International Relations",
  "Social and Political Theory",
  "Introduction to Macroeconomics",
  "Introduction to Microeconomics",
  "Introduction to Game Theory",
  "Topics in Economics and Political Science",
  "History of Pre-Modern Japan",
  "History of Modern Japan",
  "History of Contemporary Japan",
  "History of China",
  "History of East Asia",
  "History of Western Civilization to the Renaissance",
  "History of Western Civilization since the Renaissance",
  "Topics in History",
  "Introduction to Logic",
  "Language, Logic, and Mind",
  "History of Science",
  "Philosophy of Science",
  "Topics in History and Philosophy of Science",
  "Ethics",
  "Ancient and Medieval Philosophy",
  "Modern and Contemporary Philosophy",
  "Introduction to Religion",
  "Introduction to Christianity",
  "Religion in Japan",
  "Science and Religion",
  "Topics in Philosophy and Religion",
  "Japanese 1",
  "Japanese 2"
]
const GroupB_courses = [
  "Calculus",
  "Linear Algebra",
  "Ordinary Differential Equations",
  "Vector Calculus",
  "Complex Analysis",
  "Fourier Analysis",
  "Introduction to Probability and Statistics",
  "General Physics",
  "General Chemistry",
  "Introduction to Bioscience",
  "Mind Biology",
  "Science and Engineering Laboratory",
  "Introduction to C Programming",
  "Introduction to Java Programming",
  "Introduction to Fortran Programming",
  "C Programming",
  "Java Programming",
  "Fortran Programming"
]

const get_Rikou_category = (course) => {
  if (GroupA_courses.some(title => (course[SyllabusKey.TITLE]).startsWith(title))) return "Group A";
  else if (GroupB_courses.some(title => course[SyllabusKey.TITLE].startsWith(title))) return "Group B";
  else return "Group C";
}

const getGroupedCourses = (courses) => {
  let groupedCourses = {
    "Group A": [],
    "Group B": [],
    "Group C": []
  };
  courses.forEach(c => {
    const category = get_Rikou_category(c);
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

const Rikou = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let rikouCourses = [];
    try {
      ["FSE", "CSE", "ASE"].forEach(school => {
        fetch(`https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/reviews/${school.toLowerCase()}_reviews.json`)
          .then(res => res.json())
          .then(res => {
            rikouCourses = rikouCourses.concat(res.filter(c => c.sem.match(new Date().getMonth() < 6 ? /0|1|f/g : /2|3|f/g)).map(c => parseCourse(c, school)));
            setCourses(rikouCourses);
          })
          .catch(err => console.log(err));
      })
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
            <Cover src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/rikou-mobile.jpg" />
          ) : (
            <Cover src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/rikou.jpg" />
          )
        }
      </MediaQuery>
      <div style={{ padding: "0px 10vw" }}>
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/rikou-cat-1.jpg" width="300" height="150" />
        {groupedCourses["Group A"].map(c => <Course course={c} />)}
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/rikou-cat-2.jpg" width="300" height="150" />
        {groupedCourses["Group B"].map(c => <Course course={c} />)}
        <img src="https://wasedatime-milestone.s3-ap-northeast-1.amazonaws.com/images/rikou-cat-3.jpg" width="300" height="150" />
        {groupedCourses["Group C"].map(c => <Course course={c} />)}
      </div>
    </div>
  )
}

export default Rikou;