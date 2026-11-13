---
updated: 2026-11-05
---

Want your website to open from a phone's Home Screen with its own icon and name? Maybe you'd also like it to work when the connection drops.

That's where Progressive Web App (PWA) features come in. The main pieces are straightforward:

- **Web App Manifest:** Defines the app name, icons, launch URL, and display mode.
- **Service Worker:** Enables features such as caching and offline behavior.
- **App icons:** Provide the images used on the Home Screen.

One distinction matters from the beginning: **adding a website to the Home Screen is not the same as enabling offline support**. Some browsers allow Home Screen installation without a Service Worker. And adding a manifest alone does not make your site work offline.

We'll build Home Screen support first, then add a Service Worker only if you need it.

## 1. Create manifest.json

Create a `manifest.json` file in your site's public directory:

```json
{
  "name": "Sample Web App",
  "short_name": "Sample",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

`name` is the app's full name, `short_name` is a shorter label, and `icons` lists the image files. The `standalone` display mode asks supported platforms to launch the site without the usual browser interface.

Pay particular attention to `start_url`. Here, `/` means the site's root page opens when the Home Screen icon is tapped.

You can also use a relative value such as `"start_url": "."`, but **the dot does not mean “whatever page the user is currently viewing.”** Relative `start_url` values are resolved against the manifest file's URL. If every page uses `/manifest.json`, a dot normally resolves to the site root.

To give different pages different launch destinations, you also need to design how their manifests are located or served.

## 2. Link the manifest from HTML

Add this inside the page's `<head>`:

```html
<link rel="manifest" href="/manifest.json">
```

The browser will request the file at that URL. If the path is wrong, the manifest won't load. Check the Application/Manifest panel in developer tools or inspect the network response.

Serve the file with an appropriate JSON MIME type, such as `application/manifest+json`.

## 3. Prepare your Home Screen icons

The example uses two PNG images:

- `/icons/icon-192.png` (192×192 pixels)
- `/icons/icon-512.png` (512×512 pixels)

These are common recommended sizes, but icon selection, cropping, and installation checks vary across platforms. For Android, consider a separate maskable icon if you want more control over adaptive icon shapes.

On iPhone, it's also worth providing an Apple touch icon:

```html
<link rel="apple-touch-icon" href="/icons/icon-512.png">
```

Updating the image file does not guarantee that an existing Home Screen icon will immediately change. When testing, compare it with a newly added icon.

## 4. Publish over HTTPS

Service Workers generally require a secure context, so use HTTPS for a public site. Local development environments such as `localhost` are treated as exceptions.

HTTPS alone does not guarantee that a browser will show an Install button. Installation behavior depends on the browser and platform.

## 5. Register a Service Worker

If you want caching or offline features, create `sw.js` at the site root:

```js
self.addEventListener("install", () => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker activated");
});
```

Then register it from your page's JavaScript:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .catch((error) => console.error("SW registration failed:", error));
}
```

This registers a Service Worker in supporting browsers, but **it does not enable offline browsing by itself**. Service Worker registration also isn't what makes `display: "standalone"` take effect.

## 6. Add caching if you need it

For a basic offline example, replace the previous `sw.js` with the following:

```js
const CACHE_NAME = "sample-pwa-v1";
const OFFLINE_FILES = ["/", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_FILES))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key.startsWith("sample-pwa-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
```

This is a deliberately simple Cache First example. The cached `/` page can be returned without a network connection. Pages you haven't cached will not automatically work offline.

Cache First also comes with a trade-off: users may keep seeing old files after you've published an update. Real projects need a cache versioning and cleanup strategy, and possibly a different caching approach for frequently updated content.

For more detail, see [PWA caching strategies](https://tips.ojapp.app/pwa-cache-strategy/).

## 7. Test on Android and iPhone

Now try it on real devices.

On Android, open the site in Chrome and use the Install or Add to Home Screen option if available. On iPhone, open it in Safari and use Add to Home Screen from the sharing menu. The exact labels and steps can vary by OS and browser version.

Check the following:

- Does the icon look right?
- Is the app name correct?
- Does the icon open the intended URL?
- Is the browser interface shown or hidden as expected?
- How are theme colors applied?
- What happens when the phone goes offline?
- Do changes appear after you publish an update?

The same manifest may behave differently on Android and iPhone. Passing a desktop developer-tools check is useful, but it isn't a substitute for device testing.

## Common problems and what to check

**The manifest doesn't load:** Check the link URL, JSON syntax, and server response.

**The wrong icon appears:** Check the image URLs and sizes, the Apple touch icon, and cached Home Screen icons.

**The app always opens the homepage:** Check `start_url` and remember that relative paths are resolved against the manifest URL.

**Updates don't appear:** Inspect HTTP caching, the Service Worker, and Cache Storage.

**Offline mode doesn't work:** Registering a Service Worker isn't enough. Confirm that the page and required resources have actually been cached.

## Conclusion: Start with Home Screen support, then add features

You don't need to build every PWA feature at once.

Start with a manifest and icons, link the manifest in HTML, publish securely, and test adding the site to the Home Screen. Then register a Service Worker and implement caching if your project needs offline behavior.

The details most likely to surprise you are `start_url`, icon selection, and cached updates. That's why the job isn't finished when the code runs: **test how the site actually launches from the Home Screen on both Android and iPhone.**
