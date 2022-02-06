# Spotify Authorization

## The Axel Wilson Route

If we want to use Axel Wilson's account to save all the playlists, we may be able to get around requiring the
user to login. Instead, we would just generate an access token manually once, then refresh it periodically to
ensure it doesn't expire.

More information can be found at this [blog post about Spotify refresh tokens](https://benwiz.com/blog/create-spotify-refresh-token/).

One problem I anticipate if we go this route is how to periodically refresh the token. We would have to somehow tell the server
to run a specific action every once in a while (such as once an hour).

### Spotipy Integration

It looks like Spotipy has some useful utilities for generating tokens. We might be able
to use this to generate Axel's token without having to setup any complicated routes:
https://spotipy.readthedocs.io/en/2.6.1/#authorization-code-flow

## The User Playlist Route

The other option is to give users the ability to create their own playlists. In order to do this, we would have to prompt the user
to login using their account. After this, Spotify would send the new authorization code to a "redirect uri," which is a route we would
use to save the new token (ex. `axel-wilson.com/authorization?code=<auth_code>` would be visited by Spotify I think).

### OAuth2

A general guide to Spotify authorization can be found [here](https://developer.spotify.com/documentation/general/guides/authorization/).

Authorization relies on an authorization protocol called OAuth2. This is the same protocol which allows you to login into services with Google, Facebook, etc.
for example. In our case, we need the user to be able to login with Spotify so we have permission to edit their account.
