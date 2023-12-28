import { createContext, useEffect, useState } from "react";
import fetchAccessToken from "./fetchAccessToken";

const initialContext = {
  token: null,
  expirationTime: 10000,
}

const SpotifyAPIContext = createContext(initialContext);

const SpotifyAPIProvider = ({ children }) => {
  const [token, setToken] = useState(initialContext.token);

  const refreshAccessToken = async () => {
    const newTokenData = await fetchAccessToken();

    if (!newTokenData) {
      return;
    }

    setToken(newTokenData?.access_token);
  }

  useEffect(() => {
    const refreshTokenAndSetTimeout = async () => {
      await refreshAccessToken();

      const intervalId = setInterval(() => {
        refreshAccessToken();
      }, 3600000);

      // Cleanup function
      return () => clearInterval(intervalId);
    };

    refreshTokenAndSetTimeout();
  }, []);

  useEffect(() => {
    console.log(`token: ${token}`);
  }, [token]);

  return (
    <SpotifyAPIContext.Provider value={{
      ...initialContext,
      token
    }}>
      {children}
    </SpotifyAPIContext.Provider>
  )
}

export { SpotifyAPIProvider, SpotifyAPIContext };