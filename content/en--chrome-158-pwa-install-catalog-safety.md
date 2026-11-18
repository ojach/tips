Chrome 158 changes what a PWA catalog can do. A website can now offer installation of another web app directly from its own page, provided the target app meets the Web Install requirements. Instead of merely linking to an app's website, a catalog can become an entry point for installation.

That opens up an interesting direction for PWA discovery: collections of useful tools, curated app directories, and articles that recommend a few specific web apps. The install button can sit alongside the description and the link to try the app.

There are practical constraints, though. Developers need to understand the limits of the HTML `<install>` element, the requirements for a target manifest, and how app identity is checked. Users also deserve a simple rule: **try the PWA in your browser first, then install it if you like it.** This article covers both sides using Chrome's published guidance. Hands-on Android testing, including element limits and Data URL manifests, will come later.

## What Chrome 158's Web Install features offer

Web Install provides two ways to initiate a web app installation from a page: the declarative HTML `<install>` element and the JavaScript `navigator.install()` API. Both can target another app, including one hosted on a different origin, when the requirements are met.

For example, a catalog can reference a PWA's published manifest:

```html
<install manifest="https://app.example/manifest.webmanifest"></install>
```

The browser controls the appearance and activation of this element. It presents an installation flow that requires user consent; visiting the catalog does not silently install an app. The element is designed as a browser-trusted control rather than an arbitrary promotional button.

For a JavaScript-driven interface, the alternative looks like this:

```js
await navigator.install({
  manifest: "https://app.example/manifest.webmanifest",
});
```

A real implementation should invoke the API from an appropriate user action and handle cancellation or errors. The two approaches solve similar problems, but the right choice depends on the size and design of the catalog.

## For developers: do not fill a huge catalog with `<install>` elements

Chrome's guidance states that browsers impose anti-spam limits on the number of `<install>` elements on a page. It does not publish a universal numeric cap.

For an article that recommends one, two, or three related PWAs, a few native install controls may be a good fit. A directory containing dozens or hundreds of entries is a different design problem. If every card gets an `<install>` element, the page may run into the browser's element limit.

Chrome recommends considering `navigator.install()` for large app catalogs. You can build a custom card interface and trigger installation from the selected item without relying on a large number of browser-owned HTML install controls.

There is a user-experience tradeoff. When installing another app, the HTML element does not require an extra permission prompt before the installation confirmation. The JavaScript API does require an initial `web-app-installation` permission prompt. The difference matters when designing an interface that people will actually enjoy using.

| Consideration | `<install>` | `navigator.install()` |
| --- | --- | --- |
| Implementation | HTML element | JavaScript API |
| Button appearance | Browser-controlled | Developer-designed |
| Large directories | Anti-spam element limit | Better suited to catalogs |
| Extra permission step for another app | No separate prompt before confirmation | Initial permission prompt |

The temptation to put an install button on every card is understandable. The browser may have other ideas.

### PWA LAB: Testing the `<install>` Element Limit

I tested the placement limit by enabling the experimental feature through Chrome 157's flags and adding 30 `<install>` elements to a single page.

After exceeding 24 elements, Chrome displayed the following warning in the developer console:

```text
Maximum limit of 24 permission elements has been reached.
More permission elements can be added but they will not be clickable
```

However, the actual behavior was a little different.

| Number of elements | Test result |
|---|---|
| 24 | Limit indicated by the console warning |
| 25–29 | Still clickable |
| 30 | Not clickable |

**Although Chrome reported a limit of 24 elements, I could still click elements 25 through 29. Only the 30th element became unclickable.**

This mismatch between the reported limit and the actual behavior is particularly interesting.

These results were observed in Chrome 157 with the experimental flag enabled. Whether the same behavior occurs in the stable release of Chrome 158 remains to be tested.

For developers building PWA directories or app discovery websites, this experiment confirms that the number of `<install>` elements on a single page is a practical limitation worth considering.

## The manifest and start URL must belong to the same origin

For cross-origin installation, the target manifest URL and the app's `start_url` must share the same origin. If the manifest is at `https://app.example/manifest.webmanifest`, its launch URL must also belong to `https://app.example`.

Subdomains are important here. `tips.ojapp.app` and `ojapp.app` share a registrable domain, but they are **different web origins**. A catalog on the former can offer an app from the latter as a cross-origin installation. By contrast, a manifest hosted on one origin with a `start_url` on the other does not meet the target manifest requirements.

Chrome's guide also specifies that a target manifest must be retrievable over HTTPS without credentials or redirects and must be returned with an appropriate JSON MIME content type. For catalog developers, accepting a submitted URL should not mean trusting it blindly. The manifest needs to be available and correctly configured.

## App identity: `id` is not the same as `manifestid`

A stable manifest `id` is important because it identifies the web app independently of its launch URL. This is especially relevant to projects such as OJapp, where app identity and the relationship between pages matter.

The `<install>` element's `manifestid` attribute does not let a catalog assign a new identity to someone else's app. It is used to check the identity derived from the target manifest. If the manifest has no explicit `id`, the browser computes a fallback identity from its `start_url`, and the provided `manifestid` must match that processed value.

In other words, if you want an app to have a stable identity, configure the app's own manifest correctly. A catalog cannot repair an unstable identity simply by supplying a different attribute.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption>
</figure>
<div class="balloon__text balloon__text-right">👻 An app's display name and its identity are different things. A catalog cannot rewrite its ID!</div>
</div>

## Data URL manifests: an open question for OJapp

OJapp FREE dynamically generates manifests, which makes the Web Install requirements particularly interesting. Most examples of installing another PWA assume that the target has a conventional HTTPS manifest URL.

