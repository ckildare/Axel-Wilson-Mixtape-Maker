from bottle import Bottle, run, get
from Spotify import getSong, getSpotifyClient, getRecommendedSongs
import json
from Song import Song

spotify = getSpotifyClient()
app = Bottle()

testSong = getSong(spotify, "Hey Jude", "Beatles")
print(testSong)


@app.route('/selectSong')
def selectSong():
    x = json.dumps(testSong.toJsonObj())
    print(x)
    return x

@app.route('/recommendedSongs')
def recommendedSongs():
    songList = getRecommendedSongs(spotify, [testSong], [])
    jsonList = []
    for song in songList:
        jsonList.append(json.dumps(song.toJsonObj()))
    print(jsonList)
    return jsonList



run(app, host='localhost', port=8080)