---
updated: 2026-11-08
---

# PWA Incident Report: Fixing iPhone's Mini UI, Breaking Android, and Fighting Unexpected Google Overlays

I only wanted to remove the small browser-style UI that appeared in a PWA on iPhone. That sounded like a simple Manifest adjustment. Instead, it became a cross-platform debugging puzzle involving `id`, `name`, `scope`, and some unexpected interface elements on Android.

## The experiment that started it all

The goal was to make a page-specific home screen app feel like an app on iOS without sacrificing the ability to install multiple pages from the same origin on Android.

I changed Manifest settings and compared the results on actual devices. The problem was that a configuration that improved the iPhone experience could make Android treat separate pages as belonging to the same installed app.

## The suspects: `id`, `name`, and `scope`

A Manifest's `id` identifies the installed application. `name` is a display label, not a substitute for a distinct identity. `scope` defines the app's navigation boundary.

For a page-specific system such as 1P1A, these settings cannot be chosen independently of the installation goal. A broad scope may be desirable for iOS presentation, while Android app identity and duplicate-install behavior can make that same choice problematic.

## The OS conflict

The practical requirement was contradictory:

- **iPhone:** A scope broad enough to avoid the unwanted mini-browser UI in the tested navigation flow.
- **Android:** A configuration that preserves separate installations for different pages rather than collapsing them into one app.

That is why simply copying one Manifest across platforms was not the solution I wanted.

## The workaround: deliver platform-specific Manifest settings

The experiment led me to split the Manifest behavior by user agent. The iOS version could include the scope needed for the desired presentation, while the Android version could omit or narrow it according to the page-installation design.

Conceptually:

```js
const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
const manifestURL = isIOS ? '/manifest-ios.json' : '/manifest-android.json';
document.querySelector('link[rel="manifest"]').href = manifestURL;
```

This is an illustration of the branching strategy, not a drop-in replacement for the actual dynamically generated Manifests. It also requires testing because user-agent detection and browser behavior can change.

## Then came the cache—and the unexpected UI

Even after the Manifest logic changed, an installed PWA could continue behaving as though it had old settings. Browser caching, installation metadata, and the operating system's stored app configuration complicate debugging.

On Android, I also encountered unexpected Google-related interface prompts and a bottom sheet that interfered with the clean presentation I was trying to create. The lesson was to distinguish UI injected by the platform from UI created by the page before attempting CSS fixes.

## What this incident taught me

PWA behavior is not determined by a single Manifest property. App identity, navigation scope, installed metadata, browser UI, and caching interact. The only reliable way to understand a surprising result is to change one condition at a time and test it on both operating systems.

For 1P1A, the design target remains simple: let the user save a specific page as its own home screen entry without surprising them when they open it.
