import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';
import { mapTrack } from 'utils/trackUtils';
import { StorageContext } from './StorageContext';
import fetchTrackSearch from 'pages/api/fetchTrackSearch';
import { set } from 'immutable';

const initialContext = {
  isLoadingSearch: false,
  isTitleSearch: true,
  searchedTracks: [],
  page: 0,
  searchQuery: '',
};

const SearchContext = createContext(initialContext);

const SearchProvider = ({ children }) => {
  const [searchedTracks, setSearchedTracks] = useState(initialContext.searchedTracks);
  const [isLoadingSearch, setIsLoadingSearch] = useState(initialContext.isLoadingSearch);
  const [isTitleSearch, setIsTitleSearch] = useState(initialContext.isTitleSearch);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(initialContext.page);
  const { touchBearerToken, getSearchQueryParams, setSearchQueryParams, isRestart } = useContext(StorageContext);

  useEffect(() => {
    if (!isRestart) return;
    setSearchedTracks([]);
    setIsLoadingSearch(false);
    setIsTitleSearch(true);
    setSearchQuery('');
    setPage(0);
  }, [isRestart]);

  const memoMapSearchParams = useMemo(() => (query) => {
    return `?q=${isTitleSearch ? 'track' : 'artist'}:${query}`;
  }, [isTitleSearch]);

  const memoSetSearchQuery = useMemo(() => (query) => { setSearchQuery(query); }, [setSearchQuery]);

  const memoSetIsTitleSearch = useMemo(() => (isTitleSearch) => { setIsTitleSearch(isTitleSearch); }, [setIsTitleSearch]);

  const memoPrepareSearchQuery = useMemo(() => async (pageChange) => {
    setIsLoadingSearch(true);
    const token = await touchBearerToken();
    setPage(pageChange);

    const builtQuery = searchQuery?.length > 0 ? searchQuery : getSearchQueryParams();
    if (!builtQuery) {
      setIsLoadingSearch(false);
      return;
    }

    return [token, builtQuery];
  }, [touchBearerToken, getSearchQueryParams, searchQuery, setIsLoadingSearch, setPage]);

  const memoCleanUpSearch = useMemo(() => (builtQuery, trackSearchResponse) => {
    setSearchQueryParams(builtQuery);
    setSearchedTracks([...trackSearchResponse.tracks.items.map(track => mapTrack(track))]);
    setIsLoadingSearch(false);
  }, [setSearchQueryParams, setSearchedTracks, setIsLoadingSearch]);

  const memoFetchSearch = useMemo(() => async (pageChange) => {
    const [token, builtQuery] = await memoPrepareSearchQuery(pageChange);

    const trackSearchResponse = await fetchTrackSearch(`?q=${builtQuery}`, token, page * 6);
    if (!trackSearchResponse || trackSearchResponse?.tracks?.items.length == 0) {
      console.error('No tracks found for request: ', builtQuery);
      setIsLoadingSearch(false);
      return;
    }

    memoCleanUpSearch(builtQuery, trackSearchResponse);
    return;
  }, [page, setIsLoadingSearch, memoPrepareSearchQuery, memoCleanUpSearch]);

  const memoizedContextValue = useMemo(() => {
    return {
      fetchSearch: memoFetchSearch,
      mapSearchParams: memoMapSearchParams,
      setSearchQuery: memoSetSearchQuery,
      setIsTitleSearch: memoSetIsTitleSearch,
      isLoadingSearch,
      isTitleSearch,
      searchedTracks,
      searchQuery,
      page,
    };
  }, [memoFetchSearch, memoSetSearchQuery, memoMapSearchParams, memoSetIsTitleSearch, isLoadingSearch, isTitleSearch, searchQuery, searchedTracks, page]);

  return (
    <SearchContext.Provider value={memoizedContextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };