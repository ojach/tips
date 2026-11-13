When you add a web page to the iPhone home screen, the saved icon may open a different URL from the one you were viewing.

I ran into this problem while building Petal.

What I wanted was simple: open an individual page like `/petal/{token}` and add that exact page to the home screen.

But in reality, when I opened it from the home screen, it jumped to another URL like `/petal/@username`.

At first, I thought it was Safari cache or some mysterious iOS behavior.

But the conclusion was much simpler.

<strong>The cause was that I had written a fixed URL in `start_url` inside manifest.json.</strong>

It was completely my mistake. The confusing part was that this mistake did not appear clearly from the beginning.

## What happened

What I wanted to do was very simple.

- Open a different Petal card page for each user
- Add that page to the iPhone home screen
- Open that person’s page directly from the next time

In other words, I wanted to keep the exact URL that was currently open on the home screen.

But when I launched the added icon, it did not open the page I was viewing. It opened the fixed URL written in the manifest.

I thought I had saved an individual page, but it kept sending me back to the same page every time.

For a service based on digital cards or personal pages, this is a pretty serious problem.

## The problematic manifest.json

At that time, the manifest looked roughly like this:

```json
{
 "name": "Petal",
 "short_name": "Petal",
 "display": "standalone",
 "start_url": "/petal/@ojapp",
 "icons": [
 {
 "src": "/icon.png",
 "sizes": "192x192",
 "type": "image/png",
 "purpose": "maskable"
 }
 ]
}
```

At first glance, this looks like a normal PWA configuration.

But for this use case, `start_url` was completely getting in the way.

`start_url` defines which URL should open when the app is launched from the home screen.

So if you write a fixed URL there, that fixed URL may be prioritized at launch, no matter which page the user was viewing when they added it to the home screen.

In this case, even if the user thought they added `/petal/{token}`, the app opened `/petal/@ojapp`.

## The real cause was not maskable, but the fixed start_url

At first, I thought `purpose: "maskable"` was the cause.

That is because after adding `purpose: "maskable"`, the behavior suddenly felt more PWA-like, and it looked as if `start_url` had started to work more strongly.

But after organizing the situation, the core problem was not there.

The real problem was this: <strong>I was building a service where individual URLs should be saved, but I had written a fixed `start_url` in the manifest.</strong>

Using only `maskable` can make behavior feel unstable depending on the environment.

But the direct reason the URL was overwritten was that `start_url` contained a fixed URL.

So the lesson is clear.

<strong>If users should add different pages or user-specific pages to the home screen, do not put a fixed URL in `start_url`.</strong>

## Why this is easy to miss on iOS

iOS PWA behavior is not as straightforward as Android Chrome.

On Android, manifest settings are usually reflected in a relatively clear way.

On iPhone Safari, however, not every manifest setting behaves exactly as expected. Some settings work, and some are weaker or harder to notice.

Because of that, during development, it is easy to assume that “this setting is ignored on iOS.”

In my case, even though I had written a fixed `start_url`, it did not look like a big problem at first.

But after touching the manifest and icon settings, the page suddenly started to behave more strongly like a PWA, and the `start_url` mistake surfaced.

That is one of the scary parts of iOS PWA development.

A setting that did not look like a problem yesterday can suddenly become a visible issue after you change another manifest item.

## Fix 1: do not fix start_url when saving individual pages

If you want users to add individual pages to the home screen, the first thing to check is `start_url`.

If your PWA should always open the top page, this kind of setting is fine:

```json
{
 "start_url": "/"
}
```

But if you are building something like Petal, where each user page should become a home screen entry, a fixed URL is dangerous.

In that case, using `"."` is more natural:

```json
{
 "start_url": "."
}
```

`"."` uses the current location as the base.

For services where each page should be added to the home screen, this often matches the intended experience better.

In PWA LAB, I also found that `start_url: "."` is often easier to handle when working with multiple pages or generated pages.

## Fix 2: use any maskable instead of maskable alone

If you want Android home screen icons to look clean, maskable icons are useful.

However, I personally do not recommend using only `purpose: "maskable"`.

In my testing, using `any maskable` felt more stable:

