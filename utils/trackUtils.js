import { useRouter } from 'next/router';
import React from 'react';

export const mapTrack = (track) => {
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
    href: track.external_urls.spotify,
    preview: track.preview_url,
  };
};

export const mapTrackTreeLeaf = (track) => {
  const smallestImg = track.album.images[track.album.images.length - 1];
  return {
    'id': track.id,
    'href': track.href,
    'img': smallestImg.url,
    'imgDim': smallestImg.height,
    'name': track.name,
    'isSelected': false
  };
};

export const addNewTrackTreeRow = (tracks) => {
  return tracks.map(track => mapTrackTreeLeaf(track)) || [];
};

const updateLastTrackTreeRow = (trackTree, tracks) => {
  const lastEntryIndex = Object.keys(trackTree).length - 1;
  let updatedTree = { ...trackTree };

  if (!trackTree[lastEntryIndex] || trackTree[lastEntryIndex]?.length < 1) return;
  const updatedEntry = trackTree[lastEntryIndex].map(track => {
    return {
      ...track,
      isSelected: tracks.find(t => t.id == track.id)?.isSelected || false
    };
  });
  updatedTree[lastEntryIndex] = updatedEntry;

  return updatedTree;
};

export const addTracksToTree = (trackTree, reccTracks, selectedTracks) => {
  if (!trackTree) {
    return {
      0: [...addNewTrackTreeRow(selectedTracks)],
    };
  }
  let newTrackTree = { ...trackTree };

  newTrackTree = updateLastTrackTreeRow(newTrackTree, selectedTracks);
  console.log('updatedTrackTree: ', newTrackTree);
  newTrackTree[Object.keys(trackTree).length] = addNewTrackTreeRow(reccTracks);
  return newTrackTree;
};