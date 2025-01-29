let deferredPrompt;
const installButton = document.getElementById("installButton");

// Check if the app is already installed
window.addEventListener("appinstalled", () => {
    installButton.style.display = "none"; // Hide the button if installed
});

// Listen for the PWA install prompt
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    
    // Show the button only if the PWA isn't installed
    if (installButton) {
        installButton.style.display = "inline";
        installButton.addEventListener("click", () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("User accepted the PWA install prompt.");
                        installButton.style.display = "none"; // Hide after installation
                    }
                    deferredPrompt = null;
                });
            }
        });
    }
});

// Check if running as a PWA and hide the button
if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
    installButton.style.display = "none";
}

// Detect if the app is installed but being accessed from a browser
if (!window.matchMedia("(display-mode: standalone)").matches && !window.navigator.standalone) {
    // Display a message or prompt the user to open the app if installed
    if (navigator.share) {
        // Example: Prompt to share to open in app if installed
        document.getElementById("installButton").style.display = "inline";
        installButton.addEventListener("click", () => {
            // Logic to open the app (or prompt user to add it)
            window.location = "trackle://"; // Custom URL scheme (if applicable)
        });
    }
}
