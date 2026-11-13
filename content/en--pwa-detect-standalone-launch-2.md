When building a PWA, you may want to know whether the current page was opened in a normal browser or launched as an installed, standalone web app.</p>

That distinction becomes useful when you want to change the interface for home screen users, measure PWA launches, or show something only when the web app is running in its app-like mode.

Fortunately, the basic JavaScript check is very small.

The key is <strong>`(display-mode: standalone)`</strong>.

## The simplest standalone detection

Start with this:

```js
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

if (isStandalone) {
  console.log('Running as a PWA');
} else {
  console.log('Running in the browser');
}
```

`window.matchMedia()` lets JavaScript evaluate a media query, much like CSS does.

In this case, the query is:

```text
(display-mode: standalone)
```

The `.matches` property becomes `true` when the current display mode matches standalone and `false` when it does not.

## What does display-mode: standalone mean?

A Web App Manifest can specify how a PWA should be presented when launched.

```json
{
  "display": "standalone"
}
```

`standalone` is designed to present the web app without much of the normal browser interface, giving it a more independent app-like window.

When a PWA configured this way is launched as a standalone app, JavaScript can detect that state with `(display-mode: standalone)`.

If you want to see how display modes actually differ across devices, I tested them in [Is display: fullscreen Practical for PWAs? Comparing iPhone and Android Behavior](https://tips.ojapp.app/en/pwa-display-fullscreen-iphone-android-2/).

## I used this to show PWA or WEB directly in PWA LAB

I also use this detection in PWA LAB.

Rather than checking the console every time, I wanted the current mode to be visible directly on the test page.

```js
const pwaStatus =
  document.getElementById('pwa-status');

const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches;

if (isStandalone) {
  pwaStatus.textContent = 'PWA';
} else {
  pwaStatus.textContent = 'WEB';
}
```

Open the page normally in the browser and it shows:

```text
WEB
```

Launch it in standalone mode and it shows:

```text
PWA
```

It is a very small piece of code, but it has been surprisingly useful during real-device testing.

Instead of assuming that a page is running as a PWA, I can immediately see which mode is actually active.

I use several similar checks in [How to Check PWA Status: Mode, Service Worker, Push, and Installable Explained](https://tips.ojapp.app/en/how-to-check-pwa-status/).

## Add navigator.standalone when you also want to cover iPhone

For iPhone home screen launches, I also include another check.

```js
const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches;

const isIOSPWA =
  window.navigator.standalone === true;

if (isStandalone || isIOSPWA) {
  console.log('Running in a home screen app mode');
} else {
  console.log('Running in the normal browser');
}
```

`navigator.standalone` has long been used on iOS to identify a web page running from the home screen in standalone mode.

For practical cross-platform code, I normally combine the two checks:

```js
window.matchMedia('(display-mode: standalone)').matches
||
window.navigator.standalone === true
```

This is also the approach I use in PWA LAB when I want one result for iPhone and other supported environments.

## Wrap it in a function

If you need the result in more than one place, putting the detection in a function keeps the rest of the code cleaner.

```js
function isPWA() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

if (isPWA()) {
  console.log('PWA MODE');
} else {
  console.log('WEB MODE');
}
```

You can then reuse it anywhere:

```text
if (isPWA()) {
  // Run only in PWA mode
}
```

This keeps the environment detection separate from whatever behavior you want to trigger afterward.

## This does not tell you whether the PWA is installed

This limitation is important.

`(display-mode: standalone)` tells you **how the current page is being displayed right now.**

It does not tell you whether the user installed the PWA sometime in the past.

For example, a user may have the PWA installed but then open the same URL manually in a normal browser tab. That browser tab is not standalone, even though a separate installed PWA exists on the device.

Likewise, a standalone result tells you that the current window is running in that display mode. It is not an installation database.

So this code does not directly answer questions such as:

- Has this user ever added the site to the home screen?
- How many users installed the PWA?
- Who currently has the PWA installed?

It is better to think of it as a check for **the current presentation and launch context**.

## Once you can detect the mode, you can change the experience

This small check becomes much more useful once you start designing different behavior for browser and PWA users.

For example, you could:

- show an Add to Home Screen message only in the browser
- hide that message after the user launches the PWA
- show a PWA-specific navigation element
- send standalone launches to analytics
- show a special message only to home screen users

I originally added the detection mainly as a debugging aid.

After using it, I realized it is also a useful boundary between two versions of the same experience: the normal web version and the version launched from the home screen.

If you are still getting familiar with how Manifest display settings work, [Why start_url: “.” May Be the Best Choice for PWAs That Should Reopen the Same Page](https://tips.ojapp.app/en/pwa-start-url-dot/) is another practical example of how Manifest configuration affects the launch experience.

## Test it on a real device

The JavaScript itself is simple, but PWA behavior can vary between operating systems and browsers.

In PWA LAB, Android Chrome and iPhone have often behaved differently even when starting from the same Manifest configuration.

After adding the detection code, I recommend testing the full flow:

1. Open the page normally in the browser.
2. Add or install it to the home screen.
3. Launch it from its home screen icon.
4. Check the detected mode.

The basic version worth remembering is:

```js
const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches;
```

If you also want the iOS fallback:

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;
```

**Once you know whether the page is running as normal web content or as a standalone PWA, you can start designing each experience differently.**

And that is where this tiny detection check becomes much more useful than it first appears.
