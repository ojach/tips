After using a website from your home screen for a while, you may eventually decide to remove it.</p>

Because the icon sits next to regular apps, that can raise an important question: **if I delete this icon, does all of the website's data disappear too?**

Will you be logged out? What happens to cookies? What about settings stored in localStorage? And if it is a PWA using a Service Worker, does its cache disappear as well?

The key point is that **removing a website from your home screen and deleting the data that a website stores on your device are not necessarily the same operation.** Storage behavior can also vary between browsers, operating systems, and installed PWA implementations, so it is better not to assume that everything will always remain—or always be deleted.

## You are primarily removing an entry point

In the previous article, I explained [whether a website added to the home screen is an app, bookmark, or PWA](https://tips.ojapp.app/en/home-screen-website-app-or-bookmark/).

A home screen icon gives you an entry point to a website or web app.

Removing that icon does not remove the website from the internet.

For example, imagine you added:

```text
https://example.com/
```

to your home screen.

Deleting the icon does not delete `example.com`. You can still open Safari, Chrome, or another browser and visit the same URL again.

A useful starting point is to think of the action as **removing an entry point from the home screen rather than deleting the website itself.**

## Your account does not disappear just because the icon does

This part is relatively straightforward.

If you created an account on a web service, removing its home screen icon does not normally delete that account from the service's servers.

Server-side information such as:

- your user account
- profile information
- purchase history
- settings saved to your account
- cloud data

exists separately from the icon on your home screen.

If you actually want to close the account, you generally need to use the service's account deletion or cancellation process.

## “Login information” can mean several different things

The question becomes more complicated when someone asks whether their login information will disappear.

It helps to separate at least three things:

- the account that exists on the service
- the browser session that keeps you signed in
- the username and password saved in a password manager

They are not the same data.

As explained above, removing the home screen icon does not automatically delete your server-side account.

Your signed-in session, however, may depend on browser technologies such as cookies and other site storage.

Credentials saved in systems such as iCloud Keychain or Google Password Manager are managed separately again.

So **deleting a home screen website does not simply mean that your saved password has been deleted.**

## Cookies and localStorage belong to web storage

Websites can store information on your device using several browser technologies.

Two familiar examples are cookies and localStorage.

A website might save a preference with code such as:

```text
localStorage.setItem('theme', 'dark');
```

That value is not stored “inside” the home screen icon. It belongs to storage managed for the website or web app.

This is why removing an icon and clearing cookies or localStorage should be treated as different concepts.

There is an important caveat: browsers and operating systems can manage storage differently, especially when comparing an installed PWA with an ordinary browser tab. Uninstall and cleanup behavior can therefore depend on the environment.

If the information is important, a web app should not assume that localStorage will survive forever.

For a deeper look at browser-side storage, see [The Limits of Local Storage: Capacity, Deletion Timing, and Safety Explained](https://tips.ojapp.app/en/localstorage-limits/).

## Service Worker caches are not the home screen icon either

PWAs can use Service Workers and the Cache API to store HTML, CSS, JavaScript, images, and other resources locally.

For example, an app might create a cache with:

```text
caches.open('app-cache-v1')
```

Again, this cache does not literally live inside the icon on your home screen.

However, uninstalling an installed PWA and simply removing a website shortcut are not necessarily identical operations from a browser or operating system's perspective. The handling of related site data can depend on the platform.

For that reason, you should not look at a missing home screen icon and automatically conclude that every Service Worker cache has also been removed.

I have run into the opposite problem repeatedly while testing Service Workers in PWA LAB: I changed files, expected the old version to be gone, and an old cache was still affecting what I saw. Caching is one of PWA's most useful features, but during development it can also create plenty of “why is this still here?” moments.

If you want to understand that behavior in more detail, see [Understanding PWA Cache Strategies: Cache First, Network First, and Stale-While-Revalidate](https://tips.ojapp.app/en/pwa-cache-strategy-2/).

## What happens if you add the website again later?

Because the website itself still exists, you can normally return to it in the browser and add it to your home screen again.

Whether your previous state comes back depends on where that state was stored.

If settings are stored on the server and connected to your account, signing in may restore them.

If settings existed only in localStorage and that local storage has been removed, there may be nothing to restore.

It helps to think of these as separate layers:

- data stored on the server
- data stored by the browser
- resources cached for the PWA
- the entry point placed on the home screen

Removing one layer does not automatically tell you what happened to all the others.

## If you want to remove all data, deleting the icon may not be enough

If your goal is not only to remove the icon but also to erase data stored by that website on the device, you may need to use the browser or operating system's site-data controls.

Safari provides controls for website data, while Chrome-based browsers provide their own site settings and browsing-data controls.

And if you also want the service itself to delete your account, that requires a separate account deletion process.

**Removing a home screen icon, deleting local website data, and deleting an online account are three different actions.**

## The icon is not the data itself

Removing a website or PWA from the home screen can look very similar to deleting a regular app.

But a web experience can involve several different storage locations: a remote server, browser storage, cookies, caches, and the home screen entry itself.

That is why the question “does everything disappear when I delete it?” does not have one universal yes-or-no answer.

The simplest principle to remember is this:

**when you remove a website from the home screen, the first thing you are removing is its home screen entry point.**

If you also want to remove an account or locally stored website data, those may require separate actions.

The same distinction matters for developers. Just because a web app has an app-like icon on the home screen does not mean its data should be treated as permanently installed app data. Important information should be stored and synchronized according to what the application actually needs.
