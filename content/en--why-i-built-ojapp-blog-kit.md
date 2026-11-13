I moved OJapp Tips, my technical blog, from WordPress to a static blog engine I built myself. It's called **OJapp Blog Kit**.

The basic workflow is familiar: write Markdown, build the site, and publish the generated files. What changed for me wasn't the technology itself. It was how much simpler the day-to-day work of maintaining a blog could become.

I wanted a place where I could concentrate on writing and testing ideas, while keeping everything I publish on a website I control.

## Why I wanted to leave WordPress

OJapp Tips is where I document PWA experiments, home screen behavior, and the small surprises I find while building web tools. Testing a feature, taking screenshots, inspecting code, and writing down what happened are the enjoyable parts.

The publishing steps gradually became the annoying part. I had to open the admin interface, paste HTML, check the result, and think about how the theme and plugins might affect the page. Each adjustment was small, but the friction accumulated as the archive grew.

I also found myself dealing with details such as duplicated heading structures, ad placement, and article-specific layout changes. I wanted to spend that time on the next experiment instead.

Most Tips articles are text, code, images, and the occasional table. I don't need a complicated editing interface to publish them. I need a dependable way to turn those files into pages.

## I wanted my own version of the Zenn or Qiita experience

Developer platforms such as Zenn and Qiita make Markdown writing comfortable. Code blocks are easy to handle, and the writing workflow stays focused.

But I also wanted my articles to live on my own domain. Over time, articles collect links, search traffic, and a recognizable identity. I want to manage that growing archive myself, including its URLs, design, and publishing workflow.

That led to a simple goal: **combine the convenience of Markdown publishing with the freedom of running my own website**.

OJapp Blog Kit grew from that idea. I wasn't trying to build an enormous content management system. I wanted a small engine that solved the specific problems I was running into.

## How Blog Kit works

The article body lives in a Markdown file. Article metadata—titles, permalinks, categories, descriptions, and summaries—lives in `articles.json`. Site-wide settings, including the name and accent color, live in `site.json`.

The project is organized roughly like this:

```text
content/        Markdown articles
public/images/  Article images
articles.json   Article metadata
site.json       Site-wide settings
scripts/        Build scripts
dist/           Generated site files
```

A Node.js build generates the HTML pages and supporting assets in `dist/`.

```bash
npm install
npm run build
```

In my workflow, I edit files in VS Code and use GitHub and Cloudflare Pages for publishing. The production Tips site runs on Cloudflare Pages.

One of my favorite details is that the content remains ordinary files on my computer. I can open them in any suitable editor, search across the entire archive, or make bulk changes without navigating an admin interface.

## Markdown makes sense for an AI-assisted writing workflow

I increasingly use AI to help structure drafts, translate articles, and prepare summaries. Passing a complete Markdown file back and forth is more convenient than transferring fragments through a browser-based editor.

I can keep Japanese and English versions in separate files, then manage their metadata together. When a paragraph needs revision, I open the file in VS Code and edit it directly.

The actual observations and technical judgments still have to come from real work. Tips is built around experiments I've run and opinions I've formed from them. AI can help organize and translate that material; it can't replace the experiments.

I also separate the short description under an article title from a more substantial summary that gives readers the answer in about a minute. That summary isn't just the first paragraph copied into another field. It should explain the result, the reason, and any important limitations.

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">Appin</figcaption>
</figure>
<div class="balloon__text balloon__text-right">👻 Write in Markdown, publish as HTML. Keeping the writing format separate from the final page makes things much easier!</div>
</div>

## Migrating the archive was less glamorous than building the engine

Writing a new static site generator is fun. Moving an existing archive is a different kind of work.

Tips already had more than 200 articles across Japanese and English when I migrated it. Moving the body text was only one part of the job. I also had to check permalinks, translation relationships, images, metadata, and internal links.

I ran into a table-of-contents bug where HTML entities appeared as literal text in headings. Seeing strings such as `&quot;` in the navigation was not the look I had in mind. I traced the escaping issue and fixed the decoding in the TOC generation step.

Deployments also gave me trouble. At one point, Wrangler would exit without uploading the files, even though the command appeared to start normally. After cleaning temporary files and testing configuration changes, deployments started working again. I can't isolate which change actually fixed it, so I won't pretend I can.

Those problems are part of running a tool you built yourself. Sometimes you have to dig into the implementation. The advantage is that the files and the build process are under your control.

## The biggest improvement is operational simplicity

The published site consists of generated static files. Requests don't need WordPress PHP to assemble an article on the server.

After the migration, I also saw strong Lighthouse results. But the change I appreciate most is less about a score and more about the number of things I need to touch to publish an article.

I write the content, update its metadata, and run the build. If I want to change the layout, I edit the relevant files. I know where the work happens, and I don't have to hunt through several admin screens to find it.

There is a trade-off in the workflow: editing a file does not instantly update the live website. The build and deployment steps still have to run. I'm comfortable with that because I designed the process around the way I actually work.

## A blog engine for keeping your work on your own site

It's tempting to add features to every tool you build. An admin dashboard, a custom editor, scheduling, analytics—there is always something else that could go in.

I wanted Blog Kit to stay focused. Write the article, manage the necessary metadata, generate the site, and publish it. The fewer steps between an idea and a finished page, the better.

Ownership matters just as much. I want to choose the URLs, control the design, and keep the archive on my own domain. If I'm going to keep writing for years, that independence is valuable.

Migrating Tips gave Blog Kit its first serious production test: more than 200 real articles, two languages, and all the small problems that appear only when a tool meets an existing site.

**The goal is to make everything around writing as small as possible.**

That's why I built OJapp Blog Kit. I'd rather spend my time investigating PWA behavior and documenting new discoveries than managing the machinery around the articles.
