/**
 * Background service worker for handling OAuth and API requests
 */

import type { ExtensionMessage, ExtensionResponse } from '../lib/types';

console.log('ICS2GCal background service worker initialized');

// Listen for messages from content script
chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, sender, sendResponse: (response: ExtensionResponse) => void) => {
    console.log('Background received message:', message);

    // Handle async operations
    handleMessage(message, sender).then(sendResponse);

    // Return true to indicate we will send a response asynchronously
    return true;
  }
);

async function handleMessage(
  message: ExtensionMessage,
  _sender: chrome.runtime.MessageSender
): Promise<ExtensionResponse> {
  try {
    switch (message.type) {
      case 'AUTH_CHECK':
        return await checkAuth();

      case 'GET_AUTH_TOKEN':
        return await getAuthToken();

      case 'CREATE_EVENTS':
        return await createEvents(message.payload);

      default:
        return {
          success: false,
          error: `Unknown message type: ${message.type}`
        };
    }
  } catch (error) {
    console.error('Error handling message:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function checkAuth(): Promise<ExtensionResponse> {
  // TODO: Implement authentication check
  return {
    success: true,
    data: { authenticated: false }
  };
}

async function getAuthToken(): Promise<ExtensionResponse> {
  // TODO: Implement OAuth token retrieval
  return {
    success: true,
    data: { token: null }
  };
}

async function createEvents(_events: any[]): Promise<ExtensionResponse> {
  // TODO: Implement event creation via Google Calendar API
  return {
    success: true,
    data: { created: 0 }
  };
}

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('ICS2GCal extension installed:', details.reason);

  if (details.reason === 'install') {
    // First-time installation
    console.log('First-time installation detected');
  } else if (details.reason === 'update') {
    // Extension updated
    console.log('Extension updated to version:', chrome.runtime.getManifest().version);
  }
});
