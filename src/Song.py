from xmlrpc.client import boolean


class Song:
    uri: str
    name: str
    preview: str
    artistName: str
    albumName: str
    coverArt: str
    spotifyLink: str

    def __init__(self, item) -> None:
        self.uri = item["uri"]
        self.name = item["name"]
        self.preview = item["preview_url"]
        try:
            self.artistName = item["artists"][0]["name"]
        except:
            self.artistName = item["artistName"]
        self.albumName = item["album"]["name"]
        self.coverArt = item["album"]["images"][0]["url"]
        self.spotifyLink = item["external_urls"]["spotify"]


    def toJsonObj(self):
        return {
            "uri": self.uri,
            "name": self.name,
            "preview": self.preview,
            "artistName": self.artistName,
            "albumName": self.albumName,
            "coverArt": self.coverArt,
            "spotifyLink": self.spotifyLink
        }
