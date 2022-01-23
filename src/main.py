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
seedSongs: List[Song] = []


def main():
    spotify = Spotify.getSpotifyClient()
    
    keptSongs = []
    discardedSongs = []
    seedSongs = [] 

    songName = input("Enter a song name. ")
    artistName = input("Enter an artist name. ")

    
    selectedSong = Spotify.getSong(spotify, songName, artistName)
    keptSongs.append(selectedSong)
    discardedSongs.append(selectedSong)
    seedSongs.append(selectedSong)

    more = True
    while more:
        verifiedSongs = Spotify.getRecommendedSongs(spotify, seedSongs, discardedSongs)
        print("\nReccommended Songs: \n")
        for song in verifiedSongs:
            Spotify.printSong(song)

        print("\nFor debug purposes, do you want to pull up five more songs? (True/False) ")
        more = util.strtobool(input("More?"))
        
        
        verifiedSongs[0].likedSong = False # First Song is Liked
        verifiedSongs[1].likedSong = False # Second Song is not Liked
        verifiedSongs[2].likedSong = False
        verifiedSongs[3].likedSong = False
        verifiedSongs[4].likedSong = False

        likedSongs = False
        for song in verifiedSongs:
            if song.likedSong:
                likedSongs = True
        
        if likedSongs:
            seedSongs.clear()

        if more: 
            for song in verifiedSongs:
                discardedSongs.append(song) # all songs are discarded after viewed
                if song.likedSong:
                    keptSongs.append(song) # send to final playlist
                    seedSongs.append(song) # send to next recommendation


    print("\n\n\n\n FINISHED SONGS\n")
    print("\nKept songs: \n")
    for song in keptSongs:
        Spotify.printSong(song)

    print("\nDiscardedSongs: \n")
    for song in discardedSongs:
        Spotify.printSong(song)
    
    print("\n")


main()
