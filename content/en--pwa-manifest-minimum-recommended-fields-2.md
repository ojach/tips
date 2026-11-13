Over the last five articles, I have revisited several long-standing assumptions about PWAs using current behavior and real-device testing.</p>

A Service Worker is no longer required simply for installation.

A Web App Manifest alone can already define an installable home screen experience with a name, icon, start URL, and standalone presentation in supported environments.

`scope` defines the application's navigation boundary, while `id` helps identify the application itself.

Optional metadata such as `screenshots` can even improve how the PWA is presented before installation.

That leaves one practical question.

**How much should we actually put in manifest.json?**

You can find enormous Manifest examples containing many different members, but a PWA does not need to start that way.

To finish this series, let's separate the Manifest into core information, architecture-dependent fields, and optional features that only make sense for certain applications.

## You do not need an everything-included Manifest

The Web App Manifest supports many members.

```text
name
short_name
icons
start_url
display
id
scope
theme_color
background_color
description
screenshots
shortcuts
```

Seeing them together can make it look as if every PWA should define all of them.

That is not the most useful way to think about the Manifest.

A better model is to add information as the application actually needs it.

## Start with the basic application information

A small Manifest might begin like this:

```json
{
  "name": "My App",
  "short_name": "My App",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

Name.

Icon.

Launch URL.

Display mode.

Starting with these concepts makes the structure much easier to understand.

I use the same lightweight philosophy in [The Fastest Way to Build a Minimal PWA](https://tips.ojapp.app/en/minimal-pwa-quick-start-2/).

## name and short_name define the app name

`name` provides the full application name.

```text
"name": "OJapp PWA LAB"
```

`short_name` provides a shorter alternative for constrained display areas.

```text
"short_name": "PWA LAB"
```

Providing both gives the user agent useful options depending on available space.

It does not guarantee that every operating system will render the exact short_name string under the home screen icon. Final presentation remains platform-dependent.

## icons create the most visible part of the home screen entry

The `icons` member provides images for the installed application.

```text
"icons": [
  {
    "src": "/icon-512.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any"
  }
]
```

For Android, you can also provide a separate maskable asset:

```json
{
  "src": "/icon-maskable-512.png",
  "sizes": "512x512",
  "type": "image/png",
  "purpose": "maskable"
}
```

In my PWA LAB testing, separate normal and maskable assets have been easier to control across devices than trying to make one image serve both purposes with `any maskable`.

Once installed, that icon becomes part of the user's return path to the web application.

## start_url defines where the application begins

For a site-wide PWA, you might use:

```text
"start_url": "/"
```

For a specific tool:

```text
"start_url": "/timer/"
```

In my 1P1A architecture, I often use:

```text
"start_url": "."
```

The dot is not a special command meaning the currently visible document. It is a relative URL resolved against the Manifest URL, so it needs an appropriate Manifest architecture such as dynamic page-level generation.

For a deeper look at this choice, see [What Should You Use for PWA start_url?](https://tips.ojapp.app/en/pwa-start-url-top-current-page-dedicated-url-2/).

## standalone is a practical default display mode

For an app-like presentation, a common starting point is:

```text
"display": "standalone"
```

Supporting environments can then launch the installed PWA with presentation that is separate from a normal browser tab.

`fullscreen` is also available, but it is most useful when occupying the entire display serves a real purpose, such as a game or screen-focused tool.

The exact result of a display mode still varies across browsers and operating systems.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>You do not need a giant Manifest on day one. Start with the name, icon, entrance, and display behavior 👻</div>
</div>

## From here, the right fields depend on the architecture

After the basic information, the Manifest becomes more application-specific.

Two particularly important members are `id` and `scope`.

These are not decorative options.

They relate to application identity and boundaries.

## Use id when you want a stable application identity

An explicit id can look like:

```text
"id": "/my-app/"
```

For one stable PWA that may change its start URL in the future, a fixed id can be useful because application identity does not have to move with the launch destination.

But an explicit id can also be omitted.

When no valid id is provided, the effective start URL is used for application identity.

That can be useful in dynamic page-level architectures such as 1P1A, where distinct start URLs already provide the separation required by the design.

## scope defines the application's navigation boundary

A scope such as:

```text
"scope": "/app/"
```

defines `/app/` as the application's navigation range.

For a site-wide application, a root scope may make sense:

```text
"scope": "/"
```

But if the same site contains multiple PWAs, automatically giving all of them a root scope can create overlapping application boundaries.

I ran into this directly during Android testing in PWA LAB.

Depending on the architecture, omitting an explicit scope can also be a deliberate choice.

## id, start_url, and scope answer three different questions

```text
id
->
Which app is this?

start_url
->
Where does it start?

