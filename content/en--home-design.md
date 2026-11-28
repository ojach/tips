A smartphone home screen tells you a little about its owner: what they use every day, what they like, and how they organize their digital life. Some people arrange their work apps together. Others build a consistent color scheme.

While developing OJapp, I began to wonder why websites couldn't be part of that experience too. A favorite shop, a personal profile, or a frequently used web tool could each have its own recognizable icon.

Home screen design is about more than making a phone look good. **It's about putting the things you want to use where you can easily recognize and access them.** That's the perspective I take when designing icons and web apps.

## Home screen customization in 2026

Built-in iPhone features now let users adjust icon tint, dark appearance, and size. Android also offers customization options that vary by launcher and device.

A consistent appearance that once required collecting and applying individual icon assets can increasingly be achieved with built-in tools.

What interests me more than changing colors or shapes, however, is the freedom to choose what belongs on the home screen. Instead of simply selecting a ready-made theme, users can assemble their own collection of useful entry points. I think that's where more of the value of customization will lie. This is my perspective from building home screen tools, rather than a conclusion drawn from market-wide statistics.

## Creating an icon and applying it are different tasks

To turn a favorite photo or illustration into an icon, start with a square image. A phone's photo editor or a design tool such as Canva will do.

Creating that image does not automatically change an existing app's icon. On iPhone, Shortcuts can create a launch entry with a custom image. On Android, the available methods depend on the launcher and device.

For websites, the assets provided by the site also influence which icon appears. Adding a shop hosted on BOOTH or BASE, for example, may produce the platform's shared icon instead of the individual shop's logo.

One reason I built OJapp Maker was to create custom entry points for URLs, with their own images and names. The idea is to create a new way to access a URL, rather than rewrite the original website's or native app's icon.

## Designing images that work on a home screen

### Choose image dimensions for the intended use

Icons, wallpapers, and widgets share the same screen, but their images are used differently.

| Use | Practical starting point |
| --- | --- |
| Icon | A square master image of at least 512 × 512 px |
| Wallpaper | Match the device's screen ratio and check overlap with clocks and icons |
| Widget | Match the dimensions and proportions of the widget's display area |

A 1024 × 1024 px master icon is also convenient, but that does not make it mandatory on every device. Export appropriate PWA assets, such as 192 px and 512 px versions, as needed.

### Leave room for the operating system's icon shapes

An icon that looks great at full size may lose thin lines or small lettering when displayed on a home screen. A logo that extends to the edges may also be clipped by circular or other Android icon masks.

My starting point is a square image with a background and an easily recognizable central motif. Rather than baking rounded corners into the image, I account for the shape the device will apply and adjust the spacing accordingly.

For a maskable icon, the safe zone is a centered circle with a radius equal to 40% of the image width. Keep essential artwork inside that circle and extend the background across the entire image. Preparing ordinary and maskable assets for their respective purposes is a sensible approach.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption>
</figure>
<div class="balloon__text balloon__text-right">👻 It looks great at full size, but will you recognize it when it shrinks to a home screen icon?</div>
</div>

## What determines a PWA's name and icon?

The Web App Manifest provides candidates for the names and images displayed on the home screen and elsewhere.

```json
{
  "name": "My Web Tool",
  "short_name": "My Tool",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "/icon-maskable.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

The `name` is the application's name, `short_name` provides a shorter label for limited display space, and `icons` supplies image candidates. Which values actually appear depends on the operating system and browser. On iPhone, the HTML `apple-touch-icon` may take precedence.

A short name still needs to be meaningful. If users add several pages from the same website, each label should help distinguish its destination. Designing the name and icon together makes the right page easier to find.

## Why OJapp prepares its icon images

Developing OJapp has involved figuring out how to fit portrait and landscape images into square assets, and how to handle backgrounds and spacing. Stretching an image without respecting its aspect ratio distorts the original logo or photograph.

CSS properties such as `object-fit` and `background-size` offer useful analogies, but displaying an image neatly on a web page and generating the image used by the operating system are separate tasks. Adding `border-radius` to a page cannot directly change the shape of an installed home screen icon.

With Petal, I have also explored using individual digital business cards as home screen entry points. In that context, an image that identifies the person is more useful than a collection of identical Petal logos.

This connects to my One Page. One App. (1P1A) design philosophy: an icon can identify an individual page rather than only the website as a whole.

## Do installed icons change when the website updates them?

This was particularly interesting to test. I added OJapp to an iPhone and an Android phone, then changed the icon image to OJapp PRO without changing the manifest's `id`.

I left both apps unopened for a month. Both phones retained the old icon. Launching the apps several times afterward made no difference, but removing and adding them again produced the new icon. On PC, by contrast, launching the installed PWA displayed an update notice and allowed me to update it.

This experiment does not establish the behavior of every device. It does, however, make me reluctant to design around the assumption that changing a website's icon image will promptly update every existing home screen entry.

That distinction matters when planning seasonal icons or a new logo. Updating a web page and updating its installed home screen image need to be treated separately.

## Design an entry point worth keeping

What matters to me in home screen design is more than visual consistency. An icon should remain recognizable at small sizes, have a name that communicates its purpose, and give the user a reason to tap it.

Websites can provide meaningful icons for individual pages, letting users choose entry points that fit their daily lives. The home screen is the user's own space, not advertising space belonging to a website operator. That's the perspective I want to keep exploring as I work on icons and home screen experiences.
