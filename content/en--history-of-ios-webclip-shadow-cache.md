<article><!-- Image group for visual context -->

# The History of iOS WebClip｜How the Home Screen Icon Feature Evolved Over 15+ Years

Today, adding a website to the iPhone home screen feels completely normal.
But this feature—called **WebClip**—was not part of the original iPhone, nor was it designed the way it behaves today.

Over time, WebClip evolved dramatically:
from simple screenshot-based shortcuts to a complex system involving
**apple-touch-icon, manifest icons, PWA features, and the infamous Shadow Cache**.

This article explains:

- How WebClip was born
- How it evolved through each major iOS era
- Why the Shadow Cache exists today
- Why icons became so difficult to update

 	
 	
 	
 	

No English article currently covers this history in depth—
so this is the world’s most complete explanation.



## 2007: iPhone OS 1 — No WebClip Yet

The very first iPhone (iPhone OS 1.0) did **not** have a way to add websites to the home screen.

Users could only save bookmarks inside Safari.
The concept of a “web icon” sitting beside app icons did not yet exist.



## 2008: iPhone OS 1.1.3 — WebClip Is Born

Apple introduced **Add to Home Screen** in iPhone OS 1.1.3 (2008).
This was the birth of WebClip.

Its early characteristics were very simple:

- The icon was automatically generated from a screenshot
- The WebClip behaved like an app shortcut
- No custom icons yet—no `apple-touch-icon`

 	
 	
 	

At this point, **there was no Shadow Cache problem**
because WebClip did not load or store developer-provided icons.



## 2008: iPhone OS 2.0 — The Birth of apple-touch-icon

Alongside the debut of the App Store, Apple introduced:

<strong>`apple-touch-icon.png`</strong>

This changed everything:

- Websites could now provide their own icons
- WebClip became visually similar to native apps
- iOS needed a dedicated storage area for icon files

 	
 	
 	

This dedicated icon storage is the ancestor of today’s
**Shadow Cache**.



## 2010–2012: Retina Displays & Icon Size Explosion

With the introduction of Retina (iPhone 4),
icon sizes multiplied rapidly:

- 57×57 → 114×114
- 72×72 (iPad)
- 144×144 (Retina iPad)

 	
 	
 	

This forced iOS to cache multiple icon variants simultaneously.

Here is where we first see reports of:
**“Old icons continuing to appear even after replacement.”**



## 2013: iOS 7 — Flat Design & Automatic Icon Processing

iOS 7 was a massive redesign and also a turning point for WebClip.

Safari began:

- Auto-rounding icons
- Auto-applying shadows
- Auto-generating final PNGs inside the system

 	
 	
 	

At this stage, the icon creation flow changed to:

1. Download developer-provided icon
2. **iOS processes it into a final “app-like” icon**
3. Store processed PNG in a persistent cache

 	
 	
 	

This is the true origin of the modern Shadow Cache.



## 2015–2020: PWA Support Makes Things Even More Complex

As Safari gradually adopted PWA (Progressive Web App) features:

- manifest.json icons
- apple-touch-icon fallback logic
- Stand-alone mode

 	
 	
 	

Safari’s icon-selection logic became significantly more complex.

This era introduced inconsistent behavior such as:

- Sometimes manifest icons override apple-touch-icon
- Sometimes Safari chooses the closest size automatically
- Sometimes cached icons refuse to update for days

 	
 	
 	

Developers globally began noticing “icon update issues” during this time.



## 2020–2024: The Shadow Cache Becomes Aggressive

From iOS 14 onward, Apple significantly strengthened icon persistence.

Reasons include:

- Security — prevent phishing by icon swapping
- Consistency — app icons should not change unexpectedly
- Stability — reduce visual glitches during updates

 	
 	
 	

As a result:
**“Same URL = Always same icon”**
became a strict rule.

This is why updating icons on iOS became notoriously difficult.



## 2026: Shadow Cache Is Now a Formal iOS Behavior

As of 2026, the Shadow Cache is effectively a
**permanent, intentional part of WebClip design.**

Characteristics:

- Not cleared by Safari cache reset
- Not updated unless the icon URL changes
- Each WebClip maintains its own persistent storage
- Designed to protect UI consistency and security

 	
 	
 	
 	

It is **not a bug** — it is an architectural choice.



## Why the Shadow Cache Exists (Core Reasons)

### ① iOS treats WebClips like apps

App icons shouldn’t randomly change.
So WebClip icons are also treated as persistent objects.

### ② Allowing remote icon updates is a security risk

If websites could freely replace icons,
malicious actors could imitate other apps.

Thus, iOS avoids re-fetching icons unless the URL changes.



## Summary: WebClip Is a Unique Product of iOS History

- Born in 2008 as a simple screenshot shortcut
- Evolved with apple-touch-icon and Retina displays
- Became intertwined with PWA features
- Shadow Cache emerged as a UI/UX + security solution
- Modern behavior is intentionally persistent

 	
 	
 	
 	
 	

Understanding this history makes WebClip behavior predictable—
and explains why icon updates are difficult but not impossible.

</article>
