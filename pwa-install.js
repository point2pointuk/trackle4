let deferredPrompt;

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Save the event for later use
  deferredPrompt = event;
  
  // Listen for a mouse movement or click to trigger the prompt
  const triggerInstall = () => {
    if (deferredPrompt) {
