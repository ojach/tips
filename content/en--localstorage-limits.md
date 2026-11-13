---
updated: 2026-11-06
---

# The Limits of Local Storage: Capacity, Deletion Timing, and Safety Explained

Need to remember a user's dark-mode preference or save a draft in a web app? `localStorage` makes that easy with just a few lines of JavaScript.

But **surviving a browser restart is not the same as being permanently stored**. localStorage has a relatively small quota, its API is synchronous, and browser privacy and storage-management policies can make previously saved data unavailable.

This guide explains its practical limits, when data can disappear, and how to use it safely in websites and PWAs.

## What is localStorage?

`localStorage` is a browser storage API that saves string key–value pairs for an origin. An origin is generally defined by the **scheme, hostname, and port**.

```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
```

Data normally survives closing the tab or browser. By contrast, `sessionStorage` is tied to a page session and is generally cleared when that tab's session ends. Neither works like a cookie that is automatically sent with matching HTTP requests.

### It stores strings, not JavaScript objects

Use JSON serialization when storing structured settings:

```js
const settings = { theme: "dark", fontSize: "large" };
localStorage.setItem("settings", JSON.stringify(settings));

const raw = localStorage.getItem("settings");
let restored = null;
try {
  restored = raw === null ? null : JSON.parse(raw);
} catch {
  // Recover from malformed or outdated saved data
  restored = null;
}
```

Not every JavaScript value can be represented in JSON, so define a clear storage format.

## Capacity: roughly 5 MiB, not unlimited space

Web Storage quotas are small. **Around 5 MiB per origin for localStorage** is a common guideline, but limits and accounting differ between browsers. Do not assume every device guarantees exactly that amount.

A few preference flags are tiny. Base64-encoded images, growing activity logs, and large JSON datasets can exhaust the quota surprisingly quickly.

When a write exceeds the allowed quota, `setItem()` can throw `QuotaExceededError`. Storage access can also be restricted in some environments, so handle failures explicitly.

```js
function saveSettings(value) {
  try {
    localStorage.setItem("settings", JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn("Settings could not be saved", error);
    return false;
  }
}
```

## Synchronous storage can block the UI

`getItem()` and `setItem()` are synchronous. JavaScript waits for them to complete, which can affect responsiveness when repeatedly reading or writing large values.

For small preferences this is usually manageable. For larger structured datasets and offline records, asynchronous `IndexedDB` is a better fit.

## When can localStorage data disappear?

There is no built-in expiration date for localStorage entries, but data can become unavailable when:

- The user clears website data
- A private browsing session ends
- Browser privacy or storage-management rules apply
- A browser profile changes, an app is removed, or a device is reset
- The origin changes, such as from `http` to `https` or to a different subdomain

**A successful write is not a promise that the data will always be there.**

### Safari, ITP, and the seven-day rule

Safari's Intelligent Tracking Prevention (ITP) includes policies affecting script-writable storage. WebKit has documented restrictions involving seven days without user interaction in certain browsing contexts.

That does **not** mean every iPhone automatically deletes all localStorage after exactly seven days. The relevant browsing context, browser version, user interaction, and whether a website runs as a Home Screen web app all matter. Likewise, low-device-storage cleanup should not be described as a fixed rule that always deletes localStorage first.

Neither “PWAs always preserve storage” nor “PWAs always lose storage sooner” is a reliable generalization.

## localStorage vs cookies, IndexedDB, and Cache API

| Storage | Good for | Main limitation |
|---|---|---|
| `localStorage` | Small UI preferences and flags | Small quota, synchronous API, no permanence guarantee |
| `sessionStorage` | Temporary per-tab state | Cleared when the page session ends |
| `IndexedDB` | Structured records and offline datasets | Asynchronous; still subject to quotas and eviction |
| `Cache API` | Cached requests and responses | Requires an update and cleanup strategy |
| Cookies | Session handling | Size limits, scope, and security attributes |

IndexedDB and Cache API support larger data than localStorage, but **they are not guaranteed permanent storage either**. Important user-generated data should have an appropriately secured server-side source of truth and a recovery or synchronization strategy.

## Security: avoid storing sensitive tokens casually

JavaScript running on the same origin can read localStorage. If an attacker exploits an XSS vulnerability, malicious code may be able to steal those values.

Avoid putting long-lived authentication tokens, payment details, or highly sensitive personal information there without a carefully reviewed threat model. For sessions, consider cookies configured with `HttpOnly`, `Secure`, and appropriate `SameSite` attributes. Cookies have their own concerns, including CSRF, and still require proper protections.

## Three practical implementation rules

### 1. Treat missing data as normal

Your app should start correctly when a key returns `null`. Restore defaults or fetch important state from the server rather than treating a missing preference as a fatal error.

### 2. Version your saved data

```js
const data = { version: 1, theme: "dark" };
localStorage.setItem("app-settings", JSON.stringify(data));
```

A version field makes it easier to migrate or reset older formats after an update.

### 3. Handle read and write errors

Account for quota failures, blocked access, and malformed JSON. If the user is relying on a saved draft, explain when saving fails instead of silently losing their work.

## Conclusion: a notepad, not a vault

localStorage is excellent for **small, recoverable settings**. Its roughly 5 MiB quota, synchronous API, potential deletion, and exposure to same-origin JavaScript define its boundaries.

Do not use it as the only copy of valuable data, a database for large assets, or a casual store for sensitive credentials. In a PWA or any other web app, keep localStorage's responsibilities narrow and design a recovery path for anything that matters.

## Related reading

- [Local browser storage basics](https://tips.ojapp.app/en/local-storage-basics/)
- [How browser caching works](https://tips.ojapp.app/en/browser-cache-how-it-works/)
- [PWA caching strategies](https://tips.ojapp.app/en/pwa-cache-strategy/)
