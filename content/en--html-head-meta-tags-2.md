When you start writing HTML, one of the first sections you encounter is the `<head>`.</p>

You can put all kinds of things there: `title`, `meta` tags, favicons, Open Graph tags, and more.

But when you actually build a website yourself, it is easy to end up asking, **“What am I actually supposed to put in the head?”**

It gets even more confusing if you copy an old HTML template, because some of them still include a pile of meta tags that are barely useful today.

So in this article, I will go through the **head elements I would actually include when building a new website today**, with examples you can copy and adapt.

## A practical head template to start with

Before going through each tag, here is a basic example.

```html
<head>
  <meta charset="UTF-8">

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <title>Page Title</title>

  <meta name="description"
        content="A short description of this page">

  <link rel="canonical"
        href="https://example.com/page/">

  <meta property="og:title"
        content="Page Title">

  <meta property="og:description"
        content="A short description of this page">

  <meta property="og:image"
        content="https://example.com/ogp.jpg">

  <meta property="og:url"
        content="https://example.com/page/">

  <meta property="og:type"
        content="website">

  <meta name="twitter:card"
        content="summary_large_image">

  <link rel="icon"
        href="/favicon.ico">
</head>
```

Of course, not every website needs every line shown here.

Use the parts that actually make sense for your site.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption></figure>

<div class='balloon__text balloon__text-right'>The head is not a place to collect every meta tag you can find. Start with the ones your page actually needs.</div>
</div>

## The basic settings worth adding first

### charset: define the character encoding

```html
<meta charset="UTF-8">
```

This tells the browser which character encoding the page uses.

For a new website today, `UTF-8` is the standard choice in most cases.

It is a good idea to place this near the top of the `<head>`, especially to avoid character encoding problems.

### viewport: essential for mobile layouts

```html
<meta name="viewport"
      content="width=device-width, initial-scale=1.0">
```

This tells the browser how the page should be sized and scaled on smartphones and other mobile devices.

If you are building a responsive website, you can basically treat this as a default setting.

Without it, a mobile browser may render the page more like a shrunken desktop layout.

### title: define the page title

```text
<title>Page Title</title>
```

The `title` element is used for the page title shown in places such as browser tabs.

It is also important for helping search engines understand what the page is about, so each page should have a title that reflects its actual content.

Using the exact same title such as “Official Website” on every page is usually less helpful than giving each page a clear, descriptive title.

### description: summarize the page

```html
<meta name="description"
      content="A short description of this page">
```

This meta tag describes the page.

Search engines may use it as the snippet shown in search results, although they are not required to display it exactly as written.

Like the page title, it is worth writing a description that matches the content of each individual page.

## If SEO matters, check your canonical URL

```html
<link rel="canonical"
      href="https://example.com/page/">
```

A canonical URL tells search engines which URL should be treated as the main version of a piece of content when similar or duplicate URLs can reach the same page.

For example, if query parameters create multiple URLs that display nearly identical content, a canonical URL can help clarify which URL should be treated as the primary one.

But that does not mean you should simply point every page to the home page.

In general, the canonical should point to the preferred URL for that specific content.

## If your pages are shared on social media, add Open Graph tags

Open Graph tags help control how a page appears when its URL is shared on social media or messaging services.

```html
<meta property="og:title"
      content="Page Title">

<meta property="og:description"
      content="A short description of this page">

<meta property="og:image"
      content="https://example.com/ogp.jpg">

<meta property="og:url"
      content="https://example.com/page/">

<meta property="og:type"
      content="website">
```

The `og:image` value is especially important because the image often has a major effect on how noticeable a shared link looks.

For a blog, for example, it is useful to set the featured image for each article rather than using the same image everywhere.

### For X and similar services, add a Twitter Card setting too

```html
<meta name="twitter:card"
      content="summary_large_image">
```

This is commonly used when you want a shared link to appear with a large image card.

Used alongside Open Graph metadata, it helps make shared URLs look more polished across social platforms.

## Do not forget the favicon

```html
<link rel="icon" href="/favicon.ico">
```

A favicon is the small site icon used in browser tabs, bookmarks, and other parts of the browser interface.

A website still works without one, but if you are publishing a real site, it is worth adding.

It may seem like a tiny detail, but tabs are much easier to distinguish when a recognizable icon is present.

## Be careful with “fossil” meta tags from old templates

This is where things get a little more interesting.

If you search for older HTML templates or inspect websites that were built years ago, you may find meta tags that are no longer useful for most modern websites.

Just because they used to appear in templates does not mean you need to copy them today.

### meta keywords

```html
<meta name="keywords"
      content="web development,HTML,SEO,website">
```

This used to be common in SEO-focused templates.

There was a time when developers would stuff a long list of target search terms into this tag.

Today, Google does not use `meta keywords` as a ranking signal for web search.

You do not need to spend time filling it with every keyword you want to rank for.

### revisit-after

```html
<meta name="revisit-after"
      content="7 days">
```

This tag was sometimes used with the expectation that it could tell search engines something like, “Come crawl this page again in seven days.”

Adding it does not make Googlebot visit according to the interval you specify.

You cannot control search engine crawl frequency this way, so there is little reason to add it to a new site.

### distribution

```html
<meta name="distribution"
      content="global">
```

This tag has appeared in older templates as a way of describing the intended distribution scope of content.

For a normal modern website, you generally do not need to add it.

### rating

```html
<meta name="rating"
      content="general">
```

You may also find this in older templates as a way of describing the intended audience or content rating.

Again, this is not something you need to add by default to the `<head>` of an ordinary website.

### generator is only useful when something actually needs it

```html
<meta name="generator"
      content="WordPress">
```

The `generator` meta tag is slightly different because it is not completely obsolete.

It can identify which software or tool generated the page.

However, it is not a required meta tag when building your own static website.

CMS platforms may output it automatically, so there is usually no reason to manually add it just because you think every head section needs one.

## More meta tags do not automatically make a better head

Once you start learning about the `<head>`, it is easy to discover dozens of tags and feel tempted to add all of them.

But the head is not a collection of settings to complete.

**You only need to provide the information your page actually uses.**

A good basic starting point is:

- charset
- viewport
- title
- description

Then add things such as canonical URLs, Open Graph metadata, and a favicon depending on the site.

That is usually much easier to understand than blindly copying a huge template.

## If you want home screen support, you can also add a Web App Manifest

At this point, the `<head>` is already in good shape for a normal website.

But if you are already editing the head, there is one more useful element worth knowing about:

```html
<link rel="manifest"
      href="/manifest.json">
```

This loads a Web App Manifest.

A Manifest can define the name, icon, launch URL, display mode, and other information used when a website is added to a smartphone home screen.

If you are new to the concept, [What Is a PWA? A Simple Guide to How Websites Become Apps on Smartphones](https://tips.ojapp.app/en/what-is-pwa-2/) explains the basics.

And if you do not need a full offline-first application, PWA home screen support can start much smaller than many tutorials make it seem. You can begin with only the parts you actually need.

## When you build a website, review the head too

The visible content lives in the `<body>`, so it is easy to create a head template once and then ignore it for years.

But the `<head>` contains important information used outside the visible page: character encoding, mobile layout behavior, search results, social sharing, favicons, and more.

At the same time, old templates can quietly keep obsolete meta tags around long after they stopped being useful.

When creating a new website, instead of copying an old head section line for line, it is worth asking one simple question:

**“What is this line actually doing today?”**

If you can answer that for every important tag in your head, you are probably in a much better place than a template with twice as many lines.
