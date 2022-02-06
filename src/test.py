import sys
import spotipy
import spotipy.util as util
from dotenv import load_dotenv

load_dotenv()  # Environment variables must be loaded first

scope = 'playlist-modify-public'

if len(sys.argv) > 1:
    username = sys.argv[1]
else:
    print("Usage: %s username" % (sys.argv[0],))
    sys.exit()

# I think we must whitelist this redirect uri: https://stackoverflow.com/questions/32956443/invalid-redirect-uri-on-spotify-auth
# On that note, I think the Spotify credentials are invalid
token = util.prompt_for_user_token(username, scope, redirect_uri="http://localhost:8080/")
print(token)

if token:
    sp = spotipy.Spotify(auth=token)
    user = sp.current_user()
    print(user)

    playlist = sp.user_playlist_create(user=user["id"], name="Hello World 2", public=True, collaborative=False, description="Our first playlist created with test.py!")
    print("playlist id: " + playlist["id"])

    results = sp.user_playlist_add_tracks(user=user["id"], playlist_id=playlist["id"], tracks=["50xwQXPtfNZFKFeZ0XePWc"])
    print(results)

    # results = sp.current_user_saved_tracks()
    # for item in results['items']:
    #     track = item['track']
    #     print(track['name'] + ' - ' + track['artists'][0]['name'])
else:
    print("Can't get token for", username)