The Web App Manifest includes a `display` property that controls how a PWA is presented when it launches.</p>

Two of the most common values are `standalone` and `fullscreen`.

From the names alone, the difference sounds obvious: standalone feels like a regular app window, while fullscreen takes over the entire screen.

But when I tested both modes on real Android and iPhone devices in PWA LAB, the results were not identical across platforms. **Android showed a clear visual difference, while the iPhone behavior in my tests changed very little.** For most PWAs, I would start with `standalone` and use `fullscreen` only when there is a clear reason to remove as much surrounding UI as possible.

## standalone and fullscreen are set with the Manifest display property

For standalone:

```json
{
  "display": "standalone"
}
```

For fullscreen:

```json
{
  "display": "fullscreen"
}
```

The `display` property tells the browser how the installed web app should be presented when launched from places such as the home screen.

If you want more background on Manifest configuration, see [How to Build a PWA: A Beginner-Friendly Guide to manifest.json, Service Workers, and Home Screen Setup](https://tips.ojapp.app/en/how-to-pwa-2/).

## The difference is very visible on Android

In my Android testing, standalone and fullscreen produced clearly different results.

### standalone

`standalone` gave me what I would describe as the normal PWA experience.

The large browser address bar was gone and the app felt separate from a normal browser tab.

In my test environment, Android still displayed a toolbar.

So it felt app-like without completely taking control of the screen.

### fullscreen

With `fullscreen`, Android removed that toolbar as well.

The content used the full display and the result felt much more like a dedicated application.

That can be useful for experiences such as games, media, timers, or dedicated tools where every part of the screen matters.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>Fullscreen is powerful 👻 But don't choose it just because it sounds more app-like. Ask whether your interface actually needs the browser UI to disappear.</div>
</div>

## On iPhone, my tests showed very little visual difference

The iPhone result was the more interesting part.

In PWA LAB, I repeatedly switched the Manifest between `standalone` and `fullscreen`, added the app to the home screen, and launched it again.

In my test environment, I did not see a major visual difference between the two modes.

Both appeared as home-screen web apps with a very similar presentation.

That was a useful reminder that PWA display settings should not be judged only by their names or by what happens on Android.

I documented that comparison in more detail in [Is display: fullscreen Practical for PWAs? Comparing iPhone and Android Behavior](https://tips.ojapp.app/en/pwa-display-fullscreen-iphone-android-2/).

## standalone vs fullscreen at a glance

<table>
<thead>
<tr><th>Comparison</th><th>standalone</th><th>fullscreen</th></tr>
</thead>
<tbody>
<tr><td>Android</td><td>App-like mode; toolbar remained in my tests</td><td>Full-screen presentation; toolbar removed in my tests</td></tr>
<tr><td>iPhone</td><td>Home screen web app presentation</td><td>No major visual difference in my tests</td></tr>
<tr><td>App-like feel</td><td>Already strong</td><td>Stronger on Android</td></tr>
<tr><td>Screen space</td><td>Suitable for normal PWA interfaces</td><td>Maximizes available screen area</td></tr>
<tr><td>Typical use</td><td>Blogs, ecommerce, SaaS, tools</td><td>Games, kiosks, immersive tools, media</td></tr>
</tbody>
</table>

The biggest practical difference in my testing was on Android, where fullscreen removed more browser-related interface.

## For a normal PWA, standalone is usually enough

If I do not have a specific reason to choose otherwise, I use `standalone`.

It already gives the web app a dedicated, app-like presentation without forcing the interface into a full-screen experience.

That makes it a practical default for things like:

- blogs
- product pages
- booking pages
- profiles
- dashboards
- general-purpose web tools

For a page-focused approach such as OJapp's 1P1A, the goal is often to make an existing web page easy to return to from the home screen. In those cases, there is usually no need to remove every piece of surrounding UI.

## Use fullscreen when the entire screen has a purpose

Fullscreen is not a better or worse mode. It is simply more appropriate for certain interfaces.

Examples might include:

- games
- timers
- presentation displays
- digital signage
- kiosk-style interfaces
- image or video tools that need maximum screen space

In those cases, removing the toolbar can directly improve the experience.

For a normal article, shop page, or web service, choosing fullscreen only because it “looks more like an app” can be unnecessary.

**The better question is not “can I use fullscreen?” but “does this interface benefit from being fullscreen?”**

## display mode can also be detected from JavaScript

There is another practical advantage to display modes: JavaScript can detect them.

```js
const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches;
```

This can be used to change behavior when the PWA is running in standalone mode.

For example, you can:

- change navigation for home screen users
- hide an Add to Home Screen message
- show a special returning-user message
- track standalone usage separately

For practical runtime checks like this, see [How to Check PWA Status: Mode, Service Worker, Push, and Installable Explained](https://tips.ojapp.app/en/how-to-check-pwa-status/).

## Always verify display settings on real devices

The biggest lesson from this test was simple: **do not assume that a display mode will behave identically everywhere.**

In PWA LAB I tested:

- standalone
- fullscreen
- minimal-ui
- browser

Android often showed obvious differences between these settings. On iPhone, some of them produced little or no visible change in my test environment.

So after changing `display`, I recommend actually adding the PWA to the home screen and launching it on the devices you care about.

## If you're unsure, start with standalone

The practical conclusion is simple.

**Use standalone for a normal PWA.**

**Use fullscreen when you have a clear reason to use the entire screen.**

On Android, fullscreen created a noticeably more immersive result in my testing because the toolbar disappeared.

On the iPhone I tested, standalone and fullscreen looked almost the same.

So fullscreen is not a higher-level version of standalone, and standalone is not a compromise.

They are different presentation choices for different kinds of interfaces.

My usual approach is to start with `display: standalone`. If I later find myself thinking, “this toolbar is actually getting in the way,” that is when I test fullscreen.
