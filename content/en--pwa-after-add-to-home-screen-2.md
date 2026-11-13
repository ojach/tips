When building a PWA, it is easy to treat “successfully added to the home screen” as the finish line.</p>

You configure the Manifest, prepare the icon, add the site to the home screen, and confirm that it launches in standalone mode. At that point, it feels like the PWA is complete.

I spent a lot of time doing exactly that in PWA LAB: testing whether an app could be added, how it launched, and how different Manifest settings changed the result.

But after experimenting with what happens next, my view started to change. **A PWA may not really begin when it is added to the home screen. It begins when the user comes back through that icon.**

You can detect that standalone launch, change the experience for returning home screen users, and measure whether the home screen is actually functioning as a return path.

So instead of explaining how to build a PWA, this article focuses on a different question: **what should happen after the PWA reaches the home screen?**

## Being added does not mean the PWA is being used

A home screen icon is a very visible result.

Your website now has its own icon sitting next to regular apps.

That matters, but what if the user never taps it again?

The PWA may have reached the home screen, but it has not really become a useful return path.

On the other hand, even a relatively small number of additions can be valuable if those users repeatedly launch the PWA later.

**Instead of looking only at whether the PWA was added, look at whether users actually come back.**

## The home screen becomes another entry point to the web

People normally return to websites through several routes:

- Google Search
- social media
- bookmarks
- email
- links from other websites

A PWA adds another possibility: **the phone's home screen.**

A frequently used web tool no longer needs to be searched for every time.

A user can return directly to a product instead of navigating through the store again.

A booking page can have its own persistent entry point.

One tap can take the user directly back to the page they wanted.

I describe this broader idea in [Home Screen Marketing: A New Web Strategy for Delivering Pages with PWA](https://tips.ojapp.app/en/home-screen-marketing-2/).

## After the PWA is added, you can detect standalone usage

This is where things become more interesting.

JavaScript can check whether the current page is running in a standalone PWA context.

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;
```

This lets you distinguish a normal browser experience from a home-screen-style standalone experience.

```text
Normal browser visit
↓
Normal web experience

Standalone PWA launch
↓
Home-screen-oriented experience
```

The URL does not need to become a completely different product. The same web page can respond differently depending on how it is being used.

For the detection itself, see [How to Detect If a PWA Was Opened from the Home Screen with display-mode: standalone](https://tips.ojapp.app/en/pwa-detect-standalone-launch/).

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>Getting onto the home screen isn't the end 👻 Once you can detect the return launch, you can start designing what happens after the user comes back.</div>
</div>

## Give home screen users a slightly different experience

Once you know the page is running as a standalone PWA, you can change parts of the interface.

For example:

- hide an Add to Home Screen message
- show home-screen-specific navigation
- display a welcome-back message
- announce a new feature
- show a shortcut to booking or purchasing
- display an offer for home screen users

You do not need to build a separate PWA-only page.

The same page can simply reveal an element when the standalone condition is true.

```js
if (isPWA) {
  document.getElementById('home-message').hidden = false;
}
```

A first-time visitor arriving from search and a user who deliberately kept the page on their home screen are in different situations.

There is no rule saying they must always see exactly the same interface.

For implementation examples, see [How to Show Content Only When a PWA Is Opened from the Home Screen](https://tips.ojapp.app/en/pwa-home-screen-only-content/).

## You can respond when users return without pushing a notification

PWA discussions often move quickly toward push notifications.

Push can be useful, but home screen return behavior enables a different model.

You do not have to call the user back.

The user decides when they need the page and taps its icon themselves.

At that moment, the PWA can show whatever information is useful now.

```text
Add to home screen
↓
User launches it when needed
↓
Detect standalone mode
↓
Show an update, offer, or useful action
```

That is very different from interrupting someone with a notification.

It is closer to **responding when the user returns.**

OJapp PRO's Home Screen Offer follows this idea. Instead of showing the same popup to every browser visitor, an offer can be tied to the home screen PWA experience.

## Then measure whether users actually return

The same detection can also be connected to analytics.

```text
if (isPWA && typeof gtag === 'function') {
  gtag('event', 'pwa_home_launch', {
    page_path: location.pathname,
    page_title: document.title
  });
}
```

This creates a signal separate from a normal page view.

You can start asking:

- How often is the PWA used from the home screen?
- Which pages are being revisited?
- Did users add the page and then never return?
- Is the home screen actually functioning as an entry point?

This changed the way I think about PWA testing.

It still matters whether the Manifest works, the icon looks right, and standalone mode launches correctly.

But after deployment, the more interesting question is often: **is anyone actually tapping that icon?**

## An install-like number does not have to be the final goal

Native apps naturally make us think about downloads and installations.

It is tempting to apply the same mindset to PWAs and focus mainly on how many users added the site to their home screen.

But a PWA is still part of the web.

We can combine ordinary web metrics with home-screen-specific signals.

<table>
<thead>
<tr><th>Metric</th><th>What it tells you</th></tr>
</thead>
<tbody>
<tr><td>Page views</td><td>How often the page was viewed</td></tr>
<tr><td>Search traffic</td><td>Whether new users are discovering it</td></tr>
<tr><td>Home screen addition</td><td>Whether a persistent return entry was created</td></tr>
<tr><td>Home screen launch</td><td>Whether that entry is actually being used</td></tr>
</tbody>
</table>

The last one is especially interesting to me.

A page added by 100 people but launched once afterward may be less successful on the home screen than a small web tool kept by ten people who use it every day.

## A PWA still needs a reason to be revisited

This eventually becomes a UX question rather than a Manifest question.

No configuration can make someone repeatedly open a page they no longer need.

Pages that naturally fit repeated use might include:

- web tools
- frequently checked products
- booking pages
- member pages
- dashboards
- profile or link pages
- information that changes regularly

A page that is useful only once may be technically PWA-capable but still have little reason to stay on the home screen.

**A page that can become a PWA and a page that deserves a permanent place on the home screen are not necessarily the same thing.**

## Move from “adding a PWA” to designing a return path

Getting a PWA onto the home screen is satisfying, especially the first time everything works.

But there is another layer after that:

```text
Make it addable
↓
Launch it from the home screen
↓
Detect that launch context
↓
Adapt the home screen experience
↓
Measure return usage
↓
Improve the reason to come back
```

At that point, PWA starts becoming more than a technique for making a website look like an app.

Search can create the first visit. The user can keep a useful page on the home screen. The next time, they can return directly without searching again.

The web gains another entry point outside the browser itself.

**A PWA is not finished when it reaches the home screen.**

**The next tap on that icon is where the real home screen experience begins.**
