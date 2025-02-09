self.addEventListener("push", (event) => {
    const options = {
        body: event.data ? event.data.text() : "You tapped the page!",
        icon: "https://trackle.pages.dev/images/icons/web/icon-192.png", // Replace with your icon path
    };

    event.waitUntil(
        self.registration.showNotification("Hello", options)
    );
});

// Listen for a message from the main page
self.addEventListener("message", (event) => {
    if (event.data === "sendNotification") {
        self.registration.showNotification("Hello", {
            body: "You tapped the page!",
            icon: "https://trackle.pages.dev/images/icons/web/icon-192.png", // Replace with your icon path
        });
    }
});
