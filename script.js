// Register the Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(reg => {
            console.log("Service Worker Registered", reg);
        })
        .catch(err => console.error("Service Worker Registration Failed", err));
}

// Request Notification Permission
document.addEventListener("DOMContentLoaded", async () => {
    if ("Notification" in window && "serviceWorker" in navigator) {
        if (Notification.permission === "default") {
            await Notification.requestPermission();
        }
    }
});

// Send Notification when user taps anywhere on the page
document.addEventListener("click", async () => {
    if (Notification.permission === "granted" && navigator.serviceWorker.controller) {
        // Send a message to the Service Worker to trigger the notification
        navigator.serviceWorker.controller.postMessage("sendNotification");
    } else {
        console.warn("Notifications are not allowed or Service Worker not ready.");
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
