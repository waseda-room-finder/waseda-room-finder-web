import {
  SEARCH_COURSES,
  FETCH_COURSE_BY_ID,
  FETCH_NISHI_BLDGS,
  FETCH_BLDG_CURRENT_CLASSROOMS
} from '../actions/types';

const initialState = {
  searchTerm: '',
  coursePage: {},
  nishiBldgIds: [],
  nishiBldgsById: [],
  bldgClassroomIds: [],
  bldgClassroomsById: [],
  bldgOccupiedClassroomIds: [],
  bldgOccupiedClassroomsById: []
};

export default function app(state = initialState, action) {
  switch (action.type) {
    case SEARCH_COURSES:
      return {
        ...state,
        searchTerm: action.payload.searchTerm
      };
    case FETCH_COURSE_BY_ID:
      return {
        ...state,
        coursePage: action.payload.coursePage
      };
    case FETCH_NISHI_BLDGS:
      return {
        ...state,
        nishiBldgIds: action.payload.nishiBldgIds,
        nishiBldgsById: action.payload.nishiBldgsById
      };
    case FETCH_BLDG_CURRENT_CLASSROOMS:
      return {
        ...state,
        bldgClassroomIds: action.payload.bldgClassroomIds,
        bldgClassroomsById: action.payload.bldgClassroomsById,
        bldgOccupiedClassroomIds: action.payload.bldgOccupiedClassroomIds,
        bldgOccupiedClassroomsById: action.payload.bldgOccupiedClassroomsById
      };
    default:
      return state;
  }
}