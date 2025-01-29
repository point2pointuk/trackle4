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

    // Show the install button if the PWA isn't installed
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

// Check if running as a PWA and display prompt to open in app
if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone) {
    installButton.style.display = "none"; // Hide the install button if running as PWA
    // Optionally, display a message or prompt to encourage the user to open the app
    const openAppMessage = document.createElement('p');
    openAppMessage.textContent = "You are using Trackle in app mode! Open it in the PWA for the best experience.";
    openAppMessage.style.color = "#9A114F";
    document.body.appendChild(openAppMessage);
}
