// Badge Logic (set to 3 seconds for testing)
async function updateBadge() {
    if (!navigator.setAppBadge) return; // Check if API is supported

    let lastOpened = localStorage.getItem("lastOpened");
    if (!lastOpened) return; // If no record, exit

    let secondsSinceLastOpened = (Date.now() - lastOpened) / 1000;

    if (secondsSinceLastOpened > 3) { // Set to 3 seconds for testing
        navigator.setAppBadge(0); // Set a blank badge
    } else {
        navigator.clearAppBadge(); // Clear badge
    }
}

// Save the last opened time when app loads
window.addEventListener("load", () => {
    localStorage.setItem("lastOpened", Date.now());
    if (navigator.clearAppBadge) navigator.clearAppBadge();
    updateBadge(); // Check and update badge on load
});

// Re-check badge every second for testing
setInterval(updateBadge, 1000);

// Share Button
const shareButton = document.getElementById("shareButton");

shareButton.addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: "Trackle",
                text: "Play Trackle by SB Designs today and attempt to guess all of the stations on TfL and National Rail! Play now and have fun at https://trackle.pages.dev!",
            });
            console.log("Trackle shared successfully!");
        } catch (error) {
            console.error("Error sharing Trackle:", error);
        }
    } else {
        alert("Sharing is not supported here.");
    }
});
