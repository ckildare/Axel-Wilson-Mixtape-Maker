function specSettings (limit) {
  let settings = '';

  settings += `limit=${limit}`;
  settings += '&market=US';
  // settings += '&seed_genres=' + artists[0].genres[0];

  return settings;
}

function seedSettings (trackIDs) {
  let settings = '';

  settings += '&seed_tracks=' + encodeURIComponent(trackIDs.join(','));
  // settings += '&seed_genres=' + encodeURIComponent([(genres || []).map(genre => genre.id)].join(`,`));

  return settings;
}

// function attributeSettings (settings) {
//   var settings = '';

//   // settings += 'limit=5';
//   // settings += '&seed_genres=' + artists[0].genres[0];

//   return settings;
// }

function buildSettings (trackIDs, limit) {
  var settings = '';

  settings += specSettings(limit);
  settings += seedSettings(trackIDs);
  // settings += attributeSettings(settings)

  console.log('settings', settings);

  return settings;
}

export default buildSettings;