```json
{
 "src": "/icon.png",
 "sizes": "512x512",
 "type": "image/png",
 "purpose": "any maskable"
}
```

With `any maskable`, the icon can be treated as both a regular icon and a maskable icon.

Especially when testing across iPhone, Android, and desktop Chrome, this felt less risky than using `maskable` alone.

Of course, the ideal setup is to prepare separate icons for normal use and maskable use.

But for small PWAs or personal projects, starting with `any maskable` is a realistic way to improve stability.

## Fix 3: be careful with apple-touch-icon priority

On iPhone, `apple-touch-icon` can have stronger priority than manifest icons.

For example, your HTML may include this:

```html
<link rel="apple-touch-icon" href="/icon.png">
```

For a single fixed PWA, this is usually not a problem.

In fact, it can be useful for making the iPhone home screen icon more stable.

But if you are building something like Petal or OJapp, where each page or each user should have a different icon, you need to be careful.

If a fixed `apple-touch-icon` exists, iPhone may prioritize it even when the manifest points to a different icon.

That means not only the URL, but also the icon may become different from what you expected.

If you want to change the home screen icon per user or per page, you should review whether a fixed `apple-touch-icon` should be included at all.

## A safer manifest example for page-based home screen entries

For this kind of use case, a manifest like this is safer:

```json
{
 "name": "Petal",
 "short_name": "Petal",
 "display": "standalone",
 "start_url": ".",
 "background_color": "#ffffff",
 "theme_color": "#ffffff",
 "icons": [
 {
 "src": "/icon.png",
 "sizes": "512x512",
 "type": "image/png",
 "purpose": "any maskable"
 }
 ]
}
```

There are two main points:

- Do not use a fixed URL for `start_url`
- Use `any maskable` for `purpose`

These alone can help avoid the problem where a different URL is saved or opened from the one the user was viewing.

## Top-fixed PWAs and page-saving PWAs are different designs

This distinction is very important.

There are two broad ways to think about PWAs:

- **Top-fixed type:** always open the top page or main app from the home screen
- **Page-saving type:** keep the individual page the user is currently viewing on the home screen

For a normal PWA app, the top-fixed type is fine.

Task management apps, e-commerce sites, and blog apps often work this way.

In that case, `start_url: "/"` or `start_url: "/app/"` is natural.

But Petal card pages and OJapp-generated home screen URLs are page-saving style experiences.

For those, a fixed `start_url` can get in the way.

The user wants to keep the page they are viewing, but launch sends them somewhere else.

So this is not just about whether your PWA code is technically correct.

You need to design based on **what the service wants to leave on the user’s home screen**.

## What I learned from this mistake

The mistake itself was simple.

I had written a fixed `start_url`.

That was all.

But because it did not immediately appear as a problem, separating the cause became confusing.

In my case, I had already written the wrong URL in `start_url`, but at first it did not seem to trigger strongly enough to become a major issue.

Then, after adding `purpose: "maskable"`, the PWA-like behavior became stronger, and the hidden `start_url` mistake surfaced.

It was a classic “why is this happening?” moment.

But this kind of thing happens quite often with PWAs.

Manifest settings, Service Workers, Safari cache, `apple-touch-icon`, and old home screen install data can all remain in different places.

Even if you fix one thing, another old setting may still be left somewhere else.

So when iOS PWA behavior suddenly changes, the manifest is the first place I would check.

## Summary: if the URL changes by itself, check start_url first

If the URL changes when you add a page to the iPhone home screen, the first thing to check is `start_url` in manifest.json.

- Is a fixed `start_url` written?
- Are you using a top URL even though the product is page-saving style?
- Are you using only `purpose: "maskable"`?
- Is a fixed `apple-touch-icon` taking priority?
- Are old manifests or cache still remaining?

If you want users to add each page to the home screen, `start_url: "."` is a very effective option.

For icons, using `purpose: "any maskable"` tends to be more stable, including on Android.

PWAs are useful, but one line in the manifest can completely change the experience.

On iOS especially, it can be hard to tell whether a setting is active or ignored.

If you want the currently opened URL to stay on the home screen as-is, be very careful with a fixed `start_url`.
