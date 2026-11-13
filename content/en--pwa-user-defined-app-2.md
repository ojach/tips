PWAs allow websites and individual web pages to be added to the home screen and used as app-like entry points.</p>

Until now, most discussions around PWA design have focused on one question: **what kind of app should the developer create?** Should the entire site become one app? Or should a specific page become one app?

At OJapp, I have been testing both approaches in practice through two design models: 1S1A (One Site. One App.) and 1P1A (One Page. One App.).

But once I started thinking beyond those two models, I realized the Web has something fundamentally different from native apps.

**The URL.**

## A URL can represent not only a page, but also a state

A URL does more than identify the location of a web page.

With query parameters, the same page can represent different states through different URLs.

For example, a timer might use a URL like this:

```text
/timer/?time=2&mode=up&seconds=on
```

It is still the same timer page, but the URL now contains the state: two minutes, count up, and seconds enabled.

So what happens if that exact URL becomes the PWA launch point saved to the home screen?

And what if the user can choose which state they want to keep there?

**Maybe the final definition of the app does not have to come entirely from the developer. Maybe the user can define it.**

That idea led me to **PWA UDA — User Defined App.**

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>The key idea is not that users build the software. They choose what part of the Web becomes their app.</div>
</div>

## What is PWA UDA (User Defined App)?

PWA UDA is a design philosophy where the developer does not completely fix the final form and usage of the app in advance.

Instead, **the user chooses the web feature, page, or state they need and defines that as their own app.**

“User Defined” does not mean the user writes code and develops an application themselves.

The developer still builds the functionality.

But the user can decide:

- which feature they want to use
- which page should become the entry point
- which state the app should launch into
- what they want to keep on their home screen as their own app

UDA means giving **that final definition** to the user.

## I tested the idea with a timer

I tested this idea with an actual timer.

You can try the timer used in this experiment here:  
[Try the PWA UDA timer](https://ojach.github.io/PWA-1P1A/timer/?time=2&mode=up&seconds=on)

For example, imagine the user selects a two-minute timer, count-up mode, with seconds displayed.

If that state is reflected in the URL, it becomes:

```text
/timer/?time=2&mode=up&seconds=on
```

Normally, this is simply a URL that opens the timer with a specific configuration.

But if the URL including those query parameters becomes the PWA launch URL stored on the home screen, its meaning changes.

Every time the user launches it from the home screen, the timer starts from the state they chose: **two minutes, count up, seconds enabled.**

If the home screen name also reflects that state, it could look something like:

```text
2m↑ Timer
```

Now it behaves like a dedicated app created specifically for that use.

What makes this interesting is that the developer did not build a separate app called “2m↑ Timer.”

The developer built **one configurable timer.**

The user chose the “2m↑ Timer” configuration and kept that specific entry point on their home screen.

**The developer builds functionality that can become an app. The user defines the final form of the app.**

That is the basic idea behind PWA UDA.

## The settings do not even need to be stored on a server

There is another interesting aspect to the timer experiment.

The user's timer settings do not need to be stored in an account or database.

The settings themselves are already encoded in the URL.

```text
?time=2&mode=up&seconds=on
```

That string represents the state selected by the user.

For use cases like this, you may not need to build systems for:

- user registration
- saving preferences in a database
- connecting settings to a user ID
- fetching configuration from an API when the app launches

**The URL is the configuration, and the URL is also the app entry point.**

When the user keeps that URL on the home screen, it becomes something they can use as their own app.

This idea also extends the concept I previously tested with <a href='https://tips.ojapp.app/en/pwa-start-url-dot/'>using `start_url: "."` to reopen the page that was added to the home screen</a>. UDA takes that idea below the page level and applies it to a specific **state**.

## UDA is not “a technology for creating one PWA per query”

This distinction is important.

UDA is **not the name of a technique that creates a separate PWA for every query parameter.**

The timer experiment uses query parameters, but that is only one possible implementation of the idea.

The important part is not the specific technology.

> The user can choose the feature, page, or state they need and define it as their own app.

<p>That means UDA is not limited to timers.

On an e-commerce site, a user might keep a frequently viewed product rather than the entire store.

In a web service, they might choose the function they use every day instead of the service home page.

If a SaaS product contains multiple tools, users could keep only the tools they actually need on their home screens.

And if a web app can represent its state in the URL, the unit the user chooses can become even smaller than a page.

The developer does not need to build a separate app for every possible use case.

**Provide web functionality that can become an app, and let the user choose its final form.**

That is UDA.

## From 1S1A and 1P1A to UDA

OJapp has been using 1S1A and 1P1A as design models for thinking about PWA structure.

With [1S1A (One Site. One App.)](https://tips.ojapp.app/en/pwa-1s1a-vs-1p1a-2/), the entire site is treated as one app.

With [1P1A (One Page. One App.)](https://tips.ojapp.app/en/1p1a/), one page is treated as one app.

Those models ask:

> What should count as one app?

<p>A site?

A page?

UDA changes the question.

> Who gets to define the app?

<p>In 1S1A and 1P1A, the developer still generally decides the application boundary.

With UDA, the final choice of entry point or state can be handed to the user.

**From Developer Defined App to User Defined App.**

UDA does not replace 1S1A or 1P1A. It adds another axis on top of them.

## The Web makes user-defined apps possible

What makes this idea especially interesting is that the Web already has URLs.

You can enter a specific page directly from search.

You can share it as a link.

You can represent state with query parameters.

And with PWA technology, that URL can become a persistent entry point on the home screen.

At OJapp, I have increasingly thought about adding a web page to the home screen not as “installing an app,” but as **placing a URL on the home screen as the next entry point.**

UDA extends that idea further.

Instead of the developer saying, “This is the finished app, and this is how you use it,” the developer provides useful capabilities on the Web.

The user chooses the place or state that matters to them.

Then they decide, “This is the one I want as my app,” and keep it on their home screen.

Combining the freedom of URLs with the home screen entry point provided by PWA makes this type of app design possible.

## Beyond the question of “How far can the Web become an app?”

While testing PWAs, I have repeatedly asked myself: “How far can the Web become an app?”

But once I reached the idea of UDA, even that question started to change.

The Web already has freedoms that native apps do not naturally have. It can be discovered through search, used before installation, and shared through URLs.

PWA allows users to keep that Web experience on the home screen only when they decide it is worth keeping.

UDA goes one step further.

**What should be kept on the home screen?**

**Which state should it launch into?**

**What kind of app should it become for that user?**

The user can decide those things.

Instead of developers only defining and distributing finished apps, developers can provide **Web functionality that can become an app.**

Then the user defines the app they actually need.

That is the design philosophy I arrived at through implementing and testing the timer:

**PWA UDA — User Defined App.**

If you want to understand the idea quickly, the easiest way is probably to try it yourself. [You can try the timer used in this experiment here.](https://ojach.github.io/PWA-1P1A/timer/?time=2&mode=up&seconds=on)
