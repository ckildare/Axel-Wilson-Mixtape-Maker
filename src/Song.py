class Song:
    uri: str
    name: str
    artistName: str
    spotifyLink: str

    def __init__(self, item) -> None:
        self.uri = item["uri"]
        self.name = item["name"]
        self.artistName = item["artists"][0]["name"]
        self.spotifyLink = item["external_urls"]["spotify"]
