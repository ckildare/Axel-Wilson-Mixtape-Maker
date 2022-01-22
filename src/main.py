from dotenv import load_dotenv
import spotipy
from tkinter import *
from tkinter import ttk
from spotipy.oauth2 import SpotifyClientCredentials

load_dotenv()

# Set Up GUI
root = Tk()
frm = ttk.Frame(root, padding=200)
frm.grid()
ttk.Label(frm, text="Hello World!").grid(column=0, row=0)
ttk.Button(frm, text="Quit", command=root.destroy).grid(column=1, row=0)
root.mainloop()

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
