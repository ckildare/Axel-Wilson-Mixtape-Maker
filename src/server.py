from bottle_cors_plugin import cors_plugin
from bottle import app, response, route, run
from bottle import Bottle, run
from Spotify import getSong, getSpotifyClient, getRecommendedSongs
import json

spotify = getSpotifyClient()
app = Bottle()


@app.route('/selectSong')
def selectSong():
    x = json.dumps(getSong(spotify, "Hey Jude", "Beatles").toJsonObj())
    print(x)
    return x


@app.route('/recommendedSongs')
def recommendedSongs():
    x = json.dumps(getRecommendedSongs(
        spotify, "Hey Jude", "Beatles").toJsonObj())
    print(x)
    return x


app.install(cors_plugin('*'))
run(app, host='localhost', port=8080)

# # -*- coding: utf-8 -*-


# @route('/', method='GET')
# def landing():
#   response.content_type = 'application/json'
#   return {'status': 'Works'}


# #Confugure the server
# app = app()
# app.install(cors_plugin('*'))

# if name == "__main__":
#   run(host='localhost', port=7000)
