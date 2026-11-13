After users add your PWA to their home screen, an important question comes next: are they actually returning through that icon?</p>

Standard web analytics does not always make that obvious.

You may see page views increasing, but those visits can include Google Search, bookmarks, direct browser visits, links, and home screen launches all mixed together.

One practical solution is to reuse the `display-mode: standalone` detection. **When the page is running as a standalone PWA, send a dedicated analytics event.** That gives you a separate signal for home-screen-based usage.

## Why UTM parameters are not enough

A common idea is to put UTM parameters in the PWA launch URL.

```text
https://example.com/?utm_source=homescreen&utm_medium=pwa
```

If that URL is used as the PWA's start URL, analytics can recognize visits carrying those parameters.

But a UTM parameter is fundamentally **information attached to a URL.**

If someone copies that URL and opens it in a normal browser, the same UTM values are still there even though the page was not launched from the home screen.

Likewise, after navigating to another page inside the PWA, the original UTM values may no longer be present in the current URL.

UTM parameters are excellent for identifying campaign URLs and traffic sources. They do not directly answer the question: **is this page currently running as a standalone PWA?**

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>Think of UTM as a label attached to the URL. Standalone detection checks how the page is actually running right now. Different jobs 👻</div>
</div>

## Detect a home screen PWA launch with standalone mode

The basic check is small:

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;
```

The first condition checks for `display-mode: standalone`, while `navigator.standalone` provides an additional iOS-oriented check.

I use this same type of detection in PWA LAB to show whether a test page is currently running as `WEB` or `PWA`.

For more background on these runtime checks, see [How to Check PWA Status: Mode, Service Worker, Push, and Installable Explained](https://tips.ojapp.app/en/how-to-check-pwa-status/).

## Send a custom event to GA4

If your site uses Google Analytics 4, you can send a custom event only when the page is running in standalone mode.

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA && typeof gtag === 'function') {
  gtag('event', 'pwa_home_launch', {
    page_path: location.pathname,
    page_title: document.title
  });
}
```

This sends an event named:

```text
pwa_home_launch
```

Normal browser visits do not send it. A page running as a standalone PWA does.

You can then analyze home screen usage separately from ordinary page views.

## Be careful not to count every internal navigation as a new launch

There is one practical problem with the simple version above.

If the same script runs on every page, navigating inside the PWA may trigger `pwa_home_launch` again each time a new document loads.

If your goal is to approximate how often users start a PWA session from the home screen, counting every internal page transition would inflate the number.

A simple approach is to record the event only once per session using `sessionStorage`.

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

const alreadyTracked =
  sessionStorage.getItem('pwa_launch_tracked');

if (isPWA && !alreadyTracked && typeof gtag === 'function') {
  gtag('event', 'pwa_home_launch', {
    page_path: location.pathname,
    page_title: document.title
  });

  sessionStorage.setItem('pwa_launch_tracked', '1');
}
```

This prevents repeated events during the same session in many common page-navigation flows.

It is still important to describe the metric correctly. This does not give you an operating-system-level count of every physical tap on the home screen icon.

It is a **web-side measurement of usage that begins in a standalone PWA context.**

## Page-level launch analytics works especially well with 1P1A

Adding the page path to your event makes the data much more useful.

```text
gtag('event', 'pwa_home_launch', {
  page_path: location.pathname,
  page_title: document.title
});
```

You can start seeing patterns such as:

- Product A was launched 50 times from the home screen.
- A booking page was launched 120 times.
- A web tool was launched 300 times.
- A particular article was rarely reopened from the home screen.

This fits naturally with [1P1A (One Page. One App.)](https://tips.ojapp.app/en/1p1a/), where individual pages can become their own home screen entry points.

Page views alone tell you that a page was viewed. Home screen launch data can help answer a different question: **which pages are valuable enough that users actually return to them through a persistent home screen entry?**

## Page views and home screen launches represent different behavior

<table>
<thead>
<tr><th>Metric</th><th>What it tells you</th></tr>
</thead>
<tbody>
<tr><td>Page View</td><td>How many times the page was displayed</td></tr>
<tr><td>Traffic Source</td><td>Where visitors arrived from, such as search or referrals</td></tr>
<tr><td>UTM</td><td>Which tagged campaign or URL was used</td></tr>
<tr><td>PWA Home Launch</td><td>Usage detected while the page is running in standalone mode</td></tr>
</tbody>
</table>

One hundred search visits and one hundred home screen launches are not the same kind of relationship with a page.

With a home screen entry, the user may have deliberately kept that page and then returned to it later without searching for it again.

As I continued experimenting with PWA usage, I found that looking only at page views misses part of what makes the home screen interesting. **Whether the home screen actually becomes a return path** is often the more meaningful PWA-specific question.

## You can send the event to your own API instead of GA4

GA4 is not required.

You can also send standalone usage directly to your own endpoint.

```text
if (isPWA) {
  fetch('/api/pwa-launch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: location.pathname,
      timestamp: Date.now()
    })
  });
}
```

Your backend can then aggregate launches by page, date, operating system, or other non-sensitive dimensions you choose to collect.

OJapp PRO develops this same idea into a Home Screen Launches metric. Instead of treating all web traffic as one pool, the analytics focuses specifically on whether the home screen is functioning as a return entry point.

That broader idea is also explained in [What Is Home Screen Marketing? A New Web Strategy for Delivering Pages with PWA](https://tips.ojapp.app/en/home-screen-marketing-2/).

## You do not need to identify individual users

Tracking home screen usage does not automatically mean building individual user profiles.

For many use cases, simple aggregate information is enough:

- launch count
- page
- operating system
- date and time

That can already tell you whether a page is being used as a recurring home screen destination.

For PWA analysis, the first useful question may simply be: **after users keep this page on their home screen, do they actually come back through it?**

## Do not stop at how many times the PWA was added

Once you start putting web pages on the home screen, it is tempting to focus on an install-like number: how many people added it?

But the more interesting part comes afterward.

If an entry sits on the home screen and is never opened again, it is not doing much as a return path.

If a smaller number of users repeatedly launch it, that page may have real home screen value.

Use UTM parameters to understand tagged URLs and campaigns.

Use page views to understand how often content is viewed.

And use standalone detection to add another signal: **did this usage come through the PWA-style home screen experience?**

Once you can measure that, PWA stops being only a feature that puts an icon on the device. You can start evaluating whether the home screen is actually working as a persistent path back to your web content.
