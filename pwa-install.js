let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Save the event so it can be triggered later
  deferredPrompt = event;

  // Automatically trigger the install prompt after a delay (or a specific condition)
  setTimeout(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      // Wait for the user's response
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        // Reset the deferred prompt variable
        deferredPrompt = null;
      });
    }
  }, 2000); // Delay the prompt by 2 seconds (or adjust as needed)
});

// Optionally, hide the install link after the PWA is installed
window.addEventListener('appinstalled', () => {
  console.log('PWA installed!');
});
