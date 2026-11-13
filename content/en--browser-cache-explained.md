---
updated: 2026-11-06
---

You update your CSS, deploy the new version, and check your phone—only to find the old design still there. Or you fix a JavaScript bug, but the previous behavior keeps coming back.

Browser caching is a common explanation, but **an outdated page is not automatically a browser-cache problem**. A CDN, a Service Worker, or an incomplete deployment can produce similar symptoms. This guide explains how HTTP caching works and how to diagnose stale updates without guessing.

## What Is Browser Cache?

Browsers can store responses such as HTML, CSS, JavaScript, and images, then reuse them to reduce network traffic and speed up loading.

The important question is not simply whether a response is cached. It is **when the browser is allowed to reuse it without checking for changes**.

## Strong Cache vs. Weak Cache

“Strong cache” and “weak cache” are common developer shorthand, not formal categories in the HTTP specification. They generally describe fresh-cache reuse and conditional revalidation.

### Strong caching: Reuse a fresh response

```http
Cache-Control: public, max-age=3600
```

For approximately one hour after retrieval, the response is normally considered fresh. During ordinary navigation, the browser can reuse it without contacting the server. `Expires` can also specify an expiration time, although `Cache-Control` generally takes precedence.

```http
Cache-Control: public, max-age=31536000, immutable
```

Long-lived caching is useful for assets whose URLs change whenever their content changes. It does **not** mean the file can never be refreshed for a year: reload behavior, cache eviction, and user actions can still matter.

### Weak caching: Revalidate a stored response

```http
Cache-Control: no-cache
ETag: "build-42"
```

Despite its name, `no-cache` does **not** mean “do not store.” It means the stored response must be validated before reuse.

The browser may send:

```http
If-None-Match: "build-42"
```

If nothing changed, the server returns `304 Not Modified` and the browser reuses its stored response. Otherwise, the server normally returns `200 OK` with updated content.

`Last-Modified` and `If-Modified-Since` provide another validation mechanism. When both validators are available, `If-None-Match` generally takes precedence.

## `no-cache` Is Not `no-store`

| Directive | What it means | Typical use |
| --- | --- | --- |
| `max-age=3600` | Reuse while fresh | Static resources |
| `no-cache` | Revalidate before reuse | HTML, frequently updated JSON |
| `no-store` | Do not store in HTTP caches | Sensitive responses |
| `immutable` | Indicates content will not change while fresh | Fingerprinted assets |

`no-store` does not automatically delete previously stored responses or content maintained independently by a Service Worker.

## Why Your Updates May Not Appear

### 1. The same asset URL is still fresh

If you replace `/style.css` while its previous response remains fresh in the browser cache, the browser may continue using the old version. **The same URL does not always mean stale content**; the caching headers determine whether it needs to check again.

### 2. A CDN is serving an older response

CDNs such as Cloudflare maintain caches separate from the browser. Disabling the browser cache will not help if the CDN itself returns outdated content. Check both the origin and CDN layers.

### 3. A Service Worker is serving cached assets

A PWA's Service Worker can intercept requests and respond with resources from the Cache API. **The Cache API and the HTTP cache are separate systems.** Depending on the Service Worker's strategy, a normal reload may not fetch the newest asset.

### 4. The deployment or reference is wrong

Sometimes the new file never reached production, the HTML still references an old asset, or you are viewing a different environment. Verify what is actually deployed before clearing caches.

## How to Make Updates Reliable

### Use content-hashed filenames for CSS and JavaScript

```html
<link rel="stylesheet" href="/assets/style.a1b2c3.css">
<script defer src="/assets/app.d4e5f6.js"></script>
```

Changing the content changes the URL, so old cached assets do not conflict with the new ones. Build tools such as Vite commonly use this approach.

Query-string versioning can also work:

```html
<link rel="stylesheet" href="/style.css?v=20261106">
```

However, CDNs and Service Workers can have their own rules for query parameters. A changed URL is useful, but it is not a universal guarantee against every cache layer.

### Revalidate HTML; cache fingerprinted assets longer

A common pattern is:

```http
# HTML
Cache-Control: no-cache
```

```http
# Content-hashed CSS/JS
Cache-Control: public, max-age=31536000, immutable
```

The HTML can be checked for changes and point to new asset URLs, while unchanged assets remain highly cacheable. Long-term caching the HTML itself may prevent clients from discovering new filenames promptly.

## A Practical Debugging Checklist

1. **Check the deployment:** Is the updated file actually available on the production server?
2. **Inspect Network requests:** Check the resource URL, status, `Cache-Control`, `ETag`, and whether the response came from a cache.
3. **Test with caching disabled:** In desktop DevTools, enable “Disable cache” and reload to compare behavior (typically effective while DevTools is open).
4. **Inspect the CDN:** Check cache status and whether an invalidation or purge is needed.
5. **Inspect Service Workers:** Check registrations, controlled pages, and Cache Storage entries.

Avoid recommending that users clear all browsing data as the first fix. That can remove sessions and other saved site data.

## Are Safari, Chrome, and Firefox Different?

All three implement the core HTTP caching model, though reload behavior, storage management, and implementation details vary. It is inaccurate to assume Safari always caches more aggressively or Chrome always handles updates correctly.

If navigating Back or Forward restores an older page instantly, **the back/forward cache (BFCache)** may be involved. BFCache is distinct from the ordinary HTTP cache and should be investigated separately.

## Conclusion

Browser caching makes websites faster. Stale updates become a problem when **cache policy and deployment strategy do not match how resources change**.

Use versioned asset URLs, configure HTML for appropriate revalidation, and diagnose browser, CDN, Service Worker, and deployment layers separately. That is a much more reliable approach than repeatedly clearing caches and hoping for the best.
