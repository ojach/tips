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

## How `id`, `scope`, and `start_url` differ

These three properties are easy to confuse. `start_url` chooses where the app launches; `scope` defines its navigation boundary; and `id` is used to identify the installed web app. They do not serve the same purpose.

```json
{
  "id": "/app/",
  "start_url": "/app/",
  "scope": "/app/"
}
```

This example describes a site-section app, not a universal template. If you want separate Home Screen apps for multiple pages or profiles on one domain, identity and scope become especially important. In PWA LAB tests involving OJapp and Petal, iPhone and Android did not always treat the same manifest configuration identically. Verify the result after installation rather than relying on the JSON alone.

## Practical icon configuration: `any`, `maskable`, and `apple-touch-icon`

For Android, a maskable icon can help the artwork fit different launcher shapes. A practical configuration uses separate images for normal and maskable purposes:

```json
{
  "icons": [
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

On iPhone, the HTML `apple-touch-icon` can affect the selected Home Screen image. A fixed icon may be helpful for a conventional site, but a shared `apple-touch-icon` can interfere with page-specific icons. In dynamic PWA designs, inspect both the manifest and the HTML before deciding which image the user will see.

## iPhone versus Android: why `display` and `scope` need testing

`standalone` is a sensible starting point on both platforms. In PWA LAB tests, `fullscreen` had a much more visible effect on Android, while iPhone did not reproduce the same Android-style fullscreen presentation. Likewise, navigation outside the declared `scope` may expose browser-like UI on iPhone. A broad scope such as `/` may be useful for a whole-site app, but can complicate a design that aims to keep multiple page-specific installations separate on Android.

The right configuration depends on the experience you want: one site-wide app, one section, or separate entries for individual pages. Do not use `scope: "/"` automatically for every project.

## Installation requirements and the Service Worker distinction

The manifest describes the installed app experience; a Service Worker handles tasks such as caching and offline request behavior. A Service Worker is not universally required just to add a page to the Home Screen, and PWA LAB has observed Chrome installation flows without `sw.js`. Browser criteria still matter: HTTPS, valid manifest JSON, usable icon assets, and the requested display mode should all be checked.

Registering a Service Worker does not automatically make an app work offline. That requires an intentional caching and request strategy. Conversely, a Home Screen app can be useful even without offline support.

## Troubleshooting manifest problems

If the website loads but installation or the Home Screen result looks wrong, check the manifest request in developer tools first. Look for an incorrect URL, invalid JSON, the wrong MIME type, missing icons, an unintended `start_url`, an overly broad or narrow `scope`, or an old cached manifest. After changing identity or icons, retest the actual installed entry on both platforms.


## Explore the Manifest in Depth

A manifest reference is useful, but device behavior is where design decisions become real. These guides examine each setting in more detail.

### Minimum setup and launch URLs

- [How Much Should You Put in manifest.json? Minimum, Recommended, and Optional PWA Fields](https://tips.ojapp.app/en/pwa-manifest-minimum-recommended-fields-2/)
- [What Should You Use for PWA start_url? Home Page, Current Page, or a Dedicated URL](https://tips.ojapp.app/en/pwa-start-url-top-current-page-dedicated-url-2/)
- [Why start_url: "." May Be the Best Choice for PWAs That Should Reopen the Same Page](https://tips.ojapp.app/en/pwa-start-url-dot/)
- [Why Does a Different Page Open After “Add to Home Screen”? Understanding PWA start_url](https://tips.ojapp.app/en/pwa-home-screen-wrong-page-start-url-2/)

### App boundaries and identity

- [What Does PWA scope Do? Comparing iPhone and Android Behavior](https://tips.ojapp.app/en/pwa-scope-iphone-android-difference-2/)
- [What Is the PWA Manifest id? What Happens If You Omit It?](https://tips.ojapp.app/en/pwa-manifest-id-multiple-install-2/)
- [Can You Install Multiple PWAs from the Same Domain? Understanding id, scope, and start_url](https://tips.ojapp.app/en/pwa-multiple-install-same-domain-2/)

### Display modes, names, and icons

- [PWA standalone vs fullscreen: What's the Difference and Which Should You Use?](https://tips.ojapp.app/en/pwa-standalone-vs-fullscreen-2/)
- [PWA Home Screen Icons Explained: name, short_name, and icons](https://tips.ojapp.app/en/pwa-home-screen-icon-name-short-name-icons-2/)
- [Why `any maskable` Alone May Not Be Enough for PWA Icons on Android and iPhone](https://tips.ojapp.app/en/pwa-icon-any-maskable-trap/)
- [What Are PWA screenshots For? Improving the Chrome Install Experience](https://tips.ojapp.app/en/pwa-manifest-screenshots-install-ui-2/)

### Manifest vs. Service Worker

- [Can You Build a PWA with Only manifest.json? Testing How Far It Works Without a Service Worker](https://tips.ojapp.app/en/pwa-manifest-only-without-service-worker-2/)

## Conclusion

Start with the few settings that define the experience: name, launch URL, display mode, and icons. Add more only when the intended behavior requires them. The key design question is whether you want **one site as one app** or **each page as its own app**.
