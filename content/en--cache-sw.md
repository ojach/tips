You update a website, but the old page keeps appearing. An installed home screen icon refuses to change. Clearing browser data unexpectedly signs you out.

These problems are often grouped together as caching issues. Yet the data involved, and the systems responsible for managing it, can be quite different.

Through offline experiments in PWA LAB and my work on OJapp, where home screen apps can be created without a Service Worker, I have come to value one distinction in particular: **the mechanism that launches a web app and the mechanism that stores its data should be considered separately.**

## What does the browser actually store?

Browser caching and web storage are not interchangeable. Here are the main mechanisms a website can use.

| Mechanism | Typical purpose |
| --- | --- |
| HTTP cache | Reduce network requests for HTML, CSS, and images |
| localStorage | Store settings and other values as strings |
| sessionStorage | Retain state during a tab's page session |
| IndexedDB | Store structured data |
| Cache API | Explicitly store requests and responses |
| Cookies | Identify sessions and share state with the server |

The browser manages its HTTP cache according to HTTP headers and other rules. LocalStorage, on the other hand, is a storage area that JavaScript can read and write. Caching an image and remembering a user's chosen theme color serve different purposes.

LocalStorage may be sufficient for small preferences. However, its operations are synchronous and its capacity is limited. A few megabytes is a useful rough expectation, not a guaranteed allowance. Applications should account for failed writes.

IndexedDB is an option for larger or more complex datasets. Neither mechanism is a permanent backup: users can delete stored data, and browser storage policies can affect its availability.

## How a Service Worker changes network behavior

A Service Worker is event-driven JavaScript that runs separately from a page. Registered in a secure context such as HTTPS, it can handle network requests from controlled pages through the `fetch` event.

Ordinarily, the browser retrieves responses using its HTTP cache and the network. A controlling Service Worker can introduce application-specific decisions into that process. It can return a previously stored response or provide a fallback page when a network request fails.

Registration alone does not make every page available offline. A caching strategy requires decisions about what to store, when to use it, and when to remove it. The Cache API itself is not exclusive to Service Workers.

### Choose a caching strategy that fits the content

| Strategy | Behavior | Suitable for |
| --- | --- | --- |
| Cache First | Prefer a stored response | Versioned images and stylesheets |
| Network First | Prefer the network, falling back to stored data | Frequently updated articles and feeds |
| Stale While Revalidate | Return stored data immediately and refresh it in the background | Content that tolerates some staleness |

In PWA LAB, I have explored the differences between strategies such as Cache First and Network First. Cache First is useful offline, but poor update management can leave users looking at outdated content indefinitely. I would avoid applying it to everything simply because it is fast.

Personal information behind a login and payment pages should not be cached indiscriminately like public images. Cache selection, account switching, and logout behavior all need consideration.

## How much offline support do you actually need?

Offline support does not have to mean making every feature work without a connection. Reading an article, preserving an unfinished form, and displaying a useful connection-error message are different requirements.

When experimenting with Service Worker placement in PWA LAB, I was able to open LAB pages offline using `/lab/sw.js`. In another test, a worker located deeper at `/lab/app/{token}/sw.js` did not let me open the parent `/lab` page offline in the same way.

A Service Worker's default scope is the directory containing its script. It cannot normally control parent pages. The server can permit a broader scope through the `Service-Worker-Allowed` header, but this is separate from the manifest's `scope`. Storing a URL in Cache Storage is also different from controlling navigation to that URL.

These experiments made me favor choosing control boundaries around the features or directories that actually need them, rather than automatically covering an entire website with one worker. Separate scopes do not automatically isolate Cache Storage within the same origin, however. Cache names and cleanup routines still matter.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption>
</figure>
<div class="balloon__text balloon__text-right">
💡 Manifest scope and Service Worker scope are two different things!
</div>
</div>

## Why old pages and icons survive an update

When an update does not appear, identify what is actually outdated. Is it the HTML, a stylesheet, an image, a response returned by a Service Worker, or an icon already installed on the home screen?

For HTTP caching, headers such as `Cache-Control` and `ETag` matter. With Service Workers, inspect Cache Storage and check whether a newly installed worker is waiting to activate. An older worker may still control open pages. Versioning cache names and removing obsolete caches are also important.

Installed icons are another matter. Seeing a new image in the browser does not guarantee that an existing home screen icon will change at the same time. My own icon-update experiments highlighted the need to distinguish the image served by a website from the icon registered on a device.

I sometimes describe these less visible retained states as a “shadow cache.” That is a descriptive term, not a standardized type of Cache API storage. Until the cause has been identified, blaming every stale icon on a Service Worker is a mistake.

## Clearing the cache is not the same as deleting site data

When clearing data in Safari or Chrome, check exactly what the operation removes. Deleting cached images and files is different from removing cookies and web storage. The latter may erase login sessions and saved preferences.

Removing a web app from the home screen is not necessarily equivalent to deleting all its website data, either. Storage and deletion behavior between Safari and installed web apps can vary with the OS, browser, and installation method. Do not assume that their storage is always shared or always completely isolated.

During development, I would first compare ordinary browser navigation with a home screen launch, then inspect network requests, Service Worker registrations, and stored data using developer tools. Preserving important data before clearing the affected storage makes troubleshooting easier.

## Does a PWA really need a Service Worker?

OJapp dynamically generates a Web App Manifest using JavaScript, turning a page, directory, or entire site into a home screen entry. A custom Service Worker is not a prerequisite for its home screen installation and standalone presentation approach.

Supporting browsers can provide home screen installation and app-like launching without a Service Worker. Installation UI requirements vary by browser and installation method, however. A manifest alone does not implement custom offline behavior.

This is where I see an important design decision. If the goal is to deliver current online information, first consider whether ordinary web requests and a manifest are enough. If a feature must survive a lost connection, design the Service Worker and storage behavior around that requirement.

## Start with why you need to store something

Caching reduces network traffic, storage preserves state, and Service Workers can change how requests are handled. A manifest describes an app's name, icons, launch behavior, and other presentation details. Each has a distinct role.

When building PWAs, I prefer choosing the features I need and keeping their behavior understandable over including every available technology. Design offline support where it matters. Avoid introducing additional caches where they serve no purpose.

What matters is that users can access the information they expect when they launch an app from their home screen. Deciding which storage mechanisms support that experience is where cache design should begin.
