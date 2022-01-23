from tkinter import Tk, ttk
from typing import List
from dotenv import load_dotenv
import spotipy
from spotipy import Spotify
from spotipy.oauth2 import SpotifyClientCredentials

from Song import Song


keptSongs: List[Song] = []
discardedSongs: List[Song] = []


def setUpGui():

    # Set Up GUI
    root = Tk()
    frm = ttk.Frame(root, padding=200)
    frm.grid()
    ttk.Label(frm, text="Hello World!").grid(column=0, row=0)
    ttk.Button(frm, text="Quit", command=root.destroy).grid(column=1, row=0)
    root.mainloop()


def getSpotifyClient():
    load_dotenv()  # Environment variables must be loaded first
    return spotipy.Spotify(
        client_credentials_manager=SpotifyClientCredentials())


def getSongs(spotify, songName, artistName, limit=50) -> List[Song]:
    results = spotify.search(
        q="track:\""+songName+"\"+artist:\""+artistName+"\"", type="track", limit=limit
    )
    tracks = results["tracks"]
    items = tracks["items"]
    songs = []
    for item in items:
        songs.append(Song(item))
    return songs


def getSong(spotify, songName, artistName):
    songs = getSongs(spotify, songName, artistName, 1)
    return songs[0]


def getRecommendedSongs(spotify: Spotify, seedSongs: List[Song]) -> List[Song]:
    seedSongIds = []
    for song in seedSongs:
        seedSongIds.append(song.uri)

    results = spotify.recommendations(seed_tracks=seedSongIds, limit=5, )
    tracks = results["tracks"]

    recSongs = []
    for track in tracks:
        song = Song(track)
        recSongs.append(song)

    return recSongs


def printSong(song: Song):
    print(song.name)


def main():
    spotify = getSpotifyClient()

    songName = input("Enter a song name. ")
    artistName = input("Enter an artist name. ")

    song = getSong(spotify, songName, artistName)

    print("Song:")
    printSong(song)

    recSongs = getRecommendedSongs(spotify, [song])
    print("Rec songs:")
    for rec in recSongs:
        printSong(rec)


main()
