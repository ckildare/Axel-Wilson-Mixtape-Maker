from Spotify import getSongsByIds
from bottle_cors_plugin import cors_plugin
from bottle import Bottle, run,  app, response, run, request, static_file
from Spotify import getSong, getSpotifyClient, getRecommendedSongs
import json
import os

spotify = getSpotifyClient()
app = Bottle()


@app.route("/<path:path>")
def frontend(path):
    frontendBuildDir = os.path.abspath("./frontend/build")
    return static_file(path, frontendBuildDir)


@app.route('/selectSong')
def selectSong():
    songTitle = request.query.title
    songArtist = request.query.artist
    print(songTitle)
    print(songArtist)
    selectedSong = getSong(spotify, songTitle, songArtist)

    return json.dumps(selectedSong.toJsonObj())


@app.route('/recommendedSongs', method=["OPTIONS", "POST"])
def recommendedSongs():
    if request.method == 'OPTIONS':
        print("opts")
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
        return {}

    postData = request.json
    seed_songs = postData["seed_songs"]
    discard_songs = postData["discard_songs"]
    seedSongObjs = getSongsByIds(spotify, seed_songs)
    print(seedSongObjs)
    discardSongObjs = getSongsByIds(spotify, discard_songs)
    songList = getRecommendedSongs(spotify, seedSongObjs, discardSongObjs)
    jsonList = []
    for song in songList:
        jsonList.append(song.toJsonObj())
    x = json.dumps(jsonList)
    return x


@app.hook('after_request')
def enable_cors():
    print("after_request hook")
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


app.install(cors_plugin('*'))


run(app, host='localhost', port=os.environ["PORT"])
