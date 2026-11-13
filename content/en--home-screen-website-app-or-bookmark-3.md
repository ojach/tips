Both iPhone and Android let you add websites to your home screen.</p>

Once added, the website gets an icon that sits alongside your regular apps. Tap it, and the website opens.

That naturally raises a question: **did the website just become an app, or is that icon simply a bookmark?**

The answer is that not every website added to the home screen works in exactly the same way. Some are essentially convenient entry points to ordinary web pages, while others are designed as Progressive Web Apps, or PWAs, with a Web App Manifest and a more app-like launch experience.

## A home screen icon does not automatically mean PWA

This is probably the most important distinction.

**A website that can be added to the home screen is not automatically a PWA.**

Browsers and operating systems can allow ordinary websites to be placed on the home screen. Tapping the icon opens the saved URL, so this behavior can feel much closer to a website shortcut or bookmark.

A PWA can go further by using a Web App Manifest to define information such as its app name, icon, launch URL, and display mode.

If you want the broader picture first, see [What Is a PWA? A Simple Guide to How Websites Become “Apps” on Smartphones](https://tips.ojapp.app/en/what-is-pwa-2/).

## Ordinary home screen website vs PWA

At a high level, the difference looks like this.

<table>
<thead>
<tr><th>Comparison</th><th>Ordinary website on the home screen</th><th>PWA</th></tr>
</thead>
<tbody>
<tr><td>Core</td><td>Website</td><td>Web app</td></tr>
<tr><td>Launch point</td><td>Saved URL</td><td>Can be designed with Manifest fields such as start_url</td></tr>
<tr><td>Name and icon</td><td>Uses information available from the page or platform</td><td>Can be defined through the Manifest and related metadata</td></tr>
<tr><td>Display</td><td>Closer to normal browser behavior</td><td>Can use modes such as standalone</td></tr>
<tr><td>Offline use</td><td>Normally behaves like the regular web</td><td>Can support offline use with technologies such as Service Workers</td></tr>
<tr><td>Push notifications</td><td>Not provided simply by adding the icon</td><td>Possible with additional implementation on supported platforms</td></tr>
</tbody>
</table>

One thing is worth emphasizing: **a PWA does not stop being part of the web.**

Its content and functionality are still built with web technologies.

A useful way to think about PWA is that it lets developers design how a web experience should live and launch from the user's device.

## The Manifest defines how the web experience appears as an app

A key part of PWA design is the Web App Manifest.

A simple Manifest might look like this:

```json
{
  "name": "My App",
  "short_name": "My App",
  "start_url": ".",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon.png",
      "sizes": "512x512",
      "purpose": "any"
    }
  ]
}
```

This can define the name used for the app experience, its icon, where it launches, and how the browser should present it.

In my own PWA LAB device testing, the `display` setting has been particularly interesting. Changing between modes such as `standalone` and `fullscreen` can produce a noticeable difference on Android, while the visual difference can be much smaller on iPhone. PWA behavior is not identical across operating systems.

So the Manifest is more than a file for putting an icon on the home screen. It helps define **how the web experience should behave when launched from there.**

For another practical example of Manifest behavior, see [Is display: fullscreen Practical for PWAs? Comparing iPhone and Android Behavior](https://tips.ojapp.app/en/pwa-display-fullscreen-iphone-android-2/).

## Standalone mode is where a website can start feeling like an app

One reason PWAs can feel much more app-like is `display: standalone`.

```json
{
  "display": "standalone"
}
```

Open a normal website in a browser and you usually see browser interface elements around it.

When a PWA launches from the home screen in standalone mode, much of that browser chrome can be removed or reduced, giving the page its own app-like window.

I notice the difference clearly when using my own web tools from the home screen. The underlying tool is still on the web, but instead of finding it in Safari or Chrome, I tap a dedicated icon and launch it in its own interface. Mentally, it starts feeling less like “visiting a web page” and more like “opening a tool.”

That is also an important part of the design behind OJ-Pass, a web tool intended to work well from the home screen rather than requiring users to find its URL every time.

## PWA does not automatically mean offline, push, or faster

Another common source of confusion is treating every PWA feature as one package.

You may see PWAs described as websites that:

- work offline
- send push notifications
- load faster
- use device capabilities

Those capabilities do not all appear automatically just because a website has been configured for a home screen experience.

Offline support, for example, requires additional implementation such as a Service Worker and caching strategy.

And if your website does not need offline behavior, there is no reason to add complexity simply to check a PWA feature box.

That is why I also like the idea of starting small. As explained in [What Are the Benefits of PWA? Why “Being on the Home Screen” Is Enough in 2026](https://tips.ojapp.app/en/pwa-benefits-2026-2/), simply creating a useful home screen entry point can already have value.

## So is it an app or a bookmark?

If you want the shortest answer, **you cannot tell just by seeing an icon on the home screen.**

If an ordinary website has simply been saved as a convenient URL entry point, it is reasonable to think of it as something close to a home screen bookmark or shortcut.

A PWA designed with a Web App Manifest, standalone launch behavior, and optionally additional web capabilities is much more intentionally designed to work as an app-like experience.

But there is no need to obsess over drawing a perfect line between “website” and “app.”

From a user's perspective, there is an icon on the home screen. Tapping it immediately opens the page or tool they wanted.

**What makes PWA interesting is not that the web stops being the web. It is that the web can move onto the home screen while remaining the web.**

So instead of only asking whether a home screen website is technically an app or a bookmark, it can be more useful to ask what kind of experience that website has been designed to provide after it reaches the home screen.
