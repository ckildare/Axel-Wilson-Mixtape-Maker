import fetchBearerToken from 'pages/api/fetchBearerToken';
import React, { createContext, useEffect, useMemo, useState } from 'react';

const initialContext = {
  selectedTracks: [],
  trackTree: null,
  isRestart: false,
};

const StorageContext = createContext(initialContext);

const StorageProvider = ({ children }) => {
  const [selectedTracks, setSelectedTracks] = useState(initialContext.selectedTracks);
  const [trackTree, setTrackTree] = useState(initialContext.trackTree);
  const [isRestart, setIsRestart] = useState(initialContext.isRestart);

  useEffect(() => { refreshTokenAndSetTimeout(); }, []);

  const setCookie = (name, value, minutes) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + minutes * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;`;
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const refreshAccessToken = async () => {
    const newToken = await fetchBearerToken();
    if (newToken) {
      setCookie('bearer_token', newToken, 55);
    }
  };

  const refreshTokenAndSetTimeout = async () => {
    await refreshAccessToken();

    // Refresh Token Every 59 Minutes-- Token Expires Every Hour, Refreshing Every 59 Minutes Ensures Token Never Expires
    const intervalID = setInterval(() => {
      refreshAccessToken();
    }, 3540000);

    return () => clearInterval(intervalID);
  };

  const touchBearerToken = async () => {
    const storedToken = getCookie('bearer_token');
    if (storedToken) return storedToken;

    await refreshTokenAndSetTimeout();
    const setToken = getCookie('bearer_token');
    return setToken;
  };

  const getSearchQueryParams = () => {
    return getCookie('search_params');
  };

  const setSearchQueryParams = (searchParams) => {
    if (searchParams) {
      setCookie('search_params', searchParams, 120);
      return searchParams;
    }
  };

  const touchReccsQueryParams = (searchParams) => {
    if (searchParams) {
      setCookie('reccs_params', searchParams, 120);
      return searchParams;
    }
    return getCookie('reccs_params');
  };

  const triggerRestart = () => {
    setIsRestart(true);
    setSelectedTracks([]);
    setTrackTree(null);
    setIsRestart(false);
  };

  const memoTouchBearerToken = useMemo(() => touchBearerToken, [touchBearerToken]);
  const memoGetSearchQueryParams = useMemo(() => getSearchQueryParams, [getSearchQueryParams]);
  const memoSetSearchQueryParams = useMemo(() => setSearchQueryParams, [setSearchQueryParams]);
  const memoTouchReccsQueryParams = useMemo(() => touchReccsQueryParams, [touchReccsQueryParams]);
  const memoSetSelectedTracks = useMemo(() => setSelectedTracks, [setSelectedTracks]);
  const memoSetTrackTree = useMemo(() => setTrackTree, [setTrackTree]);
  const memoTriggerRestart = useMemo(() => triggerRestart, [triggerRestart]);

  const memoizedContextValue = useMemo(() => {
    return {
      touchBearerToken: memoTouchBearerToken,
      getSearchQueryParams: memoGetSearchQueryParams,
      setSearchQueryParams: memoSetSearchQueryParams,
      touchReccsQueryParams: memoTouchReccsQueryParams,
      setSelectedTracks: memoSetSelectedTracks,
      setTrackTree: memoSetTrackTree,
      triggerRestart: memoTriggerRestart,
      selectedTracks,
      trackTree,
      isRestart
    };
  }, [memoTouchBearerToken, memoGetSearchQueryParams, memoSetSearchQueryParams, memoTouchReccsQueryParams, memoSetSelectedTracks, memoSetTrackTree, memoTriggerRestart, selectedTracks, trackTree, isRestart]);


  return (
    <StorageContext.Provider value={memoizedContextValue}>
      {children}
    </StorageContext.Provider>
  );
};

export { StorageContext, StorageProvider };