/**
 * Popup script for extension popup UI
 */

import type { ExtensionMessage, ExtensionResponse } from '../lib/types';
import { MessageType } from '../lib/types';

// Check authentication status when popup opens
async function checkAuthStatus() {
  const statusValue = document.getElementById('auth-status-value');
  if (!statusValue) return;

  try {
    const response = await chrome.runtime.sendMessage({
      type: MessageType.AUTH_CHECK
    } as ExtensionMessage) as ExtensionResponse;

    if (response.success && response.data?.authenticated) {
      statusValue.textContent = 'Authenticated ✓';
      statusValue.style.color = '#0f9d58';
    } else {
      statusValue.textContent = 'Not authenticated';
      statusValue.style.color = '#ea4335';
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    statusValue.textContent = 'Error';
    statusValue.style.color = '#ea4335';
  }
}

// Handle authentication button click
function setupAuthButton() {
  const authBtn = document.getElementById('auth-btn');
  if (!authBtn) return;

  authBtn.addEventListener('click', async () => {
    authBtn.textContent = 'Authenticating...';
    (authBtn as HTMLButtonElement).disabled = true;

    try {
      const response = await chrome.runtime.sendMessage({
        type: MessageType.GET_AUTH_TOKEN
      } as ExtensionMessage) as ExtensionResponse;

      if (response.success) {
        await checkAuthStatus();
        authBtn.textContent = 'Authenticated!';
      } else {
        authBtn.textContent = 'Authentication Failed';
        console.error('Auth error:', response.error);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      authBtn.textContent = 'Error';
    } finally {
      setTimeout(() => {
        authBtn.textContent = 'Authenticate with Google';
        (authBtn as HTMLButtonElement).disabled = false;
      }, 2000);
    }
  });
}

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  checkAuthStatus();
  setupAuthButton();
});
