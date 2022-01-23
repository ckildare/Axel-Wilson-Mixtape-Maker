from Spotify import getSongsByIds
from bottle_cors_plugin import cors_plugin
from bottle import app, response, route, run, request
from bottle import Bottle, run
from Spotify import getSong, getSpotifyClient, getRecommendedSongs
import json
from Song import Song

spotify = getSpotifyClient()
app = Bottle()

# testSong = getSong(spotify, "Hey Jude", "Beatles")
# print(testSong)


@app.route('/selectSong')
def selectSong():
    songTitle = request.query.title
    songArtist = request.query.artist
    selectedSong = getSong(spotify, songTitle, songArtist)

    return json.dumps(selectedSong.toJsonObj())


@app.post('/recommendedSongs')
def recommendedSongs():
    postData = request.json
    seed_songs = postData["seed_songs"]
    discard_songs = postData["discard_songs"]
    seedSongObjs = getSongsByIds(spotify, seed_songs)
    print(seedSongObjs)
    discardSongObjs = getSongsByIds(spotify, discard_songs)
    songList = getRecommendedSongs(spotify, seedSongObjs, discardSongObjs)
    jsonList = []
    for song in songList:
        jsonList.append(json.dumps(song.toJsonObj()))
    return jsonList


app.install(cors_plugin('*'))
run(app, host='localhost', port=8080)
