

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
