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
- **Options**:
  - **Option 1**: Use existing library (e.g., `ical.js`, `node-ical`)
  - **Option 2**: Build custom parser for basic VEVENT support
- **Recommendation**: Use `ical.js` for robust RFC 5545 compliance
- **Handles**:
  - VEVENT parsing (title, description, start/end times, location, etc.)
  - Timezone conversion (VTIMEZONE)
  - Recurring events (RRULE)
  - Multiple events in one file

#### D. Google Calendar API Integration (gcal-api.ts)
- **Purpose**: Interface with Google Calendar API
- **Responsibilities**:
  - Create calendar events via API
  - Handle batch operations for multiple events
  - Map ICS properties to Google Calendar event format
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
6. Content script reads file
   ↓
7. Parse .ics file → extract events
   ↓
8. Send events to background script
   ↓
9. Background script authenticates (if needed)
   ↓
10. Create events via Google Calendar API
   ↓
11. Display success message with links to created events
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
- [ ] Display basic UI feedback

#### Phase 3: ICS Parsing
- [ ] Integrate ical.js or similar library
- [ ] Parse VEVENT components
- [ ] Extract event properties (summary, dtstart, dtend, location, description)
- [ ] Handle timezones correctly
- [ ] Support recurring events
- [ ] Unit tests for parser

#### Phase 4: Google Calendar API Integration
- [ ] Set up Google Cloud Project
- [ ] Configure OAuth 2.0 credentials
- [ ] Implement OAuth flow in background script
- [ ] Implement event creation API calls
- [ ] Map ICS fields to Google Calendar event format
- [ ] Handle API errors and rate limiting

#### Phase 5: User Experience Polish
- [ ] Loading indicators during upload
- [ ] Success/error notifications
- [ ] Allow user to select target calendar
- [ ] Preview events before adding
- [ ] Handle edge cases (duplicate events, all-day events, etc.)

#### Phase 6: Testing & Documentation
- [ ] End-to-end testing with real .ics files
- [ ] Test with various .ics formats
- [ ] Create user documentation
- [ ] Add README with setup instructions
- [ ] Prepare for Chrome Web Store submission

## Technical Decisions to Discuss

### 1. **ICS Parsing Library**
   - **ical.js**: Full-featured, RFC 5545 compliant, ~50KB
   - **node-ical**: Simpler, smaller, may miss edge cases
   - **Custom parser**: Lightweight but requires more development
   - **Recommendation**: Start with ical.js for reliability

### 2. **Build Tool**
   - **Webpack**: Mature, well-documented for Chrome extensions
   - **Vite**: Faster builds, modern, good TypeScript support
   - **Recommendation**: Vite for faster development

### 3. **UI Framework**
   - **Vanilla JS/TS**: Lightweight, no dependencies
   - **React/Preact**: Component-based, larger bundle
   - **Recommendation**: Vanilla TS for content script (performance), optional React for popup

### 4. **OAuth Flow**
   - **chrome.identity API**: Built-in, requires Chrome Web Store listing
   - **Manual OAuth**: More control, works in development
   - **Recommendation**: chrome.identity API for production

### 5. **Event Preview**
   - **Show preview modal before creating**: Better UX, user control
   - **Auto-create with undo option**: Faster workflow
   - **Recommendation**: Preview modal for first version

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
- Support for .ics URLs (paste link instead of file)
- Bulk operations (multiple files at once)
- Event editing before creation
- Support for other calendar properties (attendees, reminders)
- Analytics/usage tracking (privacy-respecting)
- Support for other calendar services

## Open Questions for Discussion
1. Should we support editing event details before adding to calendar?
2. How should we handle duplicate events?
3. Should we allow selecting a specific calendar (if user has multiple)?
4. What level of .ics spec compliance do we need? (basic events vs. full RFC 5545)
5. Should we support drag-and-drop from external sources (email attachments, etc.)?

---

**Next Steps**: Review and refine this plan, then begin Phase 1 implementation.
