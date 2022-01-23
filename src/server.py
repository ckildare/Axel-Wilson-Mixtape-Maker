from bottle import Bottle, run
from Spotify import getSong, getSpotifyClient
import json

spotify = getSpotifyClient()
app = Bottle()

@app.route('/selectSong')
def selectSong():
    x = json.dumps(getSong(spotify, "Hey Jude", "Beatles").toJsonObj())
    print(x)
    return x

run(app, host='localhost', port=8080)