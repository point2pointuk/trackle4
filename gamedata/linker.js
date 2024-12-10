App.prototype.initializePlaces = function () {
    console.log("Trackle v4 - Initializing Game");
    const gameId = document.getElementById("gameid").innerText;
    const req = new XMLHttpRequest();
    req.open("GET", "/games/"+gameId+".json");
    req.send();
    req.onload = function() {
        var data2 = this.responseText;
        var gameInfo = JSON.parse(data2);
        var sourcePlaces = gameInfo["station_names"]
        sourcePlaces.forEach((sourcePlace) => {
            var place = new Place(sourcePlace.name, sourcePlace.pt, false);
            app.placeList.push(place);
        });
        document.body.style.setProperty('--color-bg', gameInfo["bg_colour"])
        document.body.style.setProperty('--color-primary', gameInfo["main_colour"])
        document.title = gameInfo["line_name"] + " | Trackle";
        document.getElementById("gameTitle").innerText = gameInfo["line_name"];
    }
};