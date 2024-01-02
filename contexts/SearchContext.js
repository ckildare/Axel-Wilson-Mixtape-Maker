import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';
import { mapTrack } from 'utils/trackUtils';
import { StorageContext } from './StorageContext';
import fetchTrackSearch from 'pages/api/fetchTrackSearch';

const initialContext = {
  isLoadingSearch: false,
  isTitleSearch: true,
  searchedTracks: [],
  page: 0,
};

const SearchContext = createContext(initialContext);

const SearchProvider = ({ children }) => {
  const [searchedTracks, setSearchedTracks] = useState(initialContext.searchedTracks);
  const [isLoadingSearch, setIsLoadingSearch] = useState(initialContext.isLoadingSearch);
  const [isTitleSearch, setIsTitleSearch] = useState(initialContext.isTitleSearch);
  const [page, setPage] = useState(initialContext.page);
  const { touchBearerToken, getSearchQueryParams, setSearchQueryParams, isRestart } = useContext(StorageContext);

  useEffect(() => {
    if (!isRestart) return;
    setSearchedTracks([]);
    setIsLoadingSearch(false);
    setIsTitleSearch(true);
    setPage(0);
  }, [isRestart]);

  const mapSearchParams = (query) => {
    return `?q=${isTitleSearch ? 'track' : 'artist'}:${query}`;
  };

  const paginate = (direction) => {
    if (direction === 'next') setPage(page + 1);
    if (direction === 'prev' && page > 0) setPage(page - 1);
  };

  const fetchSearch = async (query, pageChange) => {
    setIsLoadingSearch(true);
    const token = await touchBearerToken();
    if (pageChange) paginate(pageChange);

    console.log('query 1: ', query != null && query?.length > 3);
    const builtQuery = (query != null && query?.length > 3) ? `?q=${query}` : getSearchQueryParams();
    console.log('query 2: ', builtQuery);
    if (!builtQuery) {
      setIsLoadingSearch(false);
      return;
    }

    const trackSearchResponse = await fetchTrackSearch(builtQuery, token, page * 5);
    if (!trackSearchResponse || trackSearchResponse?.tracks?.items.length == 0) {
      console.error('No tracks found for request: ', builtQuery);
      setIsLoadingSearch(false);
      return;
    }

    console.log('builtQuery: ', builtQuery);
    setSearchQueryParams(builtQuery);
    setSearchedTracks([...trackSearchResponse.tracks.items.map(track => mapTrack(track))]);
    setIsLoadingSearch(false);
    return;
  };

  const memoFetchSearch = useMemo(() => fetchSearch, [fetchSearch]);
  const memoMapSearchParams = useMemo(() => mapSearchParams, [mapSearchParams]);
  const memoSetIsTitleSearch = useMemo(() => setIsTitleSearch, [setIsTitleSearch]);

  const memoizedContextValue = useMemo(() => {
    return {
      fetchSearch: memoFetchSearch,
      mapSearchParams: memoMapSearchParams,
      setIsTitleSearch: memoSetIsTitleSearch,
      isLoadingSearch,
      searchedTracks,
      page,
    };
  }, [memoFetchSearch, memoMapSearchParams, memoSetIsTitleSearch, isLoadingSearch, searchedTracks, page]);

  return (
    <SearchContext.Provider value={memoizedContextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };