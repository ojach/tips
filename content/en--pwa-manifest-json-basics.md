---
updated: 2026-11-08
---

# Web App Manifest Basics: Which Settings Matter on iPhone and Android?

When you start building a PWA, one of the first things you encounter is `manifest.json`. The name sounds technical, but its job is straightforward: it describes how a website should appear and launch when added to a home screen.

## What is manifest.json?

A Web App Manifest is a JSON document containing information such as the app's name, icons, launch URL, and display mode. The browser reads it when determining the available installation and home screen experience.

## A simple starting example

```json
{
  "name": "Example App",
  "short_name": "Example",
  "start_url": ".",
  "display": "standalone",
  "icons": [
    { "src": "/icon.png", "sizes": "512x512", "type": "image/png", "purpose": "any" }
  ]
}
```

Reference the file from HTML:

```html
<link rel="manifest" href="/manifest.json">
```

The paths must resolve correctly from the page and Manifest locations. A typo or a missing file can prevent the browser from using the intended settings.

## `name` and `short_name`

`name` is the full app name. `short_name` is a shorter label that may be used where space is limited, including home screens. Actual labels depend on the operating system and installation interface.

## `start_url`: where the app opens

This is one of the most important settings. `"start_url": "/"` points to the site root. `"start_url": "."` is resolved relative to the Manifest URL, so its actual destination depends on where that Manifest is served.

For page-specific apps, ensure the generated Manifest URL and its resolved `start_url` lead to the intended page. OJapp's dynamic Manifest approach is designed around this distinction.

## `scope`: which URLs belong to the app

`scope` describes the navigation boundary associated with the web app. A broad scope can make an entire site feel like one app, while a narrower scope may fit a single section.

On iPhone and Android, browser UI and installed-app identity can behave differently. In my PWA LAB experiments, `scope` has been especially important when trying to preserve separate home screen entries on Android while avoiding unwanted mini-browser UI on iOS.

## `display`: browser, standalone, or fullscreen

Common values include `browser`, `standalone`, `minimal-ui`, and `fullscreen`. They request a presentation mode; the platform decides what it supports. Do not assume the same setting will produce identical results on iPhone and Android.

## Colors and icons

`background_color` and `theme_color` provide presentation hints. `icons` lists image resources and may include `purpose: "any"` or `"maskable"`.

For Android, test how maskable artwork is cropped. On iPhone, Safari may also consult `apple-touch-icon`, so the Manifest icon is not the only image to check.

## Does Android require a Service Worker?

A Service Worker is a separate technology used for capabilities such as offline caching and request interception. It is not a field in the Manifest. Home screen addition and full PWA installability can have different requirements depending on the browser and platform; do not treat Service Worker as universally mandatory for simply adding a site to the home screen.

## Common mistakes

- Invalid JSON, such as trailing commas
- Incorrect icon or Manifest paths
- A `start_url` that opens the wrong page
- A `scope` that unintentionally combines pages into one app
- Expecting iPhone and Android to interpret every setting identically
- Forgetting to test the installed icon on a real device

## Conclusion

Start with the few settings that define the experience: name, launch URL, display mode, and icons. Add more only when the intended behavior requires them. The key design question is whether you want **one site as one app** or **each page as its own app**.
