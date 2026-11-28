A **Progressive Web App (PWA)** brings app-like experiences to the Web. A website can be added to a phone’s Home Screen and launched with a tap, without requiring an App Store or Google Play listing.

But a PWA is not a magic converter that turns every website into a native app. The right implementation depends on what users want to launch, how they will return, and which features actually matter.

This guide covers PWA fundamentals, the technologies behind them, practical implementation options, and two design approaches I use in my own projects: **1S1A (One Site. One App.)** and **1P1A (One Page. One App.)**.

## What can a PWA do?

Depending on the platform and implementation, a PWA can provide:

- **Add to Home Screen:** a dedicated icon for one-tap access
- **App-like display:** a standalone window without the usual browser address bar
- **Offline capabilities:** cached resources and fallback experiences using a Service Worker
- **Push notifications:** where supported and permitted by the user
- **Purposeful launch URLs:** a site homepage or a specific page as the entry point

Not every PWA needs all of these. A small web tool that launches from the Home Screen has different requirements from an offline-first business application.

For the distinction between an app and a Home Screen bookmark, see [Is a Website Added to Your Home Screen an App or a Bookmark?](https://tips.ojapp.app/en/home-screen-website-app-or-bookmark-3/).

## The three building blocks: Manifest, Service Worker, and HTTPS

### Web App Manifest

A Web App Manifest describes the app’s name, icon, launch URL, and display preferences.

```json
{
  "name": "My Web App",
  "short_name": "My App",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    { "src": "/icon.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Here, `start_url` points to the website’s homepage. That is one option, not a universal best practice. The correct launch URL depends on what the Home Screen icon is supposed to open.

See [Web App Manifest Basics](https://tips.ojapp.app/en/pwa-manifest-json-basics/) for a closer look at individual settings and platform differences.

### Service Worker

A Service Worker is JavaScript that operates separately from a web page and can help manage caching, offline access, and push notifications.

**It is not universally required just to make a website available from the Home Screen.** Installability checks and supported capabilities vary across browsers and operating systems.

I tested that distinction in [Does a PWA Require a Service Worker in 2026?](https://tips.ojapp.app/en/pwa-service-worker-required-2026-2/).

### HTTPS

Many important PWA-related APIs require a secure context, typically HTTPS. Local development environments such as localhost have specific exceptions, but HTTPS should be the baseline for a publicly deployed PWA.

## The design question: What counts as one app?

Most tutorials explain how to write a manifest. Before writing one, I think there is a more important question:

**Does the user want to save the whole website, or the specific page they are looking at?**

I describe these two approaches as 1S1A and 1P1A. They are design models, not competing web standards.

### 1S1A: One Site. One App.

```json
{
  "start_url": "/",
  "display": "standalone"
}
```

This makes the website homepage the main entry point. It suits portals, company websites, and services that work best as one cohesive app.

```text
Home Screen
└─ 🏠 Website
   ├─ Articles
   ├─ Products
   └─ Contact
```

### 1P1A: One Page. One App.

```json
{
  "start_url": ".",
  "display": "standalone"
}
```

This approach treats an individual page as a useful Home Screen entry point: an article, product, booking page, profile, or web tool.

```text
Home Screen
├─ 📄 Article A
├─ 🛒 Product page
├─ 📅 Booking page
└─ 🧮 Web tool
```

The Web has always been page-oriented. Search results, shared links, and bookmarks all point to individual URLs. Why not let the Home Screen work that way too?

That question led me to 1P1A. However, `start_url: "."` alone does not guarantee independent installations of every page. Manifest location, `id`, `scope`, and operating-system behavior also matter.

For the reasoning behind this approach, read [The PWA Design Philosophy of 1P1A](https://tips.ojapp.app/en/1p1a/), or [The Two Directions of PWA Design](https://tips.ojapp.app/en/pwa-1s1a-vs-1p1a-2/) for a comparison.

## How to build a PWA

The traditional approach is to create a Web App Manifest, link it from your HTML, and add a Service Worker if the desired features require one. Then test the launch experience on real devices.

For a step-by-step introduction, see [How to Build a PWA](https://tips.ojapp.app/en/how-to-pwa-2/).

### WordPress: use a plugin

A WordPress plugin can simplify Home Screen support. For example, OJapp PWA Marketing can generate page-specific manifests and icons for posts, pages, and WooCommerce product pages.

You can find the project at [OJapp PWA Marketing](https://ojapp.app/pwa-marketing/en).

### Other websites: generate a manifest with one script

OJapp FREE offers a one-line option for page-based Home Screen apps:

```html
<script src="https://ojapp.app/js/ojapp_1p1a_en.js"></script>
```

You can optionally customize the title and icon:

```html
<meta name="ojapp:title" content="Page Title">
<meta name="ojapp:icon" content="https://example.com/icon.png">
```

This generates the manifest client-side instead of requiring a manually maintained manifest for each page. Offline functionality, if needed, remains a separate design decision.

## Which websites benefit from PWAs?

A site-wide entry point makes sense when users repeatedly return to the whole service. A page-specific entry point may be more useful for tools, products, articles, and member pages.

The key question is not simply whether a website *can* be a PWA. It is **why someone would want to open it again from their Home Screen**.

Read [Which Websites Are Good for PWA?](https://tips.ojapp.app/en/pwa-suitable-websites-use-cases-2/) for use cases, and [PWA Benefits from the User's Perspective](https://tips.ojapp.app/en/pwa-user-benefits/) for the user-centered view.

## Are PWAs the same on iPhone and Android?

They share core web technologies, but installation flows, icons, display modes, and multi-app behavior can differ. Designing for Android Chrome does not automatically produce the same experience on iPhone.

For iPhone-specific capabilities and limitations, see [PWA on iPhone: What You Can and Can't Do in 2026](https://tips.ojapp.app/en/pwa-ios-2026-complete-guide/).

## Conclusion: Design the entry point, not just the installation

A PWA can give a website an app-like Home Screen experience. The manifest defines how that experience launches and appears; Service Workers can add caching and offline functionality when needed.

The deeper design choice is **what should count as one app**. With 1S1A, the website is the entry point. With 1P1A, an individual page can be the entry point.

Start with the user's reason to return, then choose the architecture that supports it. That is the most useful way I know to approach PWA design.
