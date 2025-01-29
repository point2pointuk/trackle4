let deferredPrompt;
const installButton = document.getElementById("installButton");

// Check if the app is already installed (via appinstalled event)
window.addEventListener("appinstalled", () => {
    installButton.style.display = "none"; // Hide the button if installed
});

// Listen for the PWA install prompt
window.addEventListener("beforeinstallprompt", (event) => {
    // Only show the install button if the app is NOT installed
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
        installButton.style.display = "none"; // Hide if it's already installed or running as PWA
    } else {
        event.preventDefault();
        deferredPrompt = event;
        
        // Show the button to prompt the user to install the PWA
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
    }
});

// Check if running as a PWA and hide the button
if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
    installButton.style.display = "none"; // Hide the install button if running as PWA
}
