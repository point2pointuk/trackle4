let deferredPrompt;
const installButton = document.getElementById("installButton");

// Check if the app is already installed
window.addEventListener("appinstalled", () => {
    installButton.style.display = "none"; // Hide the button if the app is installed
    console.log("PWA has been installed.");
});

// Listen for the PWA install prompt
window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the default install prompt
    event.preventDefault();
    deferredPrompt = event;

    // Only show the install button if the PWA isn't installed
    installButton.style.display = "inline";

    installButton.addEventListener("click", () => {
        // Show the install prompt
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
});

// Hide the install button if the app is already installed (standalone mode)
if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
    installButton.style.display = "none"; // Hide the install button
}
