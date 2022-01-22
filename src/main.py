from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

load_dotenv()

spotify = spotipy.Spotify(
    client_credentials_manager=SpotifyClientCredentials())

# Initialize spotipy


letItBe = spotify.search(q="track=\"Let It Be\"", type="track")

print(letItBe)
