When you build web services or run a blog as an independent developer, figuring out how to reach people can sometimes be harder than building the product itself.

SEO matters if you want people to find your work through search. But if search becomes the only thing you think about when writing, you can start to lose sight of why you wanted your own website in the first place. I've thought about that balance many times while building OJapp and Petal and running Tips.

What matters to me now is **having a website I can manage myself, documenting what I've actually tried, and publishing it in a way that helps readers find their answers.**

This page brings together my thoughts on three areas: blogging infrastructure, SEO and AIO, and readability on mobile devices. The linked articles cover the individual implementations and experiments in more detail.

## 1. Build a blogging platform you can keep updating yourself

If you want to publish more articles that people can discover through search, you first need an environment that makes publishing manageable.

Even a fast website won't help you write regularly if every update involves tedious work. On the other hand, an easy-to-manage platform can become frustrating when you want to improve your site's appearance or structure but cannot freely change it.

That's why I moved away from WordPress and built my own static site generator, OJapp Blog Kit. I wasn't trying to recreate everything WordPress could do. **I wanted to minimize the work involved in everything other than writing articles.**

- [Why I Left WordPress and Built My Own Blog Engine, OJapp Blog Kit](https://tips.ojapp.app/en/why-i-built-ojapp-blog-kit/) — Why I decided to build my own blogging platform instead of continuing to use an existing one.

A blog alone doesn't cover all your development needs, of course. Running services like OJapp and Petal also requires hosting, data storage, a backend, and analytics.

I think the important thing is to **choose what your service actually needs today and build a system you can maintain and modify yourself later**, rather than adopting every popular technology.

- [Behind OJapp's Tech Stack: What I Settled on After Three Months of Indie Development (2026)](https://tips.ojapp.app/ojapp-tech-stack-2026/) (Japanese) — The technologies I've used and the reasons behind those choices.
- [Petal Development Log: Why I Moved from GitHub Pages to Workers and R2](https://tips.ojapp.app/petal-worker-r2/) (Japanese) — A record of changing the infrastructure behind a live service.

SEO isn't determined by the words in your articles alone. Being able to keep improving your website is also an important foundation for running it over the long term.

## 2. What matters in SEO and AIO

Now that AI can present answers directly in search results, simply assuming that higher rankings will bring more readers is no longer enough.

Still, I don't think SEO and AIO need to be treated as entirely separate disciplines. Both start with answering readers' questions properly and showing the evidence behind those answers.

### Make the answer easy to find

People arriving from search want an answer to their question, not a long introduction from the author. No matter how much information an article contains, it's difficult to use if readers have to scroll repeatedly just to find the conclusion.

At Tips, I put a short summary at the beginning of each article so readers can quickly find the answer. Those who want more detail can keep reading, while those who only need the answer can get what they came for right there. That's the structure I'm aiming for.

- [What Is AIO? How It Differs from SEO and How to Write Articles AI Can Cite](https://tips.ojapp.app/en/what-is-aio-seo-difference/) — How I approach SEO and AI-powered search.

### Think about what to write, rather than how to write with AI

AI can save time when polishing explanations or organizing headings. But relying on that alone often produces content that looks much like everything else.

The results of your own experiments, unexpected behavior, and conditions you only discover after something fails — that's where I think an indie development blog can build lasting value.

I've spent time not only reading PWA specifications but also installing PWAs on actual devices to see how they behave. Clearly distinguishing official documentation from what I've observed in real-device testing also helps make my articles more trustworthy.

- [Why AI-Generated SEO Articles Don’t Rank — And How to Fix It (2026 Edition)](https://tips.ojapp.app/en/ai-seo-2/) — How to give articles original value while using AI as part of the writing process.

### Experiment with how readers discover your site through search

Alongside writing articles, I've been experimenting with ways to help readers discover them. Adding support for Google's Preferred Sources is one example.

This isn't a feature designed to get your articles cited by AI. It's part of a system that lets users choose their preferred sources of information. I treat it as a separate experiment in creating another connection with search, rather than confusing it with SEO or AIO.

- [What Are Google Preferred Sources? I Added the Button to My WordPress Blog](https://tips.ojapp.app/en/google-preferred-sources-button-2/) — A record of actually adding the button to my blog.

## 3. Make answers easy to find on mobile

An article that looks perfectly readable while you're writing it can feel quite different when you open it on a phone.

A paragraph that takes up only a few lines on a desktop can fill most of a smartphone screen. Depending on where headings and links are placed, readers might give up before reaching the information they came for.

That's why I care about not only what an article says, but also **the order in which the information is presented.**

### Review your writing in the environment where people read it

Writing articles on a smartphone makes it easier to notice paragraph lengths and where line breaks should go. Writing on a phone doesn't automatically improve search rankings, of course. The value is in reviewing your content on a screen similar to the one your readers use.

- [Why Writing Blog Posts on Your Phone Is Surprisingly Great for SEO (2026 Edition)](https://tips.ojapp.app/en/mobile-blog-seo-2/) — What writing on a smartphone can teach us about readability.

### Think about scrolling and exits as reader behavior

Fast scrolling doesn't necessarily mean someone isn't reading. They might simply be looking for a particular heading. Or they might have found the answer at the beginning and left satisfied.

Rather than drawing conclusions from a single metric, it's important to consider the structure of the article alongside what the reader is trying to accomplish.

- [Scroll Speed & SEO: How Many Seconds Until Readers Leave? (2026 Guide)](https://tips.ojapp.app/en/scroll-seo-2/) — Exploring the relationship between scrolling and reading behavior.
- [When Mobile Readers Leave: A Clear Breakdown of Real Drop-Off Moments](https://tips.ojapp.app/en/mobile-drop-off-moments/) — A closer look at the situations in which mobile readers leave a page.

Focusing too much on SEO can also make an article harder to read, especially when you repeat keywords or add links where they don't naturally belong. I think internal links should be placed **where they help readers move on to the next thing they want to know**, rather than simply increasing the number of links.

- [Top 10 SEO Mistakes Beginners Make (and Why They Hurt Your Rankings)](https://tips.ojapp.app/en/seo-beginner-mistakes/) — A chance to reconsider SEO practices that may do more harm than good despite your best intentions.

## Final thoughts: Build a record of your own experience on your own website

The strength of an indie development blog is that you can change both the system behind the website and the content you publish according to your own judgment.

I value the ongoing process of building an easy-to-update platform, writing about things I've actually tested, and gradually improving the way readers find their answers.

Even as SEO and AI-powered search evolve, the knowledge gained through development remains valuable. Documenting your failures as well as your successes might help someone who runs into the same problem later.

This page is an entry point to the ongoing record of indie development, SEO, and AIO here at OJapp Tips. As I run new experiments and learn more from operating my own services, I'll keep organizing those discoveries alongside the relevant articles.
