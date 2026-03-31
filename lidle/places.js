const sourcePlaces = [
  { name: "ROMFORD", pt: [51.5743, 0.1834] },
  { name: "EMERSON PARK", pt: [51.5690, 0.2180] },
]; /* The list of place names and their GPS coordinates */

App.prototype.initializePlaces = function () {
  console.log("initialize places");

  sourcePlaces.forEach((sourcePlace) => {
    var place = new Place(sourcePlace.name, sourcePlace.pt, false);
    app.placeList.push(place);
  });
};
