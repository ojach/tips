“Why doesn’t my PWA work on Safari or iPhone?”
This question has become increasingly common since 2024.

The short answer is:
**PWAs no longer function in their original form on Safari.**

In this article, we explain clearly and simply why PWAs don’t work on Safari,
and what actually changed between 2024 and 2026.



## 1. Safari Never Fully Supported PWAs

First, it’s important to understand that Safari has always had limited PWA support.

Compared to browsers like Chrome:

- Service Worker behavior is restricted
- Push notifications work differently
- Installation behavior is inconsistent

 	
 	
 	

In other words, Safari was never a browser that fully embraced PWAs.



## 2. Major Changes After 2024 (EU Regulations Impact)

In 2024, Apple made significant changes to WebKit (Safari’s engine)
to comply with EU regulations.

As a result, key PWA features became unstable or stopped working:

- Service Workers no longer behave reliably
- Home screen apps lose standalone app behavior
- Cache behavior becomes inconsistent

 	
 	
 	

This didn’t come with a clear “PWA is discontinued” announcement,
but the practical effect was the same:
**PWA became unreliable on Safari.**



## 3. iPhone Now Uses WebClip Instead of Real PWA

As of 2026, when you “Add to Home Screen” on iPhone,
it behaves as a **WebClip**, not a real PWA.

### What this means:

- It opens in Safari (not a true app view)
- No real offline capability
- Most manifest.json settings are ignored

 	
 	
 	

In short, the “app-like” features of PWAs are mostly gone on iOS.



## 4. It’s Not a Bug — It’s the Intended Behavior

Many developers assume:

- “Something is broken”
- “I made a mistake in my setup”
- “It must be a cache issue”

 	
 	
 	

But in reality:

**This is how Safari is designed now.**

The issue is not your code —
it’s the platform’s limitation.



## 5. When PWAs Still “Partially Work”

PWAs are not completely unusable on Safari.
Some features still work under limited conditions:

- Basic caching (simple Service Worker usage)
- Lightweight display-only apps
- No reliance on advanced features (like push notifications)

 	
 	
 	

However, this is only **a small subset of PWA functionality**.



## 6. What Should You Do in 2026?

Here’s the practical conclusion:

- Do not design your site assuming full PWA support on iPhone
- Think in terms of WebClip, not PWA
- Build UX assuming a browser environment

 	
 	
 	

For services targeting iOS users,
**relying on PWA can be risky**.



## Summary

- Safari never fully supported PWAs
- PWA functionality weakened significantly after 2024
- iPhone now uses WebClip instead of real PWA
- “PWA not working” is expected behavior
- In 2026, WebClip-first design is safer

 	
 	
 	
 	
 	

PWAs are still powerful—but only in environments that support them properly.
Understanding these limitations is essential for modern web development.
