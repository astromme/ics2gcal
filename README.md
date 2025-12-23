# ICS to Google Calendar Chrome Extension

A Chrome extension that enables users to drag and drop .ics (iCalendar) files directly into Google Calendar to automatically add events.

## Features

- 🎯 Drag and drop .ics files directly onto Google Calendar
- 📅 Automatically parse and create calendar events
- 🔄 Support for multiple events in a single file
- ⏰ Handle recurring events, timezones, and all-day events
- ✨ Simple, intuitive user experience

## Development Status

Currently in **Phase 1** - Project Setup & Basic Extension

### Completed
- ✅ Project structure created
- ✅ TypeScript configuration
- ✅ Vite build setup
- ✅ Manifest V3 configuration
- ✅ Basic content script
- ✅ Background service worker stub
- ✅ Popup UI

### Todo
- [ ] Drag-and-drop functionality (Phase 2)
- [ ] ICS parsing with ical.js (Phase 3)
- [ ] Google Calendar API integration (Phase 4)
- [ ] UI polish and error handling (Phase 5)
- [ ] Testing and documentation (Phase 6)

## Setup

### Prerequisites
- Node.js 18+ and npm
- Google Chrome browser

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build the extension:
```bash
npm run build
```

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from this project

### Development

Run in development mode with hot reload:
```bash
npm run dev
```

### Testing

To test the extension:
1. Build or run in dev mode
2. Load the extension in Chrome (see Installation step 3)
3. Visit [Google Calendar](https://calendar.google.com)
4. Look for the "ICS2GCal Ready" indicator in the bottom right

## Project Structure

```
ics2gcal/
├── manifest.json              # Extension configuration (Manifest V3)
├── src/
│   ├── content/
│   │   ├── content.ts        # Content script injected into Google Calendar
│   │   └── dropzone.ts       # Drag-and-drop handler (Phase 2)
│   ├── background/
│   │   └── service-worker.ts # Background service worker
│   ├── lib/
│   │   ├── ics-parser.ts     # ICS file parsing logic (Phase 3)
│   │   ├── gcal-api.ts       # Google Calendar API wrapper (Phase 4)
│   │   └── types.ts          # TypeScript type definitions
│   └── ui/
│       ├── popup.html         # Extension popup UI
│       ├── popup.ts           # Popup logic
│       └── styles.css         # Styling
├── icons/                     # Extension icons (16, 48, 128px) - TODO
├── package.json
├── tsconfig.json
└── vite.config.ts            # Build configuration
```

## Technologies

- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **ical.js** - ICS file parsing (RFC 5545 compliant)
- **Chrome Extension Manifest V3** - Modern extension API
- **Google Calendar API** - Event creation

## License

MIT

## Contributing

This project is currently in active development. Contributions will be welcome once the MVP is complete.
