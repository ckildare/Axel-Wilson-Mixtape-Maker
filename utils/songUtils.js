function mapSong(song) {
  return {
    id: song.id,
    name: song.name,
    artists: [...song.artists.map(artist => ({
      name: artist.name,
      href: artist.href,
      id: artist.id
    }))],
    album: {
      name: song.album.name,
      href: song.album.href,
      images: song.album.images,
      releaseDate: song.album.release_date,
      id: song.album.id,
    },
    duration: song.duration_ms,
    href: song.href,
    preview: song.preview_url,
  };
}

export default mapSong;