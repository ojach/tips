Once you can detect whether a PWA is running from the home screen, the next interesting step is to **change what users see in that mode.**</p>

The normal browser version can remain an ordinary website, while a standalone launch can show a dedicated menu, a welcome-back message, a special offer, or another home-screen-specific element.

The implementation is surprisingly small. You can simply reuse the `display-mode: standalone` detection and connect it to your UI.

I originally used this kind of detection mainly to check whether my PWA tests were actually running in the expected mode. Once that worked, the next thought was obvious: if the page knows how it was opened, why not make the experience different?

## First, detect standalone mode

The basic check looks like this:

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;
```

The first condition checks whether the current display mode is `standalone`. The second provides an iOS-oriented fallback using `navigator.standalone`.

If you want to inspect several PWA states while testing, see [How to Check PWA Status: Mode, Service Worker, Push, and Installable Explained](https://tips.ojapp.app/en/how-to-check-pwa-status/).

Once `isPWA` is true, you can run whatever home-screen-specific behavior you need.

## Show an element only in the PWA

For example, start with a hidden message:

```html
<div id='pwa-message' hidden>
  Thanks for opening us from your home screen!
</div>
```

Then reveal it only in standalone mode:

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  document.getElementById('pwa-message').hidden = false;
}
```

Open the website normally in Safari or Chrome and the message stays hidden.

Launch the PWA in standalone mode and the message appears.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>Here’s the useful part 👻 You do not need a separate “PWA page.” The same page can simply reveal different elements when it runs in standalone mode.</div>
</div>

## Hide an Add to Home Screen message after the PWA is launched

The same idea works in reverse.

Suppose your browser version includes:

```html
<div id='install-guide'>
  Add this page to your home screen for quick access.
</div>
```

Once the page is already running as a PWA, that message is no longer useful.

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  document.getElementById('install-guide').hidden = true;
}
```

This produces a more natural interface.

Browser visitors can see the home screen suggestion, while users who are already launching the PWA do not keep seeing an instruction they have already followed.

## You can also show home-screen-only offers or coupons

The same condition can be used for a special message or offer.

```html
<div id='home-offer' hidden>
  Home screen offer: check today's special coupon.
</div>
```

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  document.getElementById('home-offer').hidden = false;
}
```

Possible uses include:

- home-screen-user coupons
- welcome-back messages
- new feature announcements
- quick links to bookings
- special navigation for the installed experience
- information intended for returning users

I think this becomes especially interesting when the home screen is treated as a return path rather than merely another place to display an app icon.

That is the same basic idea behind [Home Screen Marketing: A New Web Strategy for Delivering Pages with PWA](https://tips.ojapp.app/en/home-screen-marketing-2/).

## This is different from sending a push notification

There is an important difference between this approach and push messaging.

With push, the service sends something toward the user.

Here, the flow is reversed:

1. The user keeps the page on the home screen.
2. They decide when they want to return.
3. They launch the PWA themselves.
4. The page detects that context.
5. The page gives them something useful at that moment.

Nothing needs to interrupt the user before they decide to come back.

OJapp PRO uses this same general idea with its Home Screen Offer. Rather than showing the same popup to every browser visitor, the offer is designed to appear when the PWA is launched from the home screen.

It is less like “sending a message” and more like **responding when the user returns.**

## Use a body class when many elements need to change

If several parts of the interface need different behavior, adding a class to `body` can be cleaner than changing every element individually.

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  document.body.classList.add('pwa-mode');
}
```

Then use CSS:

```css
.pwa-only {
  display: none;
}

.pwa-mode .pwa-only {
  display: block;
}

.pwa-mode .web-only {
  display: none;
}
```

Your HTML can stay simple:

```html
<div class='web-only'>
  Browser-only content
</div>

<div class='pwa-only'>
  PWA-only content
</div>
```

This approach becomes easier to manage when the differences between the browser and standalone interfaces start growing.

## Do not use this to protect secret information

This limitation matters.

Changing the interface based on `display-mode` is a UX technique.

**It is not an authentication or security mechanism.**

If you place a sensitive coupon code or private information directly in the HTML and only hide it with CSS or JavaScript, someone may still be able to inspect the page source or client-side code.

Do not rely on this technique to protect:

- private account data
- sensitive customer information
- content that requires authorization
- secrets that must never be exposed to ordinary visitors

Those cases require real access control, such as authentication and server-side authorization.

The PWA check should be understood as a way to answer **“how is this page being presented right now?”**, not “is this user authorized to see a secret?”

## The same page can provide two slightly different experiences

A PWA does not need to become an entirely separate product from the website.

The same URL can provide a normal web experience when reached from search or a link, and a slightly different experience when launched in standalone mode.

That distinction can be useful because the user context is different.

Someone arriving from search may be visiting for the first time. Someone who intentionally kept the page on their home screen and later opened its icon has already created a direct path back to it.

As discussed in [What Are the Benefits of PWA? Why Being on the Home Screen Is Enough in 2026](https://tips.ojapp.app/en/pwa-benefits-2026-2/), that direct home screen entry can itself be valuable even without adding every advanced PWA feature.

The core implementation remains tiny:

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  // Run behavior intended for the standalone experience
}
```

From those few lines, you can build home-screen-only navigation, messages, offers, welcome-back experiences, or other small interface changes.

**You do not need separate web and PWA pages. You can keep the same page and change only what makes sense for the way it was opened.**

That is where standalone detection starts becoming more than a debugging trick and turns into a useful PWA UX tool.
