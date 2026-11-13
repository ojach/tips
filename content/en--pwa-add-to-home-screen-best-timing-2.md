Once you build a PWA, you probably want users to add it to their home screen.</p>

That creates another question: when should you actually ask them?

You could show a large message immediately, place a suggestion halfway through the page, or wait until the user finishes using a web tool.

Technically, you can show the message almost anywhere. From a UX perspective, however, I think **the moment when users think “I want to use this again” matters more than the moment when you tell them “this can be installed.”**

This article looks at Add to Home Screen prompts from that perspective.

## The first few seconds of a first visit may be too early

Imagine opening a website for the first time and immediately being asked to add it to your home screen.

You have not read the article yet.

If it is a tool, you have not even tried it.

At that point, you do not yet know why this page deserves a permanent place on your phone.

It is similar to websites immediately asking you to:

- create an account
- enable notifications
- join a mailing list
- install an app

The request may benefit the website, but the benefit to the user has not been established yet.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>Asking “put me on your home screen!” immediately can be a little early 👻 Let users discover why the page is useful first.</div>
</div>

## Add to Home Screen makes sense after “I want to use this again”

Why would someone keep a web page on their home screen?

There can be many reasons, but one simple answer covers a lot of them:

**They expect to come back.**

A page used once may not need a permanent icon.

But the situation changes when someone thinks:

- This tool is useful. I'll need it again.
- I want to check this information regularly.
- I want quick access to this product.
- I don't want to search for this booking page again.

That is why an Add to Home Screen suggestion often makes more sense **after the user has experienced the value of the page.**

## For an article, the end is a natural place

For blog content, the end of the article is one obvious option.

If someone reached the end, they were at least interested enough to keep reading.

A small suggestion such as:

> If you want to return to this site later, you can keep it on your home screen for quick access.

does not interrupt the reading experience.

This can work particularly well for reference material, tutorials, checklists, and other content people may need more than once.

## For web tools, ask after the tool successfully did its job

Web tools have an even clearer moment.

**Wait until the user successfully completes the task.**

For example, with an image compression tool:

```text
Select an image
↓
Compress it
↓
Save the result
↓
“Add this tool to your home screen for quicker access next time.”
```

At that point, the user already understands what the tool does because they just used it.

The home screen benefit is also easy to explain: next time, they can open the tool directly instead of searching for it again.

## Explain the benefit, not just the installation

Developers naturally think of PWA installation as a feature.

Users may simply wonder why they should care.

Compare:

> You can install this web app.

with:

> Add this to your home screen and you can open it in one tap next time.

The second version explains the result.

For a booking page, it could be:

> Keep this on your home screen to open the booking page directly next time.

For a web tool:

> Use this often? Keep it on your home screen for quick access.

**You do not have to sell the PWA technology. Explain what becomes easier after the page reaches the home screen.**

## The second visit can be an excellent time to ask

Another option is to show nothing during the first visit and wait until the user returns.

There is a simple reason this makes sense.

If someone visited the page, left, and later came back, they have already demonstrated a reason to revisit it.

For lightweight UI logic, `localStorage` can be used to remember that the browser has visited before.

```js
const visited = localStorage.getItem('visited');

if (visited) {
  // Show an Add to Home Screen suggestion
} else {
  localStorage.setItem('visited', '1');
}
```

The second visit can then show a message such as:

> Welcome back. If you use this page often, you can open it directly from your home screen.

This should not be treated as reliable user identification. `localStorage` is browser-side storage and can be cleared or differ between environments.

But it can be useful for lightweight interface decisions.

## Do not ask someone who is already using the PWA

There is another simple improvement worth making.

If the user already opened the page from its home screen PWA, showing:

> Add this to your home screen.

would make little sense.

You can detect standalone mode:

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (!isPWA) {
  // Show the Add to Home Screen suggestion
}
```

This lets the normal browser experience show the suggestion while keeping it out of the standalone interface.

For more examples of this kind of UI switching, see [How to Show Content Only When a PWA Is Opened from the Home Screen](https://tips.ojapp.app/en/pwa-home-screen-only-content/).

## You do not need to show the suggestion on every visit

Timing is not the only consideration. Frequency matters too.

A home screen prompt that returns every time someone opens a page quickly becomes annoying.

If the user dismisses it, you can wait before showing it again or only display it after another meaningful action.

For example, you could store the dismissal time in `localStorage` and avoid showing the message again for a while.

A PWA does not need to aggressively push users toward installation.

Sometimes **“this is available if you want it”** is enough.

## Remember that installation behavior differs by platform

Add to Home Screen behavior is not identical across operating systems and browsers.

A custom Install button cannot necessarily open the same installation experience everywhere.

On iPhone, for example, adding a web page from Safari involves the browser's own home screen flow.

So an installation UI may need to account for different environments:

- trigger an available install flow where supported
- show appropriate instructions where a direct prompt is not available
- hide the suggestion when the page is already running standalone

## The best moment depends on what the page does

<table>
<thead>
<tr><th>Page type</th><th>Possible timing</th></tr>
</thead>
<tbody>
<tr><td>Blog article</td><td>After the user reaches the end</td></tr>
<tr><td>Web tool</td><td>After a successful task</td></tr>
<tr><td>Product page</td><td>When repeat checking becomes useful</td></tr>
<tr><td>Booking page</td><td>After booking or when suggesting the next visit</td></tr>
<tr><td>Dashboard</td><td>After login once continued use is clear</td></tr>
<tr><td>Reference page</td><td>On a repeat visit or after meaningful engagement</td></tr>
</tbody>
</table>

The common idea is simple: **let users understand the page's value first.**

## Instead of “please add this,” say “this will be easier next time”

When building a PWA, it is easy to start optimizing for the number of home screen additions.

But the home screen belongs to the user.

If you want a place there, the page needs to earn a reason to stay.

So rather than:

```text
Open the page
↓
Immediately request installation
```

I prefer:

```text
Use the page
↓
Understand its value
↓
Want to use it again
↓
Discover that the home screen is an option
```

A PWA really becomes useful after someone returns through that home screen entry.

There is no need to rush the step that creates it.

**Instead of saying “please add this to your home screen,” try communicating “if you'll use this again, here's an easier way back.”**

That feels much closer to the way the web should work.
