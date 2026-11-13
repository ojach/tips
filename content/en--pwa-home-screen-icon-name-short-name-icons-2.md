When you add a PWA to the home screen, it starts to look like something more permanent than a normal browser page.</p>

There is an icon, and there is usually a name displayed with it.

So what actually determines those two things?

The Web App Manifest includes three important fields for this: `name`, `short_name`, and `icons`.

They are basic Manifest settings, but once you start testing PWAs on real phones, several questions appear. What is the difference between name and short_name? Is one icon enough? Why can an Android icon suddenly look too small or get cropped?

This article focuses on those visible parts of the PWA home screen experience.

## Start with a simple Manifest

Consider this example:

```json
{
  "name": "OJapp Image Compressor",
  "short_name": "Compressor",
  "start_url": ".",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

The three fields we are interested in are:

- `name`
- `short_name`
- `icons`

Other settings such as `start_url` and `display` are important too, but here we are focusing specifically on what the PWA looks like as a home screen entry.

## name is the application's full name

The `name` field defines the name of the web application.

```text
"name": "OJapp Image Compressor"
```

Where the platform has enough room to show the application name, this value can be used.

One useful thing to understand is that **the HTML page title and the PWA name do not have to be identical.**

Your page might have a descriptive search-friendly title:

```text
<title>Free Image Compression Tool | OJapp</title>
```

while the Manifest uses:

```text
"name": "Image Compressor"
```

A title that works well in a browser or search result is not necessarily the best label for a home screen app.

## short_name provides a shorter alternative

`short_name` is the shorter version of the application name.

```text
"name": "OJapp Image Compressor",
"short_name": "Compressor"
```

Home screens and other compact interfaces do not have much room for long labels.

A shorter name gives the platform another option when space is limited.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>On a home screen, recognizing the icon quickly can matter more than fitting a long product name underneath it 👻</div>
</div>

For example:

```text
name: OJapp Image Compression Tool
short_name: Compressor
```

This keeps the full application name while providing a compact alternative.

Exactly where each value appears can vary between operating systems and browsers, so it is better to think of `short_name` as **a compact name available when display space is limited**, rather than a guarantee that the same label will always appear in the same place.

## icons controls the most visible part of the home screen entry

The `icons` array defines images that can be used for the PWA.

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

`src` points to the image, `sizes` describes its dimensions, `type` identifies the image format, and `purpose` describes how the icon is intended to be used.

Because users often recognize the image before reading the label, the icon has a major role in the home screen experience.

## Android makes maskable icons especially important

One of the areas that caused the most trial and error in my PWA LAB testing was Android icon presentation.

Android launchers can display icons in different shapes, including circles and rounded shapes.

This is where `maskable` icons become useful.

```json
{
  "src": "/icon-maskable-512.png",
  "sizes": "512x512",
  "type": "image/png",
  "purpose": "maskable"
}
```

A maskable image should be designed with cropping in mind, keeping important artwork inside a safe area.

If a normal square image is treated as maskable without considering that safe area, important parts of the design can be cropped or the final icon can look unexpectedly small.

## Using separate any and maskable images is easier to control

A Manifest can provide both versions:

```text
"icons": [
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
```

The `any` image can serve as a regular icon, while the `maskable` image is designed specifically for environments that apply a mask.

In my testing, keeping those roles separate has been much easier to reason about than trying to make one image handle every presentation perfectly.

## The icon does not have to represent the entire website

Traditional PWAs often use the site's main logo as the application icon.

That makes sense when the entire site is treated as one application.

But page-level home screen entries create another possibility.

Imagine one website containing:

- an image compressor
- a timer
- a booking page
- a product page

If every home screen entry uses the same website logo, it becomes harder to tell what each icon opens.

Instead, you could use:

```text
Image compressor -> image icon
Timer -> clock icon
Booking -> calendar icon
Product -> product image
```

This is one of the ideas behind [1P1A (One Page. One App.)](https://tips.ojapp.app/en/1p1a/): the page itself can have an identity on the home screen.

## The name can describe the page too

If the icon changes with the page, the name can follow the same idea.

Suppose the website itself is called OJapp.

That does not mean every home screen entry has to be called OJapp.

```text
Image Compressor
5 Minute Timer
Booking
Product Name
```

A label can describe what will actually happen when the user taps the icon.

On the web, different pages already have different `<title>` values.

If pages are also treated as individual app-like entries, giving them different Manifest names and icons becomes a natural extension of that idea.

## An icon is not just decoration; it becomes part of the return UI

If you think of a home screen icon only as branding, using the website logo and stopping there makes sense.

But if you think about repeat visits, its role becomes different.

The user looks at the home screen and chooses what they want to open.

```text
See the icon
->
Recognize the purpose
->
Tap it
->
Open the intended page
```

That makes the icon and its label part of the interface for returning to the web.

This connects directly with the idea that a PWA becomes especially valuable after it reaches the home screen.

## A good first goal is simple: make the destination obvious

You do not need to start with complicated icon design rules.

First ask a few practical questions:

- Can I tell what this opens by looking at the icon?
- Is the displayed name too long?
- Does the important artwork remain visible at small sizes?
- Does Android cropping damage the design?
- Does it actually look right on a real home screen?

The Manifest alone cannot show you every final presentation.

Icons in particular can behave differently across platforms, so real-device testing is still one of the most useful checks.

## name, short_name, and icons define the visible entrance

`name` gives the application its full name.

`short_name` provides a shorter alternative for limited display space.

`icons` provides the images users recognize on the home screen.

They may look like basic Manifest fields, but their importance becomes clearer once you think about repeat access.

You can use the same site name and logo everywhere, and that may be exactly right for a site-wide PWA.

But when the destination itself matters, designing the name and icon around what the user is actually opening can make the home screen much clearer.

**A PWA icon does not have to be just a website logo. It can be the visual entrance back to a specific purpose on the web.**
