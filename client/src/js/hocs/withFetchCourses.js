import React from 'react';
import { connect } from 'react-redux';

import { fetchCourses, hydrateAddedCourses } from '../actions/syllabus';
import { getIsFetching, getFetchedIds, getFetchedById, getError } from '../reducers/fetchedCourses';
import { getProperties, getAddedCourses, getAddedCoursesWithProperties } from '../reducers/addedCourses';
import LoadingSpinner from '../components/LoadingSpinner';
import FetchError from '../components/FetchError';

const withFetchCourses = WrappedComponent => {
  class WithFetchCoursesComponent extends React.Component {
    componentDidMount() {
      if (!this.props.fetchedCourseIds.length) {
        this.props.fetchCourses();
      }
    }

    componentDidUpdate() {
      const { addedCourses, properties, fetchedCourseIds, fetchedCoursesById,
        hydrateAddedCourses } = this.props;
      // if addedCourses is not hydrated, properties is not empty, and courses are fetched
      if (!addedCourses.length &&
        properties.length &&
        fetchedCourseIds.length
      ) {
        hydrateAddedCourses(properties, fetchedCoursesById);
      }
    }

    render() {
      const { isFetching, fetchedCourseIds, fetchedCoursesById, error,
        addedCourses, properties, addedCoursesWithProperties,
        fetchCourses,} = this.props;

      if (isFetching && !fetchedCourseIds.length) {
        return <LoadingSpinner />;
      }
      if (error && !fetchedCourseIds.length) {
        return <FetchError onRetry={fetchCourses} />;
      }
      if (properties.length && !addedCourses.length) {
        return <LoadingSpinner message={"Initializing your added courses"}/>;
      }

      const fetchedCourses = fetchedCourseIds.map(id => (
        fetchedCoursesById[id]
      ));

      return (
        <WrappedComponent
          fetchedCourses={fetchedCourses}
          addedCourses={addedCourses}
          addedCoursesWithProperties={addedCoursesWithProperties}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      isFetching: getIsFetching(state.fetchedCourses),
      fetchedCourseIds: getFetchedIds(state.fetchedCourses),
      fetchedCoursesById: getFetchedById(state.fetchedCourses),
      error: getError(state.fetchedCourses),
      addedCourses: getAddedCourses(state.addedCourses),
      properties: getProperties(state.addedCourses),
      addedCoursesWithProperties: getAddedCoursesWithProperties(state.addedCourses)
    };
  };

  const mapDispatchToProps = {
    fetchCourses,
    hydrateAddedCourses
  };

  return connect(mapStateToProps, mapDispatchToProps)(
    WithFetchCoursesComponent
  );
}

export default withFetchCourses;