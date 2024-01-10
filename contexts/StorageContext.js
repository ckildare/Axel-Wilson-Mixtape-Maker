import fetchBearerToken from 'pages/api/auth/bearerToken';
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

  useEffect(() => { memoRefreshTokenAndSetTimeout(); }, []);

  const memoSetCookie = useMemo(
    () => (name, value, minutes) => {
      const expires = new Date();
      expires.setTime(expires.getTime() + minutes * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;`;
    },
    []
  );

  const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    console.log('cookies', cookies);
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const memoRefreshAccessToken = useMemo(
    () => async () => {
      try {
        const response = await fetch('/api/auth/bearerToken');
        if (!response.ok) {
          throw new Error(`Error Status: ${response.status}`);
        }
  
        const data = await response.json();
        const newToken = data.token;
  
        if (newToken) {
          memoSetCookie('bearer_token', newToken, 55);
        }
      } catch (error) {
        console.error('Error refreshing access token:', error.message);
      }
    },
    [memoSetCookie]
  );

  const memoRefreshTokenAndSetTimeout = useMemo(
    () => async () => {
      await memoRefreshAccessToken();
  
      // Refresh Token Every 59 Minutes-- Token Expires Every Hour, Refreshing Every 59 Minutes Ensures Token Never Expires
      const intervalID = setInterval(() => {
        memoRefreshAccessToken();
      }, 3540000);
  
      return () => clearInterval(intervalID);
    },
    [memoRefreshAccessToken]
  );

  const memoSetSelectedTracks = useMemo(() => setSelectedTracks, [setSelectedTracks]);
  const memoSetTrackTree = useMemo(() => setTrackTree, [setTrackTree]);

  const memoTouchBearerToken = useMemo(() => async () => {
    const storedToken = getCookie('bearer_token');
    if (storedToken) return storedToken;
  
    await memoRefreshTokenAndSetTimeout();
    const setToken = getCookie('bearer_token');
    return setToken;
  }, [memoRefreshTokenAndSetTimeout]);
  
  const memoGetAccessToken = useMemo(() => async () => {
    return getCookie('access_token');
  }, []);
  
  const memoGetSearchQueryParams = useMemo(() => () => {
    return getCookie('search_params');
  }, []);
  
  const memoSetSearchQueryParams = useMemo(() => (searchParams) => {
    if (searchParams) {
      memoSetCookie('search_params', searchParams, 120);
      return searchParams;
    }
  }, [memoSetCookie]);
  
  const memoTouchReccsQueryParams = useMemo(() => (searchParams) => {
    if (searchParams) {
      memoSetCookie('reccs_params', searchParams, 120);
      return searchParams;
    }
    return getCookie('reccs_params');
  }, [memoSetCookie]);
  
  const memoTriggerRestart = useMemo(() => () => {
    setIsRestart(true);
    setSelectedTracks([]);
    setTrackTree(null);
    setIsRestart(false);
  }, [setIsRestart, setSelectedTracks, setTrackTree]);

  const memoizedContextValue = useMemo(() => {
    return {
      touchBearerToken: memoTouchBearerToken,
      getAccessToken: memoGetAccessToken,
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
  }, [
    memoTouchBearerToken,
    memoGetAccessToken,
    memoGetSearchQueryParams,
    memoSetSearchQueryParams,
    memoTouchReccsQueryParams,
    memoSetSelectedTracks,
    memoSetTrackTree,
    memoTriggerRestart,
    selectedTracks,
    trackTree,
    isRestart
  ]);


  return (
    <StorageContext.Provider value={memoizedContextValue}>
      {children}
    </StorageContext.Provider>
  );
};

export { StorageContext, StorageProvider };