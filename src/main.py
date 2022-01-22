from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

load_dotenv()

songName = input("Enter a song name. ")
artistName = input("Enter an artist name. ")
spotify = spotipy.Spotify(
    client_credentials_manager=SpotifyClientCredentials())

# Initialize spotipy
results = spotify.search(
    q="track:\""+songName+"\"+artist:\""+artistName+"\"", type="track", limit=10
    )
tracks = results["tracks"]
items = tracks["items"]


for item in items:
    songUri = item["uri"]
    track = spotify.track(track_id=songUri)
    arrayArtistName = track["artists"][0]["name"]
    spotifyLink = track["external_urls"]["spotify"]
    print(arrayArtistName)
    print(spotifyLink)

