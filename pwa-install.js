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
