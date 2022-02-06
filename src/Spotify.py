from typing import List
from dotenv import load_dotenv
import spotipy
from spotipy import Spotify
from spotipy.oauth2 import SpotifyClientCredentials
from Song import Song
import Spotify
import spotipy.util as util
import sys


def getSpotifyClient():
    load_dotenv()  # Environment variables must be loaded first
    username = '312u34sxrhxiujbi424nwx3fdvwu'
    scope = 'playlist-modify-public'
    token = util.prompt_for_user_token(username, scope, redirect_uri="http://localhost:8080/")
    sp = spotipy.Spotify(auth=token)

    return sp


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


def getRecommendedSongs(spotify: Spotify, seedSongs: List[Song], discardedSongs: List[Song]) -> List[Song]:
    seedSongIds = []
    for song in seedSongs:
        seedSongIds.append(song.uri)

    results = spotify.recommendations(seed_tracks=seedSongIds, limit=15, )
    tracks = results["tracks"]

    recSongs = []
    for track in tracks:
        song = Song(track)
        recSongs.append(song)

    verifiedSongs = []
    for recSong in recSongs:
        verifySong = True
        for discardSong in discardedSongs:
            if recSong.uri == discardSong.uri:
                verifySong = False
        if verifySong:
            verifiedSongs.append(recSong)

    returnVerifySongs = verifiedSongs[1:5]

    return returnVerifySongs


def getSongsByIds(spotify, stringIDs: List[str]) -> List[Song]:
    if len(stringIDs) == 0 or stringIDs[0] is None:
        return []
    result = spotify.tracks(stringIDs)
    tracks = result["tracks"]
    recSongs = []
    for track in tracks:
        song = Song(track)
        recSongs.append(song)

    return recSongs


def printSong(song: Song):
    print(song.name)

def createPlaylist(spotify, songList, playlistName, playlistDescription):
    user = spotify.current_user()
    playlist = spotify.user_playlist_create(user['id'], playlistName, public=True, collaborative=False, description=playlistDescription)
    print(playlist)
    playlist_ID = playlist['id']
    playlist_URL = playlist['external_urls']['spotify']

    spotify.user_playlist_add_tracks(user['id'], playlist_ID, songList, position=None)

    return playlist_URL