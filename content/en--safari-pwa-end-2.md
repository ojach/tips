**“Did Apple kill PWAs on iPhone?”**</p>

If you searched for information about Progressive Web Apps on iOS over the last few years, you may have seen claims that Safari was ending PWA support.

There was a real reason for that confusion.

In 2024, Apple announced plans to remove Home Screen web app functionality for users in the European Union as part of its response to the Digital Markets Act (DMA).

But that plan was later reversed.

And in 2026, PWAs on iPhone are not dead.

In fact, recent versions of iOS have expanded how websites can behave when added to the Home Screen.

So what actually happened between 2024 and 2026?

Let’s separate the old headlines from how Home Screen web apps actually work on iPhone today.



## Are PWAs dead on iPhone in 2026?

**No. PWAs and Home Screen web apps are still supported on iPhone.**

Users can still add websites to the Home Screen and launch them as web apps.

Web App Manifest settings are still supported, and developers can use them to define things such as:

- the app name
- the Home Screen icon
- the launch URL
- the display mode
- the app scope

  
  
  
  
  

Home Screen web apps can also use features such as Service Workers and Web Push when the necessary requirements are met.

So the idea that iOS simply replaced PWAs with basic WebClips is no longer an accurate description of the platform.



## Why did people think Apple was ending PWA support?

The confusion largely comes from a real announcement Apple made in 2024.

As part of its changes to comply with the European Union’s Digital Markets Act, Apple initially announced that Home Screen web apps would no longer be available in their existing form for users in the EU.

Under that plan, websites added to the Home Screen would have behaved more like regular browser bookmarks instead of standalone web apps.

That naturally led to headlines and discussions such as:

- “Apple is killing PWAs in Europe”
- “PWAs are dead on iPhone”
- “Safari is ending PWA support”

  
  
  

At the time, those concerns were understandable.

But that was not the end of the story.



## Apple reversed the decision

Apple later reversed its plan to remove Home Screen web apps in the EU.

After receiving requests to continue supporting the feature, Apple announced that it would continue offering the existing Home Screen web app capability in iOS 17.4.

That distinction is important.

**PWAs were not permanently removed from iPhone.**

A plan to remove Home Screen web app functionality in the EU was announced, but that plan was withdrawn before becoming the permanent state of the platform.

Some older articles and discussions still reflect the original announcement, which is one reason the idea that “Apple killed PWAs” continues to appear in search results.



## Apple continued adding web app features after 2024

The years that followed also make it difficult to describe PWAs on iPhone as discontinued.

Home Screen web apps continued to support Web Push, and WebKit kept developing web app related functionality.

In iOS 18.4, for example, WebKit introduced Declarative Web Push, a new way for websites to handle push notifications without requiring a Service Worker for every part of the notification process.

Whatever terminology we use for these experiences, Apple clearly continued developing technologies used by Home Screen web apps.



## iOS 26 changed Add to Home Screen again

One of the biggest changes arrived with iOS 26.

Previously, whether a website opened from the Home Screen with an app-like experience depended more heavily on how the website itself was configured.

With iOS 26, websites added to the Home Screen can open as web apps by default.

This means a website does not necessarily need to have been built as a traditional PWA just to get an app-like Home Screen launch experience.

When adding a website, users can also choose not to open it as a web app and instead keep the more traditional Home Screen bookmark behavior.

This is almost the opposite of “PWA support being removed.”

**The ability to turn a website into a Home Screen web app has become available to a broader range of websites.**



## Does iOS 26 make the Web App Manifest unnecessary?

No.

This is an important distinction.

iOS 26 makes it easier for a website to open as a web app from the Home Screen, but the Web App Manifest still has an important role.

A manifest can define how that web app should behave, including:

- `name` and `short_name`
- `icons`
- `start_url`
- `display`
- `scope`

  
  
  
  
  

WebKit has explicitly stated that the newer Home Screen behavior does not remove support for Web App Manifest configurations.

A useful way to think about the change is:

**Adding a website as a web app has become easier, while the manifest still helps developers define what that web app should be.**



## Is Add to Home Screen the same as installing a PWA?

Not necessarily.

This is where the terminology has become increasingly confusing.

Traditionally, developers often described a website as a PWA when it met a particular combination of app-like characteristics: a Web App Manifest, Service Worker support, standalone display, offline capabilities, and other enhancements.

But on modern iOS, the user can add a much wider range of websites to the Home Screen and open them with an app-like experience.

That makes the boundary between:

- a website
- a Home Screen website
- a Home Screen web app
- and a traditional PWA

  
  
  
  

less clear than it once was.

The important point is that **Home Screen web apps are still very much part of iOS.**



## iPhone and Android do not treat PWAs exactly the same

Another source of confusion is assuming that “PWA support” means exactly the same thing on every platform.

It does not.

Android browsers and iOS can interpret installation, manifest settings, icons, scope, and display behavior differently.

In our own device testing at OJapp PWA LAB, we have repeatedly found cases where the same manifest configuration produces different Home Screen behavior on iPhone and Android.

For developers, this means testing the actual Home Screen experience on both platforms is often more useful than simply asking whether a website “supports PWA.”



## So, did Safari really end PWA support?

**No.**

What actually happened is more interesting.

- Apple announced plans to remove Home Screen web apps in the EU in 2024
- Apple later reversed that decision
- Home Screen web apps continued to work on iPhone
- Web App Manifest support continued
- Web Push and related web app technologies continued to evolve
- iOS 26 expanded app-like Home Screen behavior to a broader range of websites

  
  
  
  
  
  

So the story from 2024 to 2026 is not that PWAs disappeared.

Instead, **the boundary between a regular website and a Home Screen web app became less rigid.**

A website can remain a website in the browser, become a Home Screen entry point when the user chooses, and use a Web App Manifest or other web technologies to define a richer app-like experience.

That may be a more useful way to understand PWAs on iPhone in 2026 than asking whether they are simply “alive” or “dead.”
