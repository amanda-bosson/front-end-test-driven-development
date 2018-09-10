import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';

import SearchResultListContainer from './Container';
import List from '../../../components/List';
import searchResultStubs from '../../stubs/searchResultsStub';
import searchMetadataStubs from '../../stubs/searchMetadataStub';
import searchSelector from '../../selector';
import nowPlayingModule from '../../../nowPlaying/module';

const { actions } = nowPlayingModule;

describe('<SearchResultListContainer/>', () => {
  function getInitialState() {
    return {
      search: {
        searchResults: searchResultStubs,
        searchMetadata: searchMetadataStubs 
      },
      nowPlaying: {
        comments: { items: [] },
        relatedVideos: { items: [] }
      }
    };
  }

  let store;
  let dispatch;

  beforeEach(() => {
    const reducer = state => state; 
    dispatch = jest.fn();
    store = {
      ...createStore(reducer, getInitialState()),
      dispatch
    };
  });

  describe('props', () => {
    it('correctly maps state to props', () => {
      const wrapper = shallow(
        <SearchResultListContainer />,
        { context: { store } }
      );
      const expected = searchSelector(getInitialState()).searchResults;
      const actual = wrapper.prop('search').searchResults;
      expect(actual).toEqual(expected);
    });
  });

  describe('dispatch', () => {
    it('correctly maps dispatch to props', () => {
      const wrapper = mount(
        <SearchResultListContainer />,
        { context: { store } }
      );

      const searchResults = searchSelector(getInitialState()).searchResults;
      wrapper.find(List).props().onListItemClicked(wrapper.find(List).prop('listItems')[5]);
      expect(dispatch).toBeCalledWith(actions.setCurrentVideo(searchResults[5]));
    });
  });
});