That raises a concrete question: **can a catalog install a PWA whose manifest is generated as a Data URL?** What happens if a Data URL is passed directly to the `manifest` attribute? Can a separate catalog page reference a manifest dynamically associated with the app's own page?

These questions connect directly to OJapp FREE and the One Page One App approach. Chrome's current guidance describes HTTPS accessibility requirements for installing another app. I have not completed device testing of Data URL behavior for this feature, so I am leaving the outcome open rather than inventing one.

## For users: try the PWA in your browser before installing

If a PWA catalog looks interesting, there is no need to start with the install button. **Open the app's website and try it first.**

PWAs are built with web technologies. In many cases, you can experience the service directly in the browser before installing anything. Check whether the interface makes sense, whether an account is required, how quickly it loads, and whether it actually does what the catalog promises.

This is different from downloading an Android APK file and installing it from outside an app store. A PWA installation is a browser-mediated way to register a web app, not the same distribution mechanism as an APK download.

That difference is useful, but it does not make every PWA trustworthy. A web app can still be misleading or malicious. The ability to install something is not a certificate of safety.

### Check who operates the app and what it asks for

A PWA catalog and the services it lists may have completely different operators. A listing is not proof that the catalog owns, audits, or guarantees the app.

Check the destination URL before entering a password or personal information. When the service requests notifications, location, camera, or microphone access, decide whether the permission makes sense for what you are trying to do. Those decisions matter whether the app runs in a browser tab or from the home screen.

Also remember that installing a PWA does not automatically make every feature available offline. Some services still depend on a network connection or an account. Trying the service first helps set realistic expectations.

## A better catalog offers both “Open” and “Install”

For a PWA directory, I would rather see **two clear actions: “Open in browser” and “Install.”** That gives visitors a choice without forcing them into an installation decision before they have seen the product.

Open it, explore it, and add it to the home screen when it earns a place there. This is one of the most appealing aspects of distributing applications through the web.

It is also the direction I would consider for a future catalog such as PWA UP. The catalog should help people discover good apps, while the app's own website gives them a chance to judge the experience. The installation control comes after that, not in place of it.

## What is established, and what still needs testing

Chrome 158's Web Install capabilities make it possible for a website to act as an installation entry point for other PWAs. The published guidance gives developers important rules: use `<install>` thoughtfully, consider `navigator.install()` for large catalogs, provide a valid same-origin manifest/start URL pair, and keep app identity stable.

This article is based on those published requirements and on design considerations for PWA catalogs. It does not claim to have measured the maximum number of install elements or tested cross-origin and Data URL behavior on a new Android device. Those experiments belong in a separate follow-up.

For now, the advice is straightforward: developers should build catalogs around the browser's actual constraints, and users should **try the web app before deciding to install it**.

References: [Chrome for Developers — Installing web applications](https://developer.chrome.com/docs/modern-web-guidance/guides/pwa/install-web-app) / [Chrome 158 release notes](https://lighthouse-ci-staging-dot-cr-status.appspot.com/release-notes/158)

## Update: November 18, 2026 — Test Results

### Chrome 158 Successfully Opens the Install Dialog for an External PWA

In Chrome 158, I confirmed that an `<install>` element can open the installation dialog for a PWA hosted on a different domain.

For this test, I used the public manifest from Microsoft's PWA installation demo:

```html
<install manifest="https://microsoftedge.github.io/Demos/pwa-install-element/manifest.json"></install>
```

I placed this element on a test page hosted at `ojapp.app`.

Chrome displayed the installation dialog, including the target app's name and source domain, allowing me to proceed with the installation process.

**A PWA directory does not need to host the app itself. It can reference a manifest on another website and open the installation dialog.**

This is an important result for developers building PWA discovery and directory websites.

### The `<install>` Element Limit Is Not Simply First Come, First Served

In an earlier test using Chrome 157 with the experimental flag enabled, the developer console reported a limit of 24 permission elements.

However, elements up to number 29 were clickable, while element 30 did not respond.

Further testing in Chrome 158 revealed something even more interesting.

In one test, elements 25 and 26 did not open the installation dialog, but element 32 did.

**This means the browser was not simply enabling the first 24 elements and disabling everything after them.**

| Test | Result |
|---|---|
| Console-reported limit in Chrome 157 | 24 elements |
| Initial Chrome 157 test | Elements through 29 worked; element 30 did not |
| Chrome 158 retest | Elements 25 and 26 failed, while element 32 worked in one test |
| Rule determining which elements remain active | Not yet identified |

The earlier Chrome 157 results may also need to be reconsidered. The number of elements alone does not explain which ones remain interactive.

For now, the observed result is clear: **when many `<install>` elements are placed on a page, their position alone does not reliably predict which ones will work.**

This is an important limitation for PWA directories that place an installation button on every app card.

### Data URL Manifests Did Not Work with `<install>`

OJapp FREE dynamically generates a Web App Manifest using JavaScript and assigns it as a Data URL through `<link rel="manifest">`.

I tested whether the same approach could work with Chrome 158's `<install>` element.

The result was disappointing: **specifying a Data URL directly in the `manifest` attribute did not work.**

A Data URL that works with a regular `<link rel="manifest">` cannot automatically be used with `<install>`.

The manifest requirements considered in this test were:

- The manifest must be accessible through `https://`
- It must be fetched without redirects
- It must be publicly accessible without authentication
- It must be served with a JSON MIME type
- The manifest and its `start_url` must share the same origin

This means OJapp FREE's dynamically generated Data URL manifest could not be used directly for cross-site installation through `<install>` in this test.

**Chrome 158 successfully opened the installation dialog for an external HTTPS manifest, but the Data URL approach did not work.**

For developers building PWA directories, the way an app exposes its manifest is an important part of installation compatibility.