function specSettings (limit) {
  var settings = '';

  settings += `limit=${limit}`;
  settings += `&market=US`;
  // settings += '&seed_genres=' + artists[0].genres[0];

  return settings;
}

function seedSettings (trackIDs, artists) {
  var settings = '';
  var artistIDs = [(artists || []).slice(0, 5 - trackIDs.length).map(artist => artist.id)];

  console.log('trackIDs: ', trackIDs);
  
  console.log('trackIDs.length: ', trackIDs.length);
  settings += '&seed_tracks=' + encodeURIComponent(trackIDs.join(`,`));
  settings += '&seed_artists=' + encodeURIComponent(artistIDs.join(`,`));
  // settings += '&seed_genres=' + encodeURIComponent([(genres || []).map(genre => genre.id)].join(`,`));

  console.log('settings: ', settings);

  return settings;
}

function attributeSettings (settings) {
  var settings = '';

  // settings += 'limit=5';
  // settings += '&seed_genres=' + artists[0].genres[0];

  return settings;
}

function buildSettings (trackIDs, artists, limit) {
  var settings = '';

  settings += specSettings(limit);
  settings += seedSettings(trackIDs.slice(0, 5), artists);
  // settings += attributeSettings(settings);

  return settings;
}

export default buildSettings;