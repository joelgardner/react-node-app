import PropertyList from './PropertyList'
import { connect } from 'react-redux'
import { fetchEntities, showMore } from '../../Actions'
import React from 'react'
import { FETCH_LIMIT } from '../../Constants'

/*
  mapImmutableJsPropsToProps is a Higher-Order-Component which extracts props
  from the ImmutableJS object passed in from the Redux container below.
*/
const mapImmutableJsPropsToProps = WrappedComponent => ({ showing, properties, ...uiEvents }) =>
  <WrappedComponent {...{
    properties: properties.toJS(),
    ...uiEvents
  }} />

/*
  Redux Container is given the ImmutableJS structure and does not render its
  child component (which is our mapImmutableJsPropsToProps HOC above) unless
  it has changed.
*/
const mapStateToProps = state => ({
  properties: state.app.Property.get('properties'),
})

const mapDispatchToProps = dispatch => ({
  onFetchMore() {
    //dispatch(showMore())
    dispatch(fetchEntities('Property', 'listProperties'))
  },
  onChangeSort(sortAsc) {
    //dispatch(apiCall('listProperties', {}, { sortAsc }))
  }
})

const PropertyListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(mapImmutableJsPropsToProps(PropertyList))

export default PropertyListContainer
