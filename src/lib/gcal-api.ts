/**
 * Google Calendar API wrapper
 * Handles event creation and API interactions
 */

import type { CalendarEvent, GoogleCalendarEvent, EventCreationResult } from './types';

/**
 * Convert CalendarEvent to Google Calendar API format
 * @param event - Parsed calendar event
 * @returns Google Calendar API event object
 */
export function convertToGoogleCalendarEvent(event: CalendarEvent): GoogleCalendarEvent {
  const googleEvent: GoogleCalendarEvent = {
    summary: event.summary,
    description: event.description,
    location: event.location,
    start: {},
    end: {}
  };

  if (event.isAllDay) {
    // All-day events use date format
    googleEvent.start.date = event.start.toISOString().split('T')[0];
    googleEvent.end.date = event.end.toISOString().split('T')[0];
  } else {
    // Regular events use dateTime format
    googleEvent.start.dateTime = event.start.toISOString();
    googleEvent.end.dateTime = event.end.toISOString();

    if (event.timezone) {
      googleEvent.start.timeZone = event.timezone;
      googleEvent.end.timeZone = event.timezone;
    }
  }

  if (event.recurrence) {
    googleEvent.recurrence = event.recurrence;
  }

  return googleEvent;
}

/**
 * Create an event in Google Calendar
 * @param accessToken - OAuth access token
 * @param event - Google Calendar event object
 * @returns Result of event creation
 */
export async function createCalendarEvent(
  _accessToken: string,
  event: GoogleCalendarEvent
): Promise<EventCreationResult> {
  // TODO: Implement Google Calendar API event creation
  // This will be implemented in Phase 4
  console.log('Creating calendar event...', event);

  return {
    success: false,
    error: 'Not implemented yet'
  };
}

/**
 * Create multiple events in Google Calendar
 * @param accessToken - OAuth access token
 * @param events - Array of Google Calendar event objects
 * @returns Array of creation results
 */
export async function createCalendarEvents(
  _accessToken: string,
  events: GoogleCalendarEvent[]
): Promise<EventCreationResult[]> {
  // TODO: Implement batch event creation
  // This will be implemented in Phase 4
  console.log(`Creating ${events.length} calendar events...`);

  return events.map(() => ({
    success: false,
    error: 'Not implemented yet'
  }));
}
