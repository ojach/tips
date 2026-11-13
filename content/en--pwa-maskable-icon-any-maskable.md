---
updated: 2026-11-08
---

# Hours Lost to PWA Icons: The `any maskable` and `apple-touch-icon` Traps

I was trying to make a PWA icon look right on Android. Launchers can crop icons into circles, rounded squares, or other shapes, so I experimented with the Manifest's `purpose` property. That simple task turned into hours of testing.

## My initial conclusion: `any maskable` looked like the answer

The `purpose` property describes how an icon can be used. `any` means a regular icon, while `maskable` indicates that the image is designed to survive launcher cropping.

```json
{
  "src": "/icon.png",
  "sizes": "512x512",
  "type": "image/png",
  "purpose": "any maskable"
}
```

Combining both keywords can make one resource eligible for both uses. At first, that seemed like the simplest possible solution.

## What happened when I used `maskable` alone

With only `maskable`, Android could use the image as an adaptive icon, but the results were not consistently what I expected across devices and launchers. A separate regular icon use case can still matter.

The key lesson was not that `maskable` is broken. It was that **declaring an image maskable is a promise about its safe area**, not an instruction to the operating system to display it at a particular size.

## Then iPhone added another complication

On iOS, Safari may prioritize `apple-touch-icon`. A page-specific Manifest icon can therefore be ignored in favor of a shared touch icon, especially when the page is meant to have its own identity.

This becomes particularly noticeable with 1P1A (One Page. One App.), where different pages are intended to appear as different home screen entries.

## Fixed icons and dynamic icons need different decisions

For a conventional site-wide app, a stable `apple-touch-icon` is usually sensible. For dynamically generated page icons, that same tag may get in the way unless it is updated to match the page before installation.

A practical Manifest can explicitly provide normal and maskable variants:

```json
"icons": [
  { "src": "/icon-regular.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
  { "src": "/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
]
```

## What I learned

There is no universal icon configuration that guarantees identical appearance on iPhone and every Android launcher. The reliable approach is to understand what each platform may select, design the maskable safe area deliberately, and test the resulting home screen icon on real devices.
