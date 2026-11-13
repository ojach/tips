The Web App Manifest includes a member called `id`.</p>

Unlike `name`, `icons`, or `start_url`, users do not normally see it.

That makes it easy to wonder whether it is really necessary.

Then things become more interesting when you try to create multiple PWAs on the same website.

**The id exists to help the browser identify the web application itself.**

So what happens if you leave it out?

The PWA does not automatically break.

Let's look at what `id` means, how it relates to `start_url`, and why it becomes important when thinking about multiple installed PWAs and page-level app design.

## id is the identifier of the web application

A Manifest can contain:

```json
{
  "id": "/my-app/",
  "name": "My App",
  "start_url": "/my-app/",
  "display": "standalone"
}
```

The `id` member provides a unique identifier for the web application.

It is not based on whether two apps have the same visible name.

It is not based on whether they use the same icon.

It gives supporting browsers a way to determine which installed web application a Manifest describes.

## The same id can preserve the same PWA identity

This becomes useful when a Manifest changes.

Imagine an application originally uses:

```json
{
  "id": "/my-app/",
  "start_url": "/old-app/"
}
```

Later, the launch page moves:

```json
{
  "id": "/my-app/",
  "start_url": "/new-app/"
}
```

The id has not changed.

A supporting browser can therefore treat the new Manifest as an update to the same application rather than depending on the start URL itself as the identity.

This is one of the main reasons to explicitly define an id for a long-lived PWA.

## Different ids can identify distinct applications

Now consider two Manifests:

```json
{
  "id": "/app-a/",
  "start_url": "/tool/"
}
```

and:

```json
{
  "id": "/app-b/",
  "start_url": "/tool/"
}
```

The launch URL is the same, but the ids are different.

Current Manifest documentation describes different valid ids as distinct application identities, even when the Manifests are served from the same location.

At first, that makes the solution for multiple PWAs look obvious: simply generate a different id for every app.

But while developing 1P1A, I found another useful option.

## id can be omitted

The `id` member is not something every Manifest must explicitly contain.

If a valid id is not provided, <strong>the effective `start_url` is used as the application identifier.</strong>

For example:

```json
{
  "name": "Timer",
  "start_url": "/timer/",
  "display": "standalone"
}
```

does not become an app with no identity simply because the Manifest has no explicit `id`.

Chrome documentation also explains that when id is omitted, Chrome derives the app identity from `start_url`.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>Leaving id out does not mean the app has no identity. start_url takes on that job 👻</div>
</div>

## Without an explicit id, start_url becomes more important

This connects directly with the previous start_url discussion.

If one app uses:

```text
"start_url": "/timer/"
```

and another uses:

```text
"start_url": "/compressor/"
```

their effective identifiers can differ even without explicitly writing separate ids.

That means a design where every page has a different effective start URL can, in supporting implementations, use that difference as part of application identity.

