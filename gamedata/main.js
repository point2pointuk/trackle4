initialize() {
    this.initializePlaces(); // Load the list of places

    // Set the total number of places (initialize in localStorage if not already)
    if (!localStorage.getItem('totalPlaces')) {
        localStorage.setItem('totalPlaces', this.placeList.length); // Set total number of places
    }

    console.log("create the map");

    // Create a Leaflet map, centered on London, without a zoom control
    map = L.map("map", { zoomControl: false }).setView([51.508328, -0.124819], 13);
    this.setMapTheme(); // Apply the correct map theme based on system preferences

    // Update the map theme whenever the user's system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      this.setMapTheme();
    });

    let foundPlaces = JSON.parse(window.localStorage.getItem("places-overground") || "{}");
    // Iterate over all places and show overlays for previously found ones
    this.placeList.forEach((place) => {
      if (foundPlaces[place.name]) {
        place.showOverlay();
      }
    });

    // Display score immediately
    this.displayScore(); // Display the current score and total places
}
