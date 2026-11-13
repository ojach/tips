When you start building a PWA, it is easy to want to make it more and more app-like.</p>

Remove browser UI. Use fullscreen. Build your own navigation. Make every transition feel like a native application.

With enough work, a web experience can get very close to that look.

But after testing many PWA patterns, I started asking a different question.

**Does a PWA actually become better just because it looks more like a native app?**

Sometimes the better design is to keep some of the web.

## PWAs give us many tools for creating an app-like experience

The Web App Manifest includes presentation options that can make a web page feel very different from an ordinary browser tab.

For example:

```text
"display": "standalone"
```

can reduce normal browser chrome and create a more independent application window.

You can go further with:

```text
"display": "fullscreen"
```

where supported.

A PWA can also have its own home screen icon and application name.

Visually, that can make the experience feel much closer to an installed application.

## App-like presentation should not become the goal by itself

It is tempting to treat every piece of visible browser UI as something that needs to be removed.

No URL bar.

No browser buttons.

Fullscreen presentation.

Custom navigation for everything.

That certainly looks more app-like.

But if achieving that look also removes useful properties of the web, the result is not automatically better.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>Being on the web is not something a PWA has to hide 👻 Some of the best parts come from keeping it.</div>
</div>

## URLs are one of the web's biggest strengths

Compared with native application models, the web has one extremely powerful primitive.

**The URL.**

A page can be shared directly.

A search result can open the exact destination.

A link can jump into the middle of a service.

Products, articles, profiles, tools, and even application states can all be represented by URLs.

While exploring 1P1A and User Defined Apps, I have increasingly seen this as one of the web's biggest advantages.

I explored the broader idea in [What If We Have the PWA Question Backwards? The Future of Web vs. Apps](https://tips.ojapp.app/en/pwa-future-web-vs-app-2/).

## Removing too much of the web can weaken that advantage

Imagine turning a web tool into a completely closed app-like interface.

External navigation disappears, URLs become invisible, and normal links are reduced as much as possible.

The result may look more native, but it can also become harder to:

- move to related pages
- share a destination
- discover other tools
- move naturally between search and the product

A PWA is still built on the web.

The ability to remain connected through links is not something we need to remove just to make the interface look more like an app.

## standalone is often a useful middle ground

For ordinary PWAs, I often start with `display: standalone`.

It can make the experience feel much more independent without requiring the application to imitate every part of native app design.

In PWA LAB, I compared standalone and fullscreen behavior on Android and iPhone.

In my Android tests, fullscreen removed more visible interface and gave the content more screen space.

On iPhone, I also encountered cases where the visible difference between standalone and fullscreen was much smaller.

I documented those observations in [PWA standalone vs fullscreen: What's the Difference and Which Should You Use?](https://tips.ojapp.app/en/pwa-standalone-vs-fullscreen-2/).

## Some PWAs genuinely benefit from fullscreen

That does not mean fullscreen is a bad choice.

It makes sense when using the entire screen is itself part of the experience.

Examples include:

- games
- image editors
- digital signage
- kiosk interfaces
- presentation tools
- specialized interfaces that need maximum space

In those cases, removing browser UI can directly improve usability.

The important distinction is this: use fullscreen because the product benefits from fullscreen, not simply because fullscreen looks more like an app.

## An article does not necessarily need a native-style interface

Now consider a blog article.

Does opening it from the home screen mean it suddenly needs custom bottom navigation, unusual back controls, or a completely different reading interface?

Probably not.

The article can still behave like an article.

Links can still work normally.

The content can still be shareable.

The difference may simply be that the user can open it again from the home screen in one tap.

That alone can be valuable.

## You can make small changes only for the home screen experience

There is also a middle option between identical web UI and a completely separate app interface.

You can adapt only the parts that make sense when the page is running as a standalone PWA.

For example:

- hide Add to Home Screen instructions
- reduce introductory content meant mainly for first-time visitors
- move frequently used actions higher
- show a message intended for returning home screen users

JavaScript can detect the standalone context:

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;
```

This lets the same URL remain part of the normal web while receiving small UX adjustments when launched from the home screen.

For an implementation example, see [How to Show Content Only When a PWA Is Opened from the Home Screen](https://tips.ojapp.app/en/pwa-home-screen-only-content-2/).

## You do not need completely separate Web and PWA versions

It is easy to imagine the browser version and the installed PWA version as two separate products.

But one of the useful properties of PWA is that they can remain the same web application.

```text
Open from search
->
Normal web experience

Open from home screen
->
Same URL
->
Small PWA-specific adjustments where useful
```

You do not necessarily need to maintain two complete applications.

That is part of what keeps PWA architecture lightweight.

## A web page can live on the home screen without pretending not to be web

If a PWA is understood only as a cheaper version of a native app, development can become a race to imitate native UI.

But there is another way to think about it.

A web page can remain a web page.

It can still be searchable.

It can still have links.

It can still be shared through a URL.

And it can also live on the home screen.

That is not necessarily an imitation of a native application. It can simply be a new entrance to the web.

## Keeping the web matters even more in a 1P1A design

In [1P1A (One Page. One App.)](https://tips.ojapp.app/en/1p1a/), individual pages can become separate home screen entries.

A website might contain:

```text
Website
├─ Timer
├─ Image compressor
├─ Product A
└─ Profile
```

Each page can have its own icon and launch identity.

But underneath, they are still connected pages on the same web.

The timer can link to another tool. The profile can link elsewhere. Search can still bring users directly to each destination.

The page can feel app-like from the home screen without giving up the web structure behind it.

## App-like and web-like are not opposite choices

This does not have to be a binary decision.

<table>
<thead>
<tr><th>Approach</th><th>Typical behavior</th></tr>
</thead>
<tbody>
<tr><td>Normal web</td><td>Standard browser UI and normal URL navigation</td></tr>
<tr><td>Lightweight PWA</td><td>Home screen entry with standalone presentation</td></tr>
<tr><td>App-oriented PWA</td><td>Dedicated navigation and more PWA-specific UI</td></tr>
<tr><td>Immersive PWA</td><td>Fullscreen or specialized full-screen interface</td></tr>
</tbody>
</table>

Different products belong at different points on that spectrum.

A blog and a game do not need the same PWA design.

## The real question is whether the change improves usability

I think this is the most useful test.

Do not ask only whether the PWA looks more like an app.

**Ask whether the change makes the product easier to use.**

Hide browser UI when that helps.

Use fullscreen when the feature needs the space.

Keep links when links are useful.

Do not replace familiar navigation just for visual similarity.

Change only a few elements for home screen users when that is enough.

## A PWA does not have to turn the web into something else

PWAs are often described as a way to turn websites into apps.

That is a useful explanation, but it can also make the design goal sound like 'remove everything that feels like the web.'

That is not necessary.

The page can remain searchable.

It can remain shareable.

It can remain connected through links.

Then the home screen adds another way to return to it.

**A PWA can add app-like behavior without giving up the things the web already does well.**

For me, that flexibility is one of the most interesting parts of PWA design.
