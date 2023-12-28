import { SpotifyAPIContext } from "spotifyContext";
import { useContext } from "react";

const recommendationSettings = (settings) => {
  const { seedSong } = useContext(SpotifyAPIContext);
  
  return settingsString = `
    limit=${settings.limit}
    &seed_artists=${seedSong.artists.map(artist => artist.id).join('%2C+')}
    &seed_tracks=${seedSong.id}`;
}

const advancedSettings = (settings) => {
  var advancedSettingsString = '';

  // TODO: Add advanced settings
  // if (settings.acousticness) { advancedSettingsString += `&target_acousticness=${settings.acousticness}`; }
  // if (settings.danceability) { advancedSettingsString += `&target_danceability=${settings.danceability}`; }
  // if (settings.energy) { advancedSettingsString += `&target_energy=${settings.energy}`; }
  // if (settings.instrumentalness) { advancedSettingsString += `&target_instrumentalness=${settings.instrumentalness}`; }

  return advancedSettingsString;
}

const fetchSongRecommendations = async (settings, isAdvanced, token) => {
  try {
    const url = `https://api.spotify.com/v1/recommendations?${recommendationSettings(settings)}${isAdvanced && advancedSettings(settings)}`;
    console.log(`fetchSongRecommendations url: ${url}`);

    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching song recommendations: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Song Recommendation Response:', data);
    return data;
  } catch (error) {
    console.error(`Error fetching song recommendations: ${error.message}`);
    return null;
  }
};

export default fetchSongRecommendations;