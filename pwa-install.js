let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Check if the user has previously cancelled the prompt or if it's expired
  const dismissedTimestamp = localStorage.getItem('pwa-install-dismissed');
  const currentTime = Date.now();

  if (dismissedTimestamp && currentTime - dismissedTimestamp < 3600000) {
    return; // Don't show the prompt again if dismissed within the last 1 hour
  }

  // Prevent the default prompt
  event.preventDefault();
  // Save the event for later use
  deferredPrompt = event;

  // Listen for a mouse move or click to trigger the prompt
  const triggerInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
          // Store the result to prevent showing the prompt again for 1 hour
          localStorage.setItem('pwa-install-dismissed', Date.now().toString());
        }
        // Reset the deferred prompt
        deferredPrompt = null;
      });
    }
  };

  // Trigger on mouse move or click
  window.addEventListener('mousemove', triggerInstall, { once: true });
  window.addEventListener('click', triggerInstall, { once: true });
});

// Optionally, reset the state when the page reloads
window.addEventListener('load', () => {
  // Reset the dismissed state after page reload
  localStorage.removeItem('pwa-install-dismissed');
});
