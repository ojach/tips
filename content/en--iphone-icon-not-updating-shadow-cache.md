<article>

# Why iPhone Home Screen Icons Don’t Update: The Hidden “Shadow Cache” in Safari Explained

“Why isn’t my new icon showing?”
“I replaced the image, but the home screen still shows the old one…”
If you’ve added a website to your iPhone’s home screen and the icon won’t update,
you’ve run into one of Safari’s most confusing behaviors.

The real cause is a little-known system inside iOS:
**Safari’s hidden “Shadow Cache.”**

In this guide, we’ll break down the entire mechanism—
**how iOS stores icons, why they don’t refresh, how to force updates,
and how tools like OJapp avoid the problem entirely.**



## The Short Answer: iOS Stores Icons in a Separate Hidden Cache

When a user adds a website to their home screen (a Web Clip),
iOS stores the icon in a dedicated cache **separate from normal browser cache.**

This “shadow cache” has several unique characteristics:

- **Clearing Safari cache does NOT remove it**
- **Reloading the webpage does not trigger an update**
- **If the icon URL is the same, the old image will always be used**
- **The cache can stay for days or longer**

 	
 	
 	
 	

In other words:
**once iOS saves an icon, it treats it like an app icon — stable and persistent.**



## How iOS Stores Web Clip Icons

When Safari detects a Web Clip request (via `apple-touch-icon`
or `manifest.json`), it stores:

- The rendered icon image
- The path (URL) of the icon
- Meta information about the bookmark

 	
 	
 	

Once this happens, iOS will continue using the cached file
**even if the server image changes.**

This is why “uploading a new icon” rarely works on iPhone.



## Why Apple Designed It This Way

Apple treats home screen bookmarks like mini-apps.
If icons changed unexpectedly, problems could occur:

- Users might think an app was replaced
- Icons could break mid-update
- Malicious sites could swap icons unexpectedly

 	
 	
 	

To prevent this, iOS applies an “App-like persistence policy,”
which includes the hidden shadow cache.



## Symptoms of Shadow Cache Issues

- The icon never updates, even after replacing the file
- Safari cache clearing does nothing
- Re-adding the Web Clip still uses the old image
- Even changing servers/CDNs can fail if URLs look similar

 	
 	
 	
 	

During OJapp development, this behavior caused countless hours of debugging.



## How to FORCE an Icon Update (Guaranteed Methods)

### 1. Change the icon’s URL (the strongest method)

iOS identifies icons by URL.
**If the URL changes, iOS MUST fetch a new file.**

Examples:

```text
/icon.png  
/icon.png?v=2  
/icon-2026.png
```

This is the only 100% reliable method on iPhone.



### 2. Delete the existing Web Clip → Add again

This works, but requires user action — not ideal for public links.



### 3. Wait for iOS to purge the cache (not recommended)

iOS occasionally removes stale shadow cache entries,
but the timing is unpredictable and unreliable.



## How OJapp Solves This Automatically

OJapp avoids the shadow cache problem through a simple but powerful approach:

**Every generated icon uses a unique file path.**

Example:

```text
https://cdn.ojapp.app/icon/7f3a9.png
https://cdn.ojapp.app/icon/bc22e.png
```

This prevents iOS from reusing old cached icons and ensures
**users always see the newest icon instantly.**



## Technical Notes: When Shadow Cache Almost Always Occurs

- Overwriting `apple-touch-icon.png` with the same filename
- CDN caching old versions of files
- Redirecting icon URLs (iOS may treat them as identical)
- Using query parameters inconsistently

 	
 	
 	
 	

The worst-case scenario is
**CDN caching × iOS shadow cache = double-layered stale icons。**
This was a major pain point during early OJapp development.



## Summary: The Real Villain Is the “Shadow Cache”

- iPhone stores Web Clip icons in a hidden persistent cache
- Normal Safari cache clearing does nothing
- Icons with identical URLs are never re-fetched
- Changing the URL forces an update instantly
- OJapp solves the issue by generating unique icon paths

 	
 	
 	
 	
 	

Once you understand this mechanism,
**you can fully control how iPhone updates your icons.**

</article>