scope
->
How far does its navigation area extend?
```

Keeping those questions separate makes Manifest architecture much easier to reason about.

For multi-app designs, see [What Is the PWA Manifest id? What Happens If You Omit It?](https://tips.ojapp.app/en/pwa-manifest-id-multiple-install-2/).

## Add theme_color and background_color when they serve the design

The Manifest can also provide color information:

```text
"theme_color": "#111111",
"background_color": "#ffffff"
```

`theme_color` gives supporting browsers and operating systems a hint about the application's theme color.

`background_color` can be used by supporting environments for background presentation during parts of the launch experience.

They are useful for maintaining a consistent visual identity, but their exact presentation is platform-dependent.

## description explains what the app does

A Manifest can also provide a description:

```text
"description": "A simple image compression tool that runs in your browser."
```

This is metadata describing the purpose of the web application.

Supporting installation and distribution environments can use it to provide more context before installation.

## screenshots can enrich the pre-install experience

You can also add screenshots:

```text
"screenshots": [
  {
    "src": "/screenshots/app.webp",
    "sizes": "1280x720",
    "type": "image/webp",
    "form_factor": "wide",
    "label": "App preview"
  }
]
```

screenshots are not required to make the PWA work.

They provide preview information that supporting installation or distribution UI can use to show what the application looks like.

Think of them as presentation before installation rather than an installability requirement.

## shortcuts create direct paths into the app

The Manifest can also define shortcuts:

```text
"shortcuts": [
  {
    "name": "New Post",
    "url": "/new/"
  },
  {
    "name": "Analytics",
    "url": "/analytics/"
  }
]
```

Supporting browsers and operating systems can expose these as direct paths from the installed application's icon to specific features.

Again, this is not something every PWA needs.

It becomes useful when the application has multiple frequently used destinations.

## Thinking by use case makes the Manifest much simpler

<table>
<thead>
<tr><th>Use case</th><th>Fields to consider</th></tr>
</thead>
<tbody>
<tr><td>Start with a home screen app</td><td>name / short_name / icons / start_url / display</td></tr>
<tr><td>Long-lived fixed PWA</td><td>Core fields + id</td></tr>
<tr><td>One site-wide application</td><td>Core fields + id / scope</td></tr>
<tr><td>Multiple page-level apps</td><td>Dynamic start_url / icons / name, with id and scope chosen intentionally</td></tr>
<tr><td>Visual branding</td><td>theme_color / background_color</td></tr>
<tr><td>Richer pre-install information</td><td>description / screenshots</td></tr>
<tr><td>Direct links to app features</td><td>shortcuts</td></tr>
<tr><td>Offline behavior</td><td>Implement separately with technologies such as a Service Worker</td></tr>
</tbody>
</table>

## A Service Worker is not a manifest.json field

This is one of the most important distinctions from this series.

A Service Worker is not a Manifest member.

The two technologies are frequently used together in PWAs, but they solve different problems.

```text
Web App Manifest
->
Name
Icons
Launch URL
Display mode
App identity and navigation boundaries
Pre-install metadata

Service Worker
->
Network interception
Offline behavior
Explicit caching strategies
Background handling required by features such as Web Push
```

And in 2026, a Service Worker is not required merely to make a PWA installable.

It makes more sense to add one when the application actually needs the capabilities it provides.

## This is roughly where I would start

For an ordinary web page or web tool, my first Manifest would be around this size:

```json
{
  "name": "My App",
  "short_name": "My App",
  "start_url": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

Then I would add fields such as:

```text
id
scope
theme_color
background_color
description
screenshots
shortcuts
```

only when the architecture or product actually benefits from them.

That is much easier to debug than copying a huge Manifest and later discovering that you do not know why half of its fields exist.

## Step away from the old PWA checklist

PWA development has a long history.

For years, the typical mental checklist looked something like:

```text
Create a Manifest
Create a Service Worker
Add offline support
Add Push
Make it installable
```

Those technologies can absolutely belong in the same application.

But in 2026, they do not all need to be your starting point.

If you need a home screen entrance, start there.

If you need offline behavior, add a Service Worker.

If you need a stable app identity, define id.

If you need an explicit navigation boundary, define scope.

If you want a richer installation presentation, add screenshots.

**A Manifest is not a file where you must fill in every available field. It is a file that describes the information your web application actually needs.**

## Modern PWAs can start with what the product actually needs

Across these six articles, we revisited several assumptions that still appear in older PWA material.

A Service Worker is not required merely for installation.

The Manifest alone can already provide much of the basic installed experience.

scope defines an app boundary.

id defines application identity.

screenshots can enrich presentation before installation.

And manifest.json does not need to contain every possible member.

Instead of adding features because the project has been labeled a PWA, choose the capabilities that the web application actually needs.

After spending a lot of time testing PWAs on real devices, that is the model I find easiest to work with.

Do not copy an old checklist blindly. Start small, test the current browsers you care about, and add each Manifest field because you know what job it is supposed to do.
