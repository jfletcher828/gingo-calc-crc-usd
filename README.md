# gingo-calc-crc-usd
Calculate CRC to USD

## Progressive Web App

Gringo Calc can be installed from a supported mobile browser after it is served
from `localhost` or an HTTPS static host.

The PWA shell includes:

- `manifest.json` for install metadata.
- `service-worker.js` for offline app-shell caching.
- PNG icons under `assets/icons/` for Android and iOS home-screen installs.

For local testing, open the app through Live Server or another localhost server.
Service workers do not run from a direct `file://` URL.

After loading the app once, use browser DevTools to confirm the manifest loads,
the service worker registers, and the app still reloads while the Network panel
is set to Offline.
