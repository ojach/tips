“Why is my PWA not working on iPhone?”
If you’re asking this, you’re not alone. Since 2024, many developers and users have run into this exact issue.

Here’s the truth:

**On iOS, PWAs often don’t work as expected due to Safari limitations.**

In this guide, we’ll break down the real causes—and show you fixes you can try immediately.



## 1. Safari Limitations (The Main Cause)

On iPhone, all browsers use Safari’s engine (WebKit).
This means PWA behavior is entirely controlled by Safari.

After 2024, Apple restricted several PWA features:

- Unstable Service Worker behavior
- Incomplete manifest support
- Broken standalone (app-like) display

 	
 	
 	

So even if your setup is correct,
**PWA may still not behave properly.**



## 2. Cache Issues (Old Version Still Showing)

PWAs rely heavily on caching.
Sometimes, the problem is simply that the old version is still being served.

Common symptoms:

- Icon doesn’t update
- UI changes don’t appear
- Old content keeps showing

 	
 	
 	

This is not a bug—
**it’s how caching is designed to work.**



## 3. Service Worker Not Updating

Service Workers don’t update automatically in all cases.

This can lead to:

- Old Service Worker still controlling the app
- New code not being applied
- Inconsistent behavior across sessions

 	
 	
 	

This is one of the most common reasons PWAs “break.”



## 4. PWA Requirements Not Fully Met

Sometimes the issue is simply that the app is not recognized as a proper PWA.

- No HTTPS
- Incomplete manifest.json
- Service Worker not registered

 	
 	
 	

In this case, it behaves like a normal website—not a PWA.



## Fixes You Can Try Right Now

### 1. Clear Safari Cache

Go to:
Settings → Safari → Advanced → Website Data → Remove site data

This forces Safari to load the latest version.

### 2. Remove and Re-add the Home Screen Icon

Delete the app from the home screen, then add it again.
This often resolves outdated cache issues.

### 3. Update Your Service Worker

Make sure your Service Worker is properly updating:

- Use versioned cache names
- Review `skipWaiting` usage
- Ensure old caches are deleted

 	
 	
 	

### 4. Test in a Clean Environment

Try opening your site in private mode or another device to verify if caching is the issue.

### 5. Design for WebClip (iOS Reality)

In 2026, the safest approach is:

**Design your iOS experience as a WebClip, not a full PWA.**



## Summary

- Safari limitations are the main cause
- Cache often prevents updates from appearing
- Service Worker updates are critical
- Some apps are not fully recognized as PWAs
- WebClip-first design is safer on iPhone

 	
 	
 	
 	
 	

The key point is this:

**Your PWA is not necessarily broken—it’s limited by iOS.**

Understanding these limitations will help you design more stable and reliable web experiences.
