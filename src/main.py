from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

load_dotenv()

songName = input("Enter a song name. ")
spotify = spotipy.Spotify(
    client_credentials_manager=SpotifyClientCredentials())

# Initialize spotipy


results = spotify.search(q="track=\""+songName+"\"", type="track", limit=1)
tracks = results["tracks"]
items = tracks["items"]
first = items[0]
print(first["name"])
print(first["uri"])
print(first["popularity"])
