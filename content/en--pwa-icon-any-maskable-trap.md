---
updated: 2026-11-08
---

# Why `any maskable` Alone May Not Be Enough for PWA Icons on Android and iPhone

I once thought that adding `purpose: "any maskable"` to a single Manifest icon was the perfect cross-platform solution. It is a valid declaration, but my real-device tests revealed an important design problem: the same image does not always look right when cropped by Android and displayed more directly on iPhone.

## Why I initially chose `any maskable`

A Manifest icon can declare `any`, `maskable`, or both. Using both keywords makes one image available for regular and maskable contexts.

```json
{ "src": "/icon.png", "sizes": "512x512", "purpose": "any maskable" }
```

That looks elegant. The catch is that eligibility and appearance are different questions.

## Android needs room for cropping

Android launchers may apply a circular or other mask. A maskable icon should keep its important artwork inside the safe area. If a logo reaches the edges, it can be cut off.

## iPhone may benefit from a larger-looking image

On iPhone, an icon designed with generous Android-safe padding may look unexpectedly small. A more tightly framed version can look better in the iOS home screen layout.

## My preferred approach: two icon assets

Rather than asking one image to satisfy conflicting visual requirements, I prefer to supply a regular icon and a maskable icon separately:

```json
{
  "icons": [
    { "src": "/icon-any.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

This is not a browser requirement to always use two files. It is a design choice that gives each context a more suitable image.

## The `apple-touch-icon` decision

For iOS, the HTML may also include:

```html
<link rel="apple-touch-icon" href="/icon-any.png">
```

But be careful with dynamic page-specific icons. If a global `apple-touch-icon` points to a different image, Safari may choose it instead of the icon intended for the current page.

## Conclusion

`any maskable` is useful, but it is not a universal visual fix. Android's cropping behavior and iOS icon selection are separate concerns. If icon quality matters, test both platforms and consider separate assets for their different needs.
