function mapTrack(track) {
  return {
    id: track.id,
    name: track.name,
    artists: [...track.artists.map(artist => ({
      name: artist.name,
      href: artist.href,
      id: artist.id
    }))],
    album: {
      name: track.album.name,
      href: track.album.href,
      images: track.album.images,
      releaseDate: track.album.release_date,
      id: track.album.id,
    },
    duration: track.duration_ms,
    href: track.href,
    preview: track.preview_url,
  };
}

export default mapTrack;