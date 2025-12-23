# ICS to Google Calendar Chrome Extension - Implementation Plan

## Overview
A Chrome extension that enables users to drag and drop .ics (iCalendar) files directly into Google Calendar to automatically add events.

## Core Features
1. Detect drag-and-drop of .ics files on Google Calendar pages
2. Parse .ics file content to extract event information
3. Integrate with Google Calendar API to create events
4. Provide user feedback during the process (loading, success, errors)
5. Handle multiple events in a single .ics file

## Technical Architecture

### 1. Chrome Extension Structure
```
ics2gcal/
├── manifest.json              # Extension configuration (Manifest V3)
├── src/
│   ├── content/
│   │   ├── content.ts        # Content script injected into Google Calendar
│   │   └── dropzone.ts       # Drag-and-drop handler
│   ├── background/
│   │   └── service-worker.ts # Background service worker
│   ├── lib/
│   │   ├── ics-parser.ts     # ICS file parsing logic
│   │   ├── gcal-api.ts       # Google Calendar API wrapper
│   │   └── types.ts          # TypeScript type definitions
│   └── ui/
│       ├── popup.html         # Extension popup UI
│       ├── popup.ts           # Popup logic
│       └── styles.css         # Styling
├── icons/                     # Extension icons (16, 48, 128px)
├── package.json
├── tsconfig.json
└── webpack.config.js          # Build configuration
```

### 2. Key Components

#### A. Content Script (content.ts)
- **Purpose**: Runs on Google Calendar pages to detect drag-and-drop events
- **Responsibilities**:
  - Listen for drag-and-drop events on the calendar interface
  - Read and validate .ics files
  - Communicate with background script for API calls
  - Display UI feedback (loading spinner, success/error messages)

#### B. Background Service Worker (service-worker.ts)
- **Purpose**: Handles OAuth authentication and API requests
- **Responsibilities**:
  - Manage Google OAuth 2.0 authentication flow
  - Make Google Calendar API calls to create events
  - Handle API rate limiting and errors
  - Store and refresh access tokens

#### C. ICS Parser (ics-parser.ts)
- **Purpose**: Parse .ics file format into structured data
- **Library**: Using `ical.js` for robust RFC 5545 compliance
- **Handles**:
  - VEVENT parsing (title, description, start/end times, location, etc.)
  - Timezone conversion (VTIMEZONE)
  - Recurring events (RRULE)
  - Multiple events in one file
  - Edge cases in various .ics file formats

#### D. Google Calendar API Integration (gcal-api.ts)
- **Purpose**: Interface with Google Calendar API
- **Responsibilities**:
  - Create calendar events via API (always to default calendar)
  - Handle batch operations for multiple events
  - Map ICS properties to Google Calendar event format
  - Return event URLs for user to view/edit in Google Calendar
  - Error handling and retry logic

### 3. User Flow

```
1. User visits calendar.google.com
2. Extension injects content script
3. User drags .ics file over calendar
   ↓
4. Drop zone visual indicator appears
   ↓
5. User drops file
   ↓
6. Content script reads file & shows loading indicator
   ↓
7. Parse .ics file → extract events
   ↓
8. Send events to background script
   ↓
9. Background script authenticates (if needed)
   ↓
10. Create events via Google Calendar API (to default calendar)
   ↓
11. Display success notification with links to view/edit events in Google Calendar
   ↓
12. User clicks link to view event and can edit using native Google Calendar UI
```

### 4. Implementation Phases

#### Phase 1: Project Setup & Basic Extension
- [ ] Initialize npm project with TypeScript
- [ ] Set up build system (Webpack or Vite)
- [ ] Create manifest.json (Manifest V3)
- [ ] Implement basic content script injection
- [ ] Test extension loads on Google Calendar

#### Phase 2: Drag-and-Drop Functionality
- [ ] Implement drag-and-drop event listeners
- [ ] Create visual drop zone overlay
- [ ] Read file content from drop event
- [ ] Validate file is .ics format
- [ ] Handle edge cases:
  - Multiple files dropped
  - Non-.ics files (show error)
  - Drag from different sources (browser, desktop, email)
  - Large files
  - Invalid file encodings
- [ ] Display basic UI feedback

#### Phase 3: ICS Parsing
- [ ] Integrate ical.js library
- [ ] Parse VEVENT components
- [ ] Extract event properties (summary, dtstart, dtend, location, description)
- [ ] Handle timezones correctly
- [ ] Support recurring events (RRULE)
- [ ] Handle various .ics format variations and edge cases
- [ ] Unit tests for parser with real-world .ics files

#### Phase 4: Google Calendar API Integration
- [ ] Set up Google Cloud Project
- [ ] Configure OAuth 2.0 credentials
- [ ] Implement OAuth flow in background script
- [ ] Implement event creation API calls
- [ ] Map ICS fields to Google Calendar event format
- [ ] Handle API errors and rate limiting

#### Phase 5: User Experience Polish
- [ ] Loading indicators during upload
- [ ] Success notifications with clickable links to view events in Google Calendar
- [ ] Error notifications with helpful messages
- [ ] Handle edge cases (all-day events, multi-day events, etc.)
- [ ] Smooth animations for drop zone
- [ ] Progress indicator for multiple events

#### Phase 6: Testing & Documentation
- [ ] End-to-end testing with real .ics files
- [ ] Test with various .ics formats
- [ ] Create user documentation
- [ ] Add README with setup instructions
- [ ] Prepare for Chrome Web Store submission

## Architectural Decisions Made

### 1. **ICS Parsing Library**: ical.js
   - Full-featured, RFC 5545 compliant
   - Handles edge cases and various .ics formats
   - Supports timezones, recurring events, and complex specifications

### 2. **Build Tool**: Vite
   - Faster builds and modern tooling
   - Excellent TypeScript support
   - Good plugin ecosystem for Chrome extensions

### 3. **UI Framework**: Vanilla TypeScript
   - Lightweight, minimal bundle size for content script
   - Direct DOM manipulation for better performance
   - No framework overhead in injected code

### 4. **OAuth Flow**: chrome.identity API
   - Built-in Chrome API for authentication
   - Secure token management
   - Simpler implementation than manual OAuth

### 5. **User Experience Approach**
   - **No preview modal**: Events are created directly for fast workflow
   - **Post-creation editing**: Users edit via native Google Calendar UI after creation
   - **Default calendar**: Always use user's default calendar (no selection UI)
   - **No duplicate detection**: Keep implementation simple, trust user intent

## Dependencies

```json
{
  "dependencies": {
    "ical.js": "^2.0.0"
  },
  "devDependencies": {
    "@types/chrome": "^0.0.260",
    "@types/ical.js": "^2.0.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "vite-plugin-web-extension": "^4.0.0"
  }
}
```

## Security Considerations
1. **Permissions**: Request minimal permissions (identity, storage, host permission for calendar.google.com)
2. **File validation**: Verify file type and size before parsing
3. **API tokens**: Store securely, use Chrome storage API
4. **Content Security Policy**: Strict CSP in manifest
5. **User consent**: Clear messaging about what data is accessed

## Future Enhancements (Post-MVP)
- Event preview/editing before creation (optional modal)
- Duplicate event detection and handling
- Multi-calendar support (let users choose target calendar)
- Support for .ics URLs (paste link instead of file)
- Bulk operations (multiple files at once)
- Support for additional calendar properties (attendees, reminders, attachments)
- Analytics/usage tracking (privacy-respecting)
- Support for other calendar services (Outlook, etc.)

---

**Ready for Implementation**: All architectural decisions have been finalized. Begin Phase 1.
