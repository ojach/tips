---
updated: 2026-11-05
---

There is more than one way to put a website on your phone's Home Screen. You can use a Progressive Web App (PWA), create an iPhone Shortcut, or use a tool such as OJapp to make a Home Screen entry for a URL.

All three can give you an icon to tap. But **who sets it up, what happens when you tap it, and how you share it** are quite different.

## The short answer: choose based on your goal

- **PWA:** You own a website and want to provide an app-like experience.
- **Shortcuts:** You want to customize your own iPhone's icons or launch actions.
- **OJapp:** You want to give an existing URL a name and icon, then share that entry with other people.

One important distinction: these are not three entirely separate technologies. **OJapp uses PWA-related browser features.** The practical comparison is between configuring your own site, creating a personal Shortcut, and using a tool to prepare an entry for an existing URL.

## PWA vs. Shortcuts vs. OJapp

| Question | PWA | iPhone Shortcuts | OJapp |
| --- | --- | --- | --- |
| Who configures it? | Site owner or developer | Individual user | Person creating the entry |
| Who chooses the icon? | Site owner | Individual user | Entry creator |
| Can it point to an external site? | Usually requires control of the site | Yes, with an Open URL action | Yes, through a URL-based entry |
| What do you share? | Website URL | The Shortcut | Generated entry URL |
| Offline functionality | Possible if implemented | Depends on the destination | Depends on the destination |
| Best for | A site's app experience | Personal automation and customization | Sharing a branded entry point |

In each case, the recipient generally still needs to add something to their Home Screen. The exact behavior depends on the operating system and browser.

## PWA: an app experience provided by the website

A Progressive Web App uses web technologies to provide an experience closer to a native app. A Web App Manifest can define the app name, icons, launch URL, and display mode.

For example, `display: "standalone"` can open an installed web app without the usual browser interface in supported environments. A Service Worker and the Cache API can also support offline behavior when the site implements an appropriate caching strategy.

But **being addable to the Home Screen does not automatically mean a site works offline**. Installing a Service Worker alone does not make every page available without a connection.

In my own PWA testing, Android and iPhone have not always treated the same manifest settings identically. Icon handling, display behavior, and cached resources can all affect the result.

If you control your website and want to manage the experience after launch, a PWA is the natural place to start.

For the basics, see [How to Create a PWA](https://tips.ojapp.app/how-to-pwa/).

## Shortcuts: customize your own iPhone

Apple's Shortcuts app can create actions that open a URL, launch an app, or perform several steps in sequence. You can add a Shortcut to the Home Screen and choose its name and image.

This is particularly useful if you want a consistent Home Screen theme or a personalized workflow. The trade-off is setup: you need to create the Shortcut, choose its actions, and add it to the Home Screen.

A common misconception is that **Shortcuts cannot be shared**. They can. However, recipients still need to review and add the Shortcut themselves. Sharing a Shortcut does not automatically place an identical icon on someone else's Home Screen.

Shortcuts also go well beyond opening links. If you want to automate actions on your own iPhone, that flexibility is a major advantage.

## OJapp: give an existing URL a Home Screen entry

OJapp lets you assign a name and icon to a URL and create an entry that people can add to their Home Screen. This can be useful when you want to point to a page on a service you do not control, such as a shop or profile hosted elsewhere.

The entry can be shared as a URL, so recipients do not need to build an iPhone Shortcut from scratch.

There is a limit worth making clear: **creating an OJapp entry does not add offline support or push notifications to the destination website**. What happens after launch still depends on that website and the browser.

My interest in this approach came from a simple question: could a URL be presented as something people keep on their Home Screen, rather than just another link they might lose? Preparing an entry point and rebuilding the underlying website are different tasks.

## What does “shareable” really mean?

All three methods can be shared in some form. What differs is *what* you share.

With a PWA, you share the website URL and rely on the site's app configuration. With Shortcuts, you share a set of actions that someone else can import. With OJapp, you share the URL of an entry with a chosen name and icon.

So the useful question is not simply “Can I share it?” It is **“What does the recipient receive, and what must they do next?”**

Also, the recipient's device and browser can affect the final icon, installation flow, and launch behavior. A shared setup does not guarantee pixel-for-pixel identical results across platforms.

## A Home Screen icon is more than a faster bookmark

A Home Screen icon makes a page easier to reopen. But I think it changes something else too: how visible that page is in everyday use.

A bookmark can disappear into a folder. An icon on the Home Screen stays in a place you regularly see. The page starts to feel less like a link to search for and more like an entry point you deliberately keep.

That is why it helps to decide **who should open the page, which page they should reach, and what experience they need** before choosing a method.

## Conclusion: build the site, customize your phone, or share an entry

Choose a **PWA** when you own the website and want to design its app-like behavior. Choose **Shortcuts** when you want personal control over your iPhone's icons and actions. Choose **OJapp** when you want to package an existing URL as a named, icon-based entry point to share.

There is no universal winner. The right choice depends on who configures it and who will use it.
