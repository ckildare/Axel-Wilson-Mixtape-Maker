from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

load_dotenv()

songName = input("Enter a song name. ")
spotify = spotipy.Spotify(
    client_credentials_manager=SpotifyClientCredentials())

# Initialize spotipy


song = spotify.search(q="track=\""+songName+"\"", type="track")

print(song)
