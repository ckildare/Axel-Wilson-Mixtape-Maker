from dotenv import load_dotenv
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from PyQt5.QtWidgets import QApplication, QtGui, QtCore, QtLabel

load_dotenv()

# Set Up GUI
app = QtApplication([])
label = QtLabel("hello World")
label.show()

songName = input("Enter a song name. ")
artistName = input("Enter an artist name. ")
spotify = spotipy.Spotify(
    client_credentials_manager=SpotifyClientCredentials())

# Initialize Spotipy


results = spotify.search(q="track=\""+songName+"\"", type="track", limit=1)
tracks = results["tracks"]
items = tracks["items"]
first = items[0]
print(first["name"])
print(first["uri"])
print(first["popularity"])

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
