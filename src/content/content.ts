/**
 * Content script that runs on Google Calendar pages
 * Initializes the drag-and-drop functionality
 */

console.log('ICS to Google Calendar extension loaded');

// Initialize the extension when the page is ready
function init() {
  console.log('Initializing ICS2GCal extension on Google Calendar');

  // Add a visual indicator that the extension is active
  const indicator = document.createElement('div');
  indicator.id = 'ics2gcal-indicator';
  indicator.textContent = 'ICS2GCal Ready';
  indicator.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #1a73e8;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 12px;
    font-family: 'Google Sans', Roboto, Arial, sans-serif;
    z-index: 10000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: opacity 0.3s;
  `;

  document.body.appendChild(indicator);

  // Fade out after 3 seconds
  setTimeout(() => {
    indicator.style.opacity = '0';
    setTimeout(() => indicator.remove(), 300);
  }, 3000);
}

// Wait for the page to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
