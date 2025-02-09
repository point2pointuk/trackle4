// Request Notification Permission
document.addEventListener("DOMContentLoaded", async () => {
    if ("Notification" in window) {
        if (Notification.permission === "default") {
            await Notification.requestPermission();
        }
    }
});

// Send Notification when user taps anywhere on the page
document.addEventListener("click", () => {
    if (Notification.permission === "granted") {
        new Notification("Hello", {
            body: "You tapped the page!",
            icon: "/icons/icon-192x192.png" // Optional: Change to your app's icon
        });
    } else {
        console.warn("Notifications are not allowed.");
    }
});

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
