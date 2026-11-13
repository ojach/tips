You are viewing a web page on your iPhone and decide, “I want to open this page quickly later,” so you add it to your Home Screen.</p>

But when you tap the new icon, **a different page opens instead of the page you added.**

You may assume you added it incorrectly and try again from the same page, only to get the same result.

This is not necessarily a Safari bug. If the website is configured as a PWA, its Web App Manifest may define a different launch destination through `start_url`.

Let's first look at this from the user's perspective, then move to the developer side and see why it happens and how the experience can be designed differently.

## A simple example: adding an X profile to the Home Screen

This behavior is easy to understand with the web version of X as an example.

Imagine opening X in Safari and viewing a particular user's profile.

You visit this profile often, so you decide to make it easier to access. While viewing the profile, you open Safari's Share menu and choose “Add to Home Screen.”

From the user's perspective, it is perfectly natural to think, **“I just added this profile to my Home Screen.”**

However, when you launch X from the new Home Screen icon, you may end up at X's configured app entry point, such as the recommended feed, rather than the profile you were viewing.

“Wait, didn't I add that profile?”

For someone unfamiliar with how PWAs work, that reaction would be completely understandable.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>You added “this page” to your Home Screen, but that page doesn't open. From a user's point of view, that's a pretty strange experience.</div>
</div>

## From X's perspective, this behavior can make sense

The important point is that this does not automatically mean X or PWA behavior is broken.

If X is designed as **one application**, launching the X Home Screen icon into a predefined app entry point is a reasonable design.

When you launch the native X app, you would not normally expect it to always reopen a particular profile simply because that was the profile you previously viewed.

So if the entire service is treated as one App, a shared launch destination makes sense.

But the Web creates another expectation.

**The user may not think, “I installed X.” They may think, “I tapped Add to Home Screen while viewing this URL.”**

That creates a gap between the PWA's application model and the user's expectation of saving a web page.

## Can users change the launch page?

If the website's PWA configuration determines the launch destination, users generally cannot rewrite that site's `start_url` themselves.

Adding the same profile page again does not necessarily solve the problem if the website continues to treat it as the same PWA with the same launch behavior.

So if your actual goal is simply to save a specific page for later, you do not necessarily need to add it to the Home Screen.

### If you want to save that exact page, use a bookmark

A Safari bookmark is designed to preserve the URL you saved.

If you want to keep a particular X profile, for example, bookmarking that profile URL gives you a straightforward way to return to it without relying on the PWA's configured launch destination.

Do you want an app-like entry on the Home Screen, or do you simply want to save a specific URL?

The better option depends on what you are trying to keep.

## Why does another page open? One reason is start_url

Now let's look at the developer side.

A PWA can use `start_url` in its Web App Manifest to define the preferred entry point when the installed web app is launched.

For example:

```json
{
  "name": "Example App",
  "start_url": "/",
  "display": "standalone"
}
```

Here, the `start_url` is `/`.

That means a user may add the site while viewing another page, but the installed PWA can still launch from the site's root URL.

The page the user was viewing and the launch page defined by the PWA do not necessarily have to be the same.

## Without that PWA launch configuration, iPhone can preserve the page you added

This is where the behavior becomes especially interesting on iPhone.

When a normal web page is added from Safari and no PWA configuration redirects the launch experience elsewhere, the page URL being added can itself become the Home Screen entry point.

For example:

```text
https://example.com/profile/user-a
```

If that is the page you are viewing when you add it, that URL can be used as the page you return to from the Home Screen.

But when the site is configured as a PWA with something like:

```text
"start_url": "/"
```

the Home Screen launch behavior can instead follow the site's PWA design.

In other words, PWA configuration can create a more app-like launch experience, while also potentially conflicting with the Web-like expectation that **“the page I added is the page I want to reopen.”**

## Is start_url:"/" wrong?

No.

If your goal is to treat the entire website as one application,

```text
"start_url": "/"
```

can be a perfectly reasonable design.

For a service like X, where the whole service can be thought of as one App, opening a common app entry point instead of a particular profile can make sense.

The question is not whether `/` is right or wrong.

**The real question is whether you want users to treat the entire website as one App, or whether you want individual pages to remain separate Home Screen entry points.**

The right design depends on the experience you want to create.

## What if you want the page that was added to open?

If you own the website and want the page a user added to become the page they launch from the Home Screen, you need to design the Manifest accordingly.

One approach is to use a relative `start_url`.

```json
{
  "start_url": ".",
  "display": "standalone"
}
```

`start_url:"."` is resolved relative to the Manifest URL.

When combined with a system that generates or serves an appropriate Manifest for each page, this can be used to make the page the user added become the App's entry point.

However, this does not mean every website should simply replace `"/"` with `"."`.

You also need to consider where the Manifest is served from and what unit should be treated as an App.

## This UX mismatch led me to experiment with 1P1A

This is one of the things that caught my attention while testing PWAs on real devices in PWA LAB.

A common PWA design treats an entire website as one App.

But people using the Web do not always want to save an entire website.

Someone may want to keep an article.

Someone else may want a product page.

It could be a profile, or a particular web tool they want to launch directly.

So I started experimenting with a different question: **what if the page where the user taps “Add to Home Screen” could itself become the App's entry point?**

That led to the idea I call 1P1A — One Page. One App.

While 1S1A — One Site. One App. — treats the whole site as one application, 1P1A looks at Home Screen entry points on a page-by-page basis.

Neither model is universally correct.

A service designed to work as one complete application may fit 1S1A naturally. A website where individual pages have independent value may benefit from page-level entry points.

## Developers should ask what the user thinks they added

When building a PWA, it is easy to focus on technical checks: whether the Manifest works, whether installation is available, or whether the site launches in standalone mode.

But there is another useful Home Screen UX question:

**What does the user think they just added?**

If they believe they added the service itself, a common `start_url` may be exactly what they expect.

If they believe they added the article, profile, product, or tool currently on screen, being sent somewhere else may feel unexpected.

`start_url` is not just another Manifest property. It also helps define where the user returns when they launch your site from the Home Screen.

## Conclusion

If a different page opens after you add a web page to your Home Screen, the site's PWA configuration — particularly its Web App Manifest `start_url` — may be involved.

When the website defines its own launch destination, users generally cannot change that setting themselves.

If your goal is simply to save a particular page, a Safari bookmark may be the more reliable choice.

For developers, the important question is whether the whole website should launch as one App or whether the page the user added should remain its own entry point.

**The page a user adds to the Home Screen and the page a PWA launches are not necessarily the same.**

Understanding that difference makes `start_url` much easier to think about as a UX decision rather than just a Manifest setting.
