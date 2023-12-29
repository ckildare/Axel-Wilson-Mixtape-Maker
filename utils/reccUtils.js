function specSettings (limit) {
  var settings = '';

  settings += `limit=${limit}`;
  settings += `&market=US`;
  // settings += '&seed_genres=' + artists[0].genres[0];

  return settings;
}

function seedSettings (trackID, artists) {
  var settings = '';
  var artistIDs = [(artists || []).slice(0, 4).map(artist => artist.id)];

  settings += '&seed_tracks=' + encodeURIComponent(trackID);
  settings += '&seed_artists=' + encodeURIComponent(artistIDs.join(`,`));
  // settings += '&seed_genres=' + encodeURIComponent([(genres || []).map(genre => genre.id)].join(`,`));

  return settings;
}

function attributeSettings (settings) {
  var settings = '';

  // settings += 'limit=5';
  // settings += '&seed_genres=' + artists[0].genres[0];

  return settings;
}

function buildSettings (trackID, artists, limit) {
  var settings = '';

  settings += specSettings(limit);
  settings += seedSettings(trackID, artists);
  // settings += attributeSettings(settings);

  return settings;
}

export default buildSettings;