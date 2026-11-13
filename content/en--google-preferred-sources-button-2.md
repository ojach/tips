Google Search has a feature called **Preferred Sources**.</p>

It allows users to choose websites they trust or enjoy reading, making content from those sources more likely to appear prominently in their Google Search experience.

In August 2026, Google also published a way for website owners to add an interactive **Preferred Sources button** directly to their own sites.

I added it to OJapp Tips as well. Interestingly, the standard button did not display correctly on my WordPress site, so I eventually switched to Google's official custom button implementation.

## What are Google Preferred Sources?

Preferred Sources lets users tell Google, "I want to see more content from this source."

When a website is selected as a Preferred Source, Google can give content from that source more prominence for that particular user.

This is different from a traditional SEO technique designed to improve rankings for everyone.

A better way to think about it is as a mechanism for **making it easier to reconnect with readers who already know and trust your site**.

## Google added a button websites can use in August 2026

According to the Google Search Central update history, Google added a new custom, interactive Preferred Sources button on August 20, 2026.

This means website owners can now create a direct path for readers to add their site as a Preferred Source without first searching for it manually in Google's source preferences interface.

## I first tried the standard Preferred Sources button

The simplest implementation shown in Google's documentation uses a JavaScript library and a dedicated HTML element.

First, load the Preferred Sources JavaScript library:

```html
<script async src="https://news.google.com/swg/js/v1/publisher.js"></script>
```

Then place this element where you want the button to appear:

```html
<div google-add-preferred-source-btn></div>
```

The Google JavaScript should detect this element and automatically render the Preferred Sources button.

You can also specify options such as the theme and language:

```html
<div
  google-add-preferred-source-btn
  data-theme="light"
  data-lang="en">
</div>
```

## But the standard button did not appear on OJapp Tips

I initially used the standard implementation on OJapp Tips.

The surrounding section appeared correctly, but the actual Google button was missing.

Adding `data-theme` and `data-lang` did not change the result.

I also checked Google's Preferred Sources interface, and `tips.ojapp.app` was correctly recognized and could be selected as a Preferred Source.

So the site itself was eligible. The problem was with rendering the standard button on my site.

Instead of continuing to fight with the automatic implementation, I switched to the **custom UI method provided in Google's documentation**.

## You can create your own Preferred Sources button

Google also provides a manual control mode that lets you use your own button instead of relying on the automatically rendered one.

First, add `preferred-sources-control="manual"` when loading the library:

```html
<script
  async
  preferred-sources-control="manual"
  src="https://news.google.com/swg/js/v1/publisher.js">
</script>
```

This lets you control the Preferred Sources interaction yourself.

You can then create your own button and call `preferredSource.addPreferredSource()` when it is clicked.

```html
<button id="myButton">
  Prefer this source on Google
</button>

<script>
(self.PREFERRED_SOURCE = self.PREFERRED_SOURCE || []).push(
  function(preferredSource) {

    preferredSource.init({
      theme: "light",
      lang: "en"
    });

    const button = document.querySelector("#myButton");

    button.addEventListener("click", function() {
      preferredSource.addPreferredSource();
    });
  }
);
</script>
```

With this approach, the button's text and design can be controlled by the website itself.

After switching OJapp Tips to this method, clicking the button successfully opened Google's Preferred Sources screen.

## Automatically adding it to the end of WordPress posts

I decided to display the Preferred Sources section automatically at the end of every article on OJapp Tips.

In WordPress, this can be done with the `the_content` filter, so there is no need to manually add the button to every post.

```html
function ojapp_add_preferred_source_button($content) {

  if (
    !is_singular('post') ||
    !in_the_loop() ||
    !is_main_query()
  ) {
    return $content;
  }

  $preferred_source = '
  <div class="ojapp-preferred-source">
    <p><strong>
      Add OJapp Tips as a preferred source on Google
    </strong></p>

    <p>
      Make it easier to find OJapp Tips articles in Google Search.
    </p>

    <button
      type="button"
      class="ojapp-preferred-source-btn">
      Prefer OJapp Tips on Google
    </button>
  </div>
  ';

  return $content . $preferred_source;
}

add_filter(
  'the_content',
  'ojapp_add_preferred_source_button',
  99
);
```

This automatically adds the Preferred Sources section to the end of each WordPress post.

## This feels more like a "next entry point" than traditional SEO

What I find interesting about Preferred Sources is that it feels slightly different from traditional SEO.

SEO is generally about helping people who do not know your site discover it through search.

Preferred Sources works in the opposite direction. It creates another connection with **people who have already discovered your site and want to see it again**.

In that sense, it reminds me a little of putting a website on the home screen with a PWA.

[A PWA can turn a website into an entry point that users can launch directly from their home screen.](https://tips.ojapp.app/en/what-is-pwa/)

Preferred Sources creates another entry point inside Google Search.

The locations are different, but the underlying idea is similar: don't let a useful visit end as a one-time interaction.

## If the standard button does not work, try the custom implementation

One useful thing I learned while implementing this is that a failure of the standard automatically rendered button does not mean you have to give up on the feature.

Google also provides an official way to trigger the Preferred Sources interface from your own custom UI.

For an existing WordPress site, this may actually be more convenient because you can make the button match your site's design instead of depending on the default rendering.

## Is the Preferred Sources button worth adding to a blog?

Adding a Preferred Sources button does not mean your Google rankings will suddenly increase.

But it gives readers a new way to tell Google, "I want to see this source again."

The implementation is relatively small, and the custom approach also gives you control over the button's appearance.

For blogs and specialist websites that continuously publish content around a particular topic, I think it is worth experimenting with as a new call to action at the end of an article.

I have now added it across OJapp Tips, so I'll keep an eye on how useful it becomes over time.
