/**
 * Core type definitions for the ICS to Google Calendar extension
 */

/**
 * Represents a parsed calendar event from an ICS file
 */
export interface CalendarEvent {
  summary: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
  recurrence?: string[];
  timezone?: string;
}

/**
 * Google Calendar API event format
 */
export interface GoogleCalendarEvent {
  summary: string;
  description?: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  recurrence?: string[];
}

/**
 * Result of event creation
 */
export interface EventCreationResult {
  success: boolean;
  eventId?: string;
  eventUrl?: string;
  error?: string;
}

/**
 * Message types for communication between content script and background
 */
export enum MessageType {
  CREATE_EVENTS = 'CREATE_EVENTS',
  AUTH_CHECK = 'AUTH_CHECK',
  GET_AUTH_TOKEN = 'GET_AUTH_TOKEN'
}

/**
 * Message structure for extension messaging
 */
export interface ExtensionMessage {
  type: MessageType;
  payload?: any;
}

/**
 * Response structure for extension messaging
 */
export interface ExtensionResponse {
  success: boolean;
  data?: any;
  error?: string;
}
