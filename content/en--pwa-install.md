Is a PWA finished as soon as a website can be added to the home screen?

When I started developing OJapp, getting websites onto the home screen was my main concern. But after testing on real devices in PWA LAB and treating individual pages as apps in Petal, I began to see that being installable and being useful as an app are two different things.

Can users figure out how to add it? Does the icon look as expected? Does tapping it open the right page? And does the resulting experience offer something more convenient than a browser tab?

**PWA installation UX needs to cover not just the act of installing an app, but what happens the next time someone taps its icon.**

## What changes when you add a website to the home screen?

On iPhone, the usual approach is to open the desired page in Safari and select Add to Home Screen from the Share menu. On Android, look for Add to Home Screen or Install in Chrome's menu. Labels and steps can vary with the OS and browser version.

Both approaches can place an icon on the home screen. However, the experience differs depending on whether that icon opens a regular browser shortcut or launches a web app in its own window.

A Web App Manifest lets developers specify the app name, icon, launch URL, and display mode. What interests me about PWAs is that developers can design the experience of returning from the home screen, rather than simply giving users a way to save a URL.

## What to check when installation does not work

When someone says they cannot install a PWA, they may be describing several different problems:

- The browser menu has no option to add or install the website.
- An installation button on the website is missing or unresponsive.
- An icon was added, but it opens in a regular browser window.
- The installed app opens the wrong page or uses an unexpected display mode.

As a user, first try opening the page directly in Safari or Chrome rather than an in-app browser inside a social media app. On iPhone, check the Share menu for the web page itself, not the menu for an image. On Android, look for an Install option and check whether the app is already installed.

As a developer, check HTTPS, whether the manifest is being retrieved correctly, its icons, launch URL, and display mode. The absence of a service worker alone does not mean installation is impossible. A website's custom installation button can also be unavailable even when the browser menu still offers a way to add the site.

I eventually got tired of checking PWA status manually and built my own checker. Separating the configuration you wrote from the behavior actually observed on the device makes troubleshooting much easier.

## Installed display modes differ between iPhone and Android

Two common values for the manifest's `display` member are `standalone` and `fullscreen`.

`standalone` requests a separate app-like window without ordinary browser controls such as the address bar. `fullscreen` requests an experience that uses the entire screen. Which controls remain visible depends on the device and browser implementation.

When I compared these modes on Android Chrome in PWA LAB, switching to `fullscreen` made a clear difference to how the screen was used. On iPhone, the same configuration change produced no similarly obvious difference in my tests.

This matters beyond how app-like the interface looks. If the browser's back button disappears, how will users navigate back? If the interface extends to the edges of the screen, will controls overlap system UI or safe areas? Choosing a display mode changes the interface you need to design.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption>
</figure>
<div class="balloon__text balloon__text-right">
💡 Once you have installed it, open it again from the home screen and see what actually happens!
</div>
</div>

During development, test the installed experience instead of relying solely on the browser view. An expression such as `matchMedia('(display-mode: standalone)')` can help identify the current display mode. It does not provide a list of installed apps, however.

## Which page should open when someone taps the icon?

The launch destination is something I care particularly about.

Imagine adding a product page or someone's profile to your home screen, only to find that the icon opens the website's homepage next time. You have to find the page you wanted all over again.

This can happen when the manifest's `start_url` points to the site root. Users cannot necessarily edit an installed icon's launch URL independently. Removing the icon and adding it again may produce the same result if the website's configuration has not changed.

In Petal, I built a way to add individual people's digital business cards to the home screen. During development, I encountered an issue on iPhone where the URL I wanted to save differed from the actual launch destination. I experimented with setting `start_url` to `.` in the manifest, which helped resolve the problem in my setup. Relative URLs depend on the manifest's delivery method and base URL, so this is not a universal fix to apply blindly.

Starting at the homepage makes sense for a site-wide app. Starting at a specific page makes more sense when that page is what someone repeatedly uses. I prefer to make that decision based on why the user wants the icon in the first place.

## When should you invite someone to install a PWA?

The home screen belongs to the user. When a website asks for installation immediately after a first visit, the visitor may not yet have any reason to keep it there.

I would focus on moments when returning becomes useful: after someone finishes reading an article, completes a task with a tool, or discovers a feature they expect to use repeatedly.

Making an installation button easy to find is also different from repeatedly showing a prominent prompt. Giving interested users an accessible entry point that they can use on their own terms can create a more natural experience.

## New installation experiences emerging with Chrome 158

Chrome 158's Web Install capabilities allow websites to offer installation of other web apps in supported environments. The HTML `<install>` element and JavaScript's `navigator.install()` can provide a path from a PWA catalog to an installation confirmation dialog.

In my own comparison, `navigator.install()` displayed an additional permission prompt when targeting an external PWA. The `<install>` element opened the installation dialog without that extra prompt.

I also investigated unresponsive buttons on another PWA catalog. When I copied its exact YouTube `<install>` code into my own test page, the installation dialog opened successfully. DevTools reported `style_invalid` on the original site, and its developer later confirmed that invalid dark-mode styling was the cause.

It was an interesting discovery: installation UX can depend not only on the manifest, but also on button styling, visibility, and limits on the number of installation elements.

As a user, I recommend checking the provider and URL of a PWA you discover through a catalog, and trying it in the browser before installing it. Being installable is not a guarantee of safety.

## The goal: a reason to install and a reason to return

When thinking about PWA installation, I care less about installation counts alone than whether the icon is useful afterward.

The installation process should be understandable, the icon should open the expected page, and the installed interface should help users accomplish their goal on their device. Together, those experiences give a web app a reason to occupy a place on the home screen.

On OJapp Tips, I explore these questions individually: how to add websites to the home screen, why installation fails, real-device comparisons of display modes, launch URL design, and the timing of installation prompts. This page is the starting point for both users and developers who want to understand PWA installation and display UX.
