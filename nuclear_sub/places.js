// Update Maryland GPS coordinates

const sourcePlaces = [
  { name: "General Dynamics", pt: [41.37506, -72.09585] },
  { name: "Huntington Ingalls", pt: [37.0242, -76.3575] },
  { name: "ThyssenKrupp", pt: [53.5789, 9.8746] },
  { name: "Navantia", pt: [36.5206, -6.2948] },
  { name: "Kawasaki", pt: [34.7348, 135.3356] },
  { name: "DCN", pt: [48.4365, -4.8367] },
  { name: "Babcock", pt: [50.3723, -4.7463] },
  { name: "Mitsubishi", pt: [34.7025, 135.4904] },
  { name: "Saab Kockums", pt: [55.6072, 13.0016] },
  { name: "Fincantieri", pt: [45.4382, 12.3346] }
];

App.prototype.initializePlaces = function () {
  console.log("initialize places");

  sourcePlaces.forEach((sourcePlace) => {
    var place = new Place(sourcePlace.name, sourcePlace.pt, false);
    app.placeList.push(place);
  });
};
