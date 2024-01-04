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

  const mapSearchParams = (query) => {
    return `?q=${isTitleSearch ? 'track' : 'artist'}:${query}`;
  };

  const fetchSearch = async (pageChange) => {
    setIsLoadingSearch(true);
    const token = await touchBearerToken();
    setPage(pageChange);

    const builtQuery = searchQuery?.length > 0 ? searchQuery : getSearchQueryParams();
    console.log('builtQuery: ', builtQuery);
    if (!builtQuery) {
      setIsLoadingSearch(false);
      return;
    }

    const trackSearchResponse = await fetchTrackSearch(`?q=${builtQuery}`, token, page * 6);
    if (!trackSearchResponse || trackSearchResponse?.tracks?.items.length == 0) {
      console.error('No tracks found for request: ', builtQuery);
      setIsLoadingSearch(false);
      return;
    }

    setSearchQueryParams(builtQuery);
    setSearchedTracks([...trackSearchResponse.tracks.items.map(track => mapTrack(track))]);
    setIsLoadingSearch(false);
    return;
  };

  const memoFetchSearch = useMemo(() => fetchSearch, [fetchSearch]);
  const memoMapSearchParams = useMemo(() => mapSearchParams, [mapSearchParams]);
  const memoSetIsTitleSearch = useMemo(() => setIsTitleSearch, [setIsTitleSearch]);
  const memoSetSearchQuery = useMemo(() => setSearchQuery, [setSearchQuery]);

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