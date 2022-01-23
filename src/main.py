from tkinter import Tk, ttk
from typing import List
from dotenv import load_dotenv
import spotipy
from spotipy import Spotify
from spotipy.oauth2 import SpotifyClientCredentials
from distutils import util
from Song import Song
import Spotify


keptSongs: List[Song] = []
discardedSongs: List[Song] = []


def main():
    spotify = Spotify.getSpotifyClient()

    songName = input("Enter a song name. ")
    artistName = input("Enter an artist name. ")

    keptSongs = []
    seedSongs = []
    selectedSong = Spotify.getSong(spotify, songName, artistName)
    keptSongs.append(selectedSong)
    seedSongs.append(selectedSong)

    more = True
    while more:
        recSongs = Spotify.getRecommendedSongs(spotify, seedSongs)
        for song in recSongs:
            Spotify.printSong(song)

        print("For debug purposes, do you want to select the first three songs to seed more recs?")
        more = util.strtobool(input("More?"))
        if more:
            keptSongs.append(recSongs[0])
            keptSongs.append(recSongs[1])
            keptSongs.append(recSongs[2])
            seedSongs.clear()
            seedSongs.append(recSongs[0])
            seedSongs.append(recSongs[1])
            seedSongs.append(recSongs[2])

    for song in keptSongs:
        Spotify.printSong(song)


main()