This connects directly with [What Should You Use for PWA start_url? Home Page, Current Page, or a Dedicated URL](https://tips.ojapp.app/en/pwa-start-url-top-current-page-dedicated-url-2/).

## Omitting id keeps my 1P1A Manifest simpler

The goal of 1P1A, or One Page. One App., is simple:

```text
Page A
->
App A

Page B
->
App B

Page C
->
App C
```

I could generate an explicit id for every page:

```text
"id": "/page-a/"
"id": "/page-b/"
"id": "/page-c/"
```

But when each page already has a different effective start URL that can provide the application identity, generating and maintaining another value is not always necessary.

For that reason, my 1P1A design does not treat an explicit id as mandatory. I prefer to keep the Manifest small when the start URL already provides the distinction I need.

## Omitting id is different from having no identifier

This distinction is important.

If the Manifest does not literally contain:

```text
"id": "..."
```

that does not mean the browser has no way to identify the PWA.

When id is omitted or invalid, the effective start URL is used as the identifier.

```text
Explicit id
->
You define a stable app identity

No explicit id
->
The effective start_url supplies the identity
```

## Does that mean you should never write id?

No.

For a stable site-wide PWA that will exist for years, explicitly defining id can be useful.

One major reason is the ability to change the launch URL without intentionally changing the application's identity.

For example:

```text
Today
start_url: /app/

Later
start_url: /dashboard/
```

If the app has a stable explicit id, its identity does not have to move with the start URL.

Chrome's documentation specifically highlights this benefit: an explicit id removes the application's identity dependency on start_url and the Manifest location.

## An explicit id makes sense for a fixed application

For a 1S1A, or One Site. One App., architecture, a Manifest might look like:

```json
{
  "id": "/my-app/",
  "start_url": "/",
  "scope": "/",
  "name": "My App"
}
```

The id remains the stable identity of the app even if its internal entry point changes later.

A useful way to think about it is: **id is the application's identity card, while start_url is its entrance.**

## Do not reuse one id for apps that are meant to be different

The opposite mistake is giving separate PWAs the same explicit id.

```text
Timer
id: /my-app/

Compressor
id: /my-app/
```

You may think of these as two apps, but their Manifests are declaring the same application identity.

If they are intended to be distinct applications, their explicit ids should be distinct.

Another option in a dynamic page-level architecture is to omit the explicit id and let distinct effective start URLs provide the identities.

## id, start_url, and scope have different jobs

The previous article covered `scope`, which is easy to confuse with id.

A simplified model is:

```text
id
->
Which app is this?

start_url
->
Where does the app start?

scope
->
How far does the app's navigation area extend?
```

For example:

```json
{
  "id": "/shop-app/",
  "start_url": "/shop/home/",
  "scope": "/shop/"
}
```

can be read as:

```text
App identity -> /shop-app/
Launch page -> /shop/home/
Navigation scope -> /shop/
```

Reading this together with [What Does PWA scope Do? Comparing iPhone and Android Behavior](https://tips.ojapp.app/en/pwa-scope-iphone-android-difference-2/) makes the separation much easier to see.

## id looks like a URL, but it is not a launch destination

An id is represented as a URL-like value:

```text
"id": "/my-app/"
```

But it does not need to point to an accessible resource.

Its job is identification, not navigation.

The resolved id must also remain on the same origin as the application's start URL.

## Query parameters can be part of id

Because id uses URL processing rules, query parameters can be preserved as part of the identifier.

```text
"id": "/timer/?time=5"

"id": "/timer/?time=10"
```

These can resolve to different application identifiers.

This becomes interesting when a web application represents user-selected state through its URL.

Fragments are different. Fragment identifiers are removed when the Manifest id is processed.

```text
"id": "/timer/#five"
"id": "/timer/#ten"
```

Changing only the fragment therefore cannot be used to create distinct Manifest ids.

## UDA can use id, but UDA is not an id feature

In my User Defined App experiments, the user can define an app-like state through a URL such as:

```text
/timer/?time=5&mode=down
/timer/?time=20&mode=up
```

A system could reflect those queries in both start_url and id so that the states receive distinct identifiers.

But UDA itself does not mean 'put a query string in id.'

UDA is the broader design idea that the user defines the final app entrance or state through the URL. Manifest id is simply one tool that can participate in an implementation.

## Whether to omit or define id depends on the architecture

<table>
<thead>
<tr><th>Design</th><th>How to think about id</th></tr>
</thead>
<tbody>
<tr><td>One stable site-wide PWA</td><td>An explicit stable id is useful</td></tr>
<tr><td>start_url may change later</td><td>A fixed id can preserve application identity</td></tr>
<tr><td>Dynamic page-level PWAs</td><td>Omitting id and using distinct effective start URLs can be a valid design</td></tr>
<tr><td>Multiple fixed PWAs</td><td>Give each one a distinct explicit id</td></tr>
<tr><td>State-specific identity</td><td>An id containing query parameters can be designed intentionally</td></tr>
</tbody>
</table>

## Omitting id does not automatically break a modern PWA

Some Manifest examples contain id and others do not, which can make it look like id has become another mandatory PWA field.

It has not.

If id is omitted, the effective start URL is used for application identity.

An explicit id becomes valuable when you want that identity to remain stable independently of the start URL.

**id is not a field to add just because you are building a PWA. It defines what the browser should continue to recognize as the same application.**

For one stable app, an explicit id can be useful.

For dynamic page-level apps, the start URL may already provide the identity you need.

For multiple distinct apps, do not accidentally give them the same explicit id.

Once those ideas are separated, the relationship between id, start_url, and scope becomes much easier to understand.

Next, I will move to a much more visual Manifest feature: `screenshots`, and look at what they actually change in Chrome's PWA installation experience.
