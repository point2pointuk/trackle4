let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Save the event so it can be triggered later
  deferredPrompt = event;

  // Show the custom install link
  const installLink = document.getElementById('install-link');
  installLink.style.display = 'inline'; // Make the link visible

  installLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default link behaviour

    // Show the install prompt
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
  });
});

// Optionally, hide the install link after the PWA is installed
window.addEventListener('appinstalled', () => {
  const installLink = document.getElementById('install-link');
  installLink.style.display = 'none';
});
