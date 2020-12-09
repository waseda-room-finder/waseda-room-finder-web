import { combineReducers } from "redux";

import {
  HYDRATE_ADDED_COURSES,
  ADD_COURSE,
  CHANGE_COURSES_SORTING_OPTION,
} from "../actions/types";
import addedSemesterCourses, * as fromSemesterCourses from "./addedSemesterCourses";

// Higher-order reducer.
// https://redux.js.org/recipes/structuringreducers/reusingreducerlogic
const createSemesterWrapperReducer = (
  reducerFunction,
  reducerName,
  reducerSemestersRegex
) => {
  return (state, action) => {
    let semester = null;
    switch (action.type) {
      case ADD_COURSE:
        semester = action.payload.semester;
        if (semester.match(reducerSemestersRegex)) {
          // reducerSemesters.includes(semester)
          return reducerFunction(state, action);
        }
        return state;
      case HYDRATE_ADDED_COURSES:
        const { payload, ...actionRest } = action;
        const { prefs, ...payloadRest } = payload;
        const newPayload = {
          prefs: payload.prefs[reducerName],
          ...payloadRest,
        };
        const newAction = { payload: newPayload, ...actionRest };
        return reducerFunction(state, newAction);
      case CHANGE_COURSES_SORTING_OPTION:
        semester = action.payload.semester;
        return semester === reducerName
          ? reducerFunction(state, action)
          : state;
      default:
        return reducerFunction(state, action);
    }
  };
};

const addedCourses = combineReducers({
  fall: createSemesterWrapperReducer(addedSemesterCourses, "fall", /2|3|f/g),
  spring: createSemesterWrapperReducer(
    addedSemesterCourses,
    "spring",
    /0|1|f/g
  ),
});

export default addedCourses;

export const getPrefs = (state) => ({
  fall: fromSemesterCourses.getPrefs(state.fall),
  spring: fromSemesterCourses.getPrefs(state.spring),
});

export const getIsPrefsEmpty = (state) => {
  return (
    !fromSemesterCourses.getPrefs(state.fall).length &&
    !fromSemesterCourses.getPrefs(state.spring).length
  );
};

export const getAddedCourses = (state) => ({
  fall: fromSemesterCourses.getAddedCourses(state.fall),
  spring: fromSemesterCourses.getAddedCourses(state.spring),
});

export const getIsAddedCoursesEmpty = (state) => {
  return (
    !fromSemesterCourses.getAddedCourses(state.fall).length &&
    !fromSemesterCourses.getAddedCourses(state.spring).length
  );
};

export const getAddedCoursesAndPrefs = (state) => ({
  fall: fromSemesterCourses.getAddedCoursesAndPrefs(state.fall),
  spring: fromSemesterCourses.getAddedCoursesAndPrefs(state.spring),
});

export const getById = (state) => ({
  ...fromSemesterCourses.getById(state.fall),
  ...fromSemesterCourses.getById(state.spring),
});
