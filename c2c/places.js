// Update Maryland GPS coordinates

const sourcePlaces = [
  { "name": "BARKING", "pt": [51.5390, 0.0800] },
  { "name": "BASILDON", "pt": [51.5680, 0.4560] },
  { "name": "BENFLEET", "pt": [51.5440, 0.5620] },
  { "name": "CHAFFORD HUNDRED", "pt": [51.4870, 0.2870] },
  { "name": "CHALKWELL", "pt": [51.5387210852, 0.6706212378] },
  { "name": "DAGENHAM DOCK", "pt": [51.5260, 0.1470] },
  { "name": "EAST TILBURY", "pt": [51.4840, 0.4130] },
  { "name": "FENCHURCH STREET", "pt": [51.5110, -0.0790] },
  { "name": "GRAYS", "pt": [51.4760, 0.3240] },
  { "name": "LAINDON", "pt": [51.5670, 0.4230] },
  { "name": "LEIGH-ON-SEA", "pt": [51.5420, 0.6400] },
  { "name": "LIMEHOUSE", "pt": [51.5120, -0.0390] },
  { "name": "LIVERPOOL STREET", "pt": [51.5170, -0.0820] },
  { "name": "OCKENDON", "pt": [51.5220, 0.2900] },
  { "name": "PITSEA", "pt": [51.5610, 0.5070] },
  { "name": "PURFLEET", "pt": [51.4810, 0.2360] },
  { "name": "RAINHAM", "pt": [51.5170, 0.1900] },
  { "name": "SHOEBURYNESS", "pt": [51.5310, 0.7950] },
  { "name": "SOUTHEND CENTRAL", "pt": [51.5370, 0.7130] },
  { "name": "SOUTHEND EAST", "pt": [51.5390, 0.7320] },
  { "name": "STANFORD-LE-HOPE", "pt": [51.5143632423, 0.4230666756] },
  { "name": "STRATFORD", "pt": [51.5410, -0.0030] },
  { "name": "THORPE BAY", "pt": [51.5380, 0.7480] },
  { "name": "TILBURY TOWN", "pt": [51.4620, 0.3570] },
  { "name": "UPMINSTER", "pt": [51.5590, 0.2510] },
  { "name": "WEST HAM", "pt": [51.5284892546, 0.0054585883] },
  { "name": "WEST HORNDON", "pt": [51.5680, 0.3420] },
  { "name": "WESTCLIFF", "pt": [51.5370, 0.6900] }
];

App.prototype.initializePlaces = function () {
  console.log("initialize places");

  sourcePlaces.forEach((sourcePlace) => {
    var place = new Place(sourcePlace.name, sourcePlace.pt, false);
    app.placeList.push(place);
  });
};
