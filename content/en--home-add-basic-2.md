---
updated: 2026-11-06
---

# How to Add Any Website to Your Home Screen on iPhone and Android

If you visit the same website every day, searching for it or digging through bookmarks gets old. Adding a Home Screen icon gives you a quicker way back.

This guide walks through **adding a website to your iPhone using Safari or to your Android phone using Chrome**, then explains why the icon or launch page may not be what you expected.

## What does “Add to Home Screen” actually do?

It places an icon on your phone's Home Screen that opens a web destination. You do not have to find a separate app in the App Store or Google Play.

But a Home Screen icon is **not always an installed web app**. A regular website may open as a browser shortcut, while a website configured as a web app may launch in a separate window without the usual address bar. The result depends on the operating system, browser, and website configuration.

## iPhone: Add a website using Safari

1. Open the page you want in **Safari**.
2. Tap Safari's **Share** button (a square with an upward arrow). Its position depends on your Safari layout.
3. Scroll through the Share menu and select **Add to Home Screen**.
4. Review or edit the displayed name. If you see an option such as **Open as Web App**, choose the behavior you want.
5. Tap **Add**.

You should now see the new icon on your Home Screen.

### Opened the link in Instagram, LINE, or X?

Links opened inside social apps may use an **in-app browser**, which might not offer Safari's Home Screen action. Use the app's **Open in Safari** option, if available, or copy the URL and paste it into Safari.

## Android: Add a website using Chrome

1. Open the website in **Chrome**.
2. Tap the **three-dot menu (︙)**.
3. Choose **Add to Home screen**, **Install app**, or the equivalent option shown for that site.
4. Follow the prompt to confirm the name and **Add** or **Install**.

The wording and the way the icon launches depend partly on whether Chrome recognizes the site as an installable web app. An **Install** option does not guarantee that every website will behave identically after installation.

## Can you choose the icon and name?

You may be able to edit the **name** when adding a website. The **icon**, however, generally comes from the website's own settings.

On iPhone, an HTML `apple-touch-icon` can influence the icon used. On Android, icons in the Web App Manifest can be relevant. This is why adding an individual product or profile page may still give you the platform's main logo.

If you want an iPhone icon with your own image, Apple's **Shortcuts** app can create a custom Home Screen launcher for an app or URL. It does not replace the original app's icon.

## Why does the icon open the wrong page?

You may add a particular article or product page only to discover that the Home Screen icon opens the site’s home page instead.

One possible reason is the Web App Manifest's `start_url`. A website that specifies `"start_url": "/"` may intentionally launch its web app from the site root, even if you initiated the process while viewing a different page.

**Adding a page does not always mean the resulting web app will launch that exact page.**

## What if “Add to Home Screen” is missing?

Check the simple causes before troubleshooting PWA code:

1. Make sure you are opening the **web page itself** in Safari on iPhone or Chrome on Android.
2. On iPhone, use **Safari's Share menu for the page**, not the share sheet for an image you long-pressed.
3. Scroll down and check **Edit Actions** in Safari if the option is hidden.
4. On Android, look for **Install** as well as **Add to Home screen**.
5. Reload the page and try again if the menu seems temporarily incomplete.

A missing menu item and an icon that behaves incorrectly **after it has been added** are different problems. The latter may involve the website's icon configuration or Web App Manifest.

For more detail, see [Why “Add to Home Screen” is missing on iPhone](https://tips.ojapp.app/en/home-add-cannot-3/).

## What if you want your own custom icon?

The built-in option is ideal when you simply want a convenient way to open a website. If you want your **own photo, logo, or branding** on the icon, you need another approach.

On iPhone, Shortcuts can create a launcher with a chosen image. URL-based tools such as OJapp can also provide a specially configured Home Screen entry. The setup and behavior vary by tool and device.

See also [Shortcuts vs standard Home Screen icons vs OJapp](https://tips.ojapp.app/en/home-custom-compare-2/).

## Summary

On **iPhone, use Safari's Share menu**. On **Android, use Chrome's three-dot menu**. That is usually all you need to put a frequently visited website on your Home Screen.

If the icon uses a generic site logo or opens a different page, the website's own settings may be responsible. If you cannot find the option at all, start by checking which browser and which share menu you are using.
