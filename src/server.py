from Spotify import getSongsByIds
from bottle_cors_plugin import cors_plugin
from bottle import Bottle, run,  app, response, run, request, static_file, server_names
from Spotify import getSong, getSpotifyClient, getRecommendedSongs, createPlaylist
import json
import os

spotify = getSpotifyClient()
app = Bottle()


@app.route("/")
def index():
    print("Handle '/' req'")
    frontendBuildDir = os.path.abspath("./frontend/build")
    print("frontendBuildDir: " + str(frontendBuildDir))

    if os.path.exists(frontendBuildDir + "/index.html"):
        print("(file exists")
    else:
        print("(file doesn't exist)")
    return static_file("index.html", frontendBuildDir)


@app.route("/<path:path>")
def frontend(path):
    try:
        frontendBuildDir = os.path.abspath("./frontend/build")
        return static_file(path, frontendBuildDir)
    except:
        return "server error"


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

@app.route('/createPlaylist', method=["OPTIONS", "POST"])
def generatePlaylist():
    if request.method == 'OPTIONS':
        print("opts")
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
        return {}

    playlist_URL = createPlaylist(spotify, ["50xwQXPtfNZFKFeZ0XePWc"], "hello world the third", "Another one.")

    print(playlist_URL)

    return playlist_URL


@app.hook('after_request')
def enable_cors():
    print("after_request hook")
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


app.install(cors_plugin('*'))

port = os.environ["PORT"]
print("RUNNING SERVER ON PORT=" + str(port))
run(app, port=port, host="0.0.0.0")
