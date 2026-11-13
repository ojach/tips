Google検索に「Preferred Sources（優先するニュース提供元）」という機能があります。</p>

ユーザーが気に入ったWebサイトをPreferred Sourcesへ追加すると、そのサイトの記事をGoogle検索で見つけやすくするための仕組みです。

そして2026年8月、GoogleはWebサイト側からPreferred Sourcesへ追加できる**インタラクティブなボタンの実装方法**を公開しました。

実際にOJapp Tipsにも設置してみたところ、標準ボタンではうまく表示されないケースがあり、最終的にはGoogle公式が用意しているカスタムボタン方式で実装しました。

## Preferred Sourcesとは？

Preferred Sourcesは、ユーザーが「このサイトの記事を優先的に見たい」とGoogleへ指定できる機能です。

Preferred Sourceとして登録されたサイトは、そのユーザーのGoogle検索上で優先する情報源として扱われます。

検索順位そのものを上げるSEO施策というより、**一度サイトを気に入ってくれた読者と、Google検索上でも再接触しやすくする仕組み**と考えると分かりやすいです。

## 2026年8月にWebサイトへボタンを設置できるようになった

Google Search Centralの更新履歴では、2026年8月20日にPreferred Sources用の新しいカスタム・インタラクティブボタンが追加されています。

サイト運営者側から、読者に自分のサイトをPreferred Sourceとして追加してもらう導線を作れるようになりました。

## まずは標準ボタンを設置してみた

Google公式で最も簡単な実装として紹介されているのが、JavaScriptと専用のdiv要素を使う方法です。

まず、ページのhead内などにPreferred Sourcesのライブラリを読み込みます。

```html
<script async src="https://news.google.com/swg/js/v1/publisher.js"></script>
```

そして、ボタンを表示したい場所へ次のコードを置きます。

```html
<div google-add-preferred-source-btn></div>
```

本来であれば、GoogleのJavaScriptがこの要素を検出して「優先するニュース提供元に追加」ボタンを自動生成します。

テーマを変更したい場合は `data-theme`、表示言語を固定したい場合は `data-lang` も利用できます。

```html
<div
  google-add-preferred-source-btn
  data-theme="light"
  data-lang="ja">
</div>
```

## しかしOJapp Tipsでは標準ボタンが表示されなかった

OJapp Tipsでも最初はこの標準方式を使いました。

ところが、説明部分の枠は表示されるのに、肝心のGoogleボタンだけが表示されませんでした。

`data-theme` や `data-lang` を追加しても状況は変わりません。

Google側のPreferred Sources設定画面では `tips.ojapp.app` が正常に認識されていたため、サイト自体が対象外というわけでもありませんでした。

そこで、Google公式ドキュメントに用意されている**カスタムUI方式**へ切り替えることにしました。

## カスタムボタンなら自分でクリック処理を作れる

Google公式では、標準ボタン以外にもJavaScript SDKを手動制御する方法が用意されています。

まず、ライブラリの読み込みに `preferred-sources-control="manual"` を追加します。

```html
<script
  async
  preferred-sources-control="manual"
  src="https://news.google.com/swg/js/v1/publisher.js">
</script>
```

この属性を付けると、Googleによる標準ボタンの自動描画を停止できます。

そのうえで、自分で用意したボタンから `preferredSource.addPreferredSource()` を呼び出します。

```html
<button id="myButton">
  Googleで優先する
</button>

<script>
(self.PREFERRED_SOURCE = self.PREFERRED_SOURCE || []).push(
  function(preferredSource) {

    preferredSource.init({
      theme: "light",
      lang: "ja"
    });

    const button = document.querySelector("#myButton");

    button.addEventListener("click", function() {
      preferredSource.addPreferredSource();
    });
  }
);
</script>
```

この方法なら、ボタンのデザインや文言はサイト側で自由に作れます。

OJapp Tipsではこの方法へ変更したところ、ボタンをクリックするとGoogleのPreferred Sources追加画面が正常に開くようになりました。

## WordPressの記事末尾へ自動で表示する

OJapp Tipsでは、Preferred Sourcesの案内を全記事の最後に自動表示することにしました。

WordPressなら `the_content` フィルターを使えば、記事ごとにコードを書く必要はありません。

```html
function ojapp_add_preferred_source_button($content) {

  if (
    !is_singular('post') ||
    !in_the_loop() ||
    !is_main_query()
  ) {
    return $content;
  }

  $is_english =
    strpos($_SERVER['REQUEST_URI'], '/en/') !== false;

  if ($is_english) {

    $preferred_source = '
    <div class="ojapp-preferred-source">
      <p><strong>
        Add OJapp Tips as a preferred source on Google
      </strong></p>

      <p>
        Make it easier to find OJapp Tips articles
        in Google Search.
      </p>

      <button
        type="button"
        class="ojapp-preferred-source-btn">
        Prefer OJapp Tips on Google
      </button>
    </div>
    ';

  } else {

    $preferred_source = '
    <div class="ojapp-preferred-source">
      <p><strong>
        GoogleでOJapp Tipsを優先する情報源に追加
      </strong></p>

      <p>
        今後、Google検索でOJapp Tipsの記事を
        見つけやすくできます。
      </p>

      <button
        type="button"
        class="ojapp-preferred-source-btn">
        GoogleでOJapp Tipsを優先する
      </button>
    </div>
    ';
  }

  return $content . $preferred_source;
}

add_filter(
  'the_content',
  'ojapp_add_preferred_source_button',
  99
);
```

日本語記事と英語記事を同じWordPressで運営しているため、OJapp TipsではURLに `/en/` が含まれるかどうかで説明文とボタン文言を切り替えています。

## これはSEOというより「次の入口」を作る機能かもしれない

個人的に面白いと思ったのは、Preferred Sourcesが単純なSEO施策とは少し違うところです。

普通のSEOは、まだサイトを知らない人に検索結果から見つけてもらうための施策です。

Preferred Sourcesは逆に、**すでに一度サイトを知ってくれた人との次の接点を作る**という考え方に近く見えます。

これはPWAを使ってWebサイトをホーム画面へ置く考え方とも少し似ています。

[PWAではWebサイトをホーム画面から起動できる入口に変える](https://tips.ojapp.app/what-is-pwa/)ことができます。

Preferred Sourcesでは、その入口をGoogle検索の中に作る。

場所は違いますが、「一回来て終わり」にしないという点ではかなり近い発想です。

## 標準ボタンが動かなくてもカスタム実装がある

今回実際に設置してみて分かったのは、標準のdivを置くだけの方法がうまく動かなかったとしても、そこで諦める必要はないということです。

Google自身が、カスタムUIからPreferred Sources追加画面を呼び出せる方法を正式に用意しています。

むしろカスタム方式なら、サイトのデザインに合わせてボタンを作れるため、WordPressのような既存サイトへ組み込む場合はこちらの方が扱いやすいケースもありそうです。

## ブログ運営者なら試してみる価値はありそう

Preferred Sourcesボタンを設置したからといって、Google検索順位が直接上がる機能ではありません。

ただ、読者が「このサイトの記事をまた読みたい」と思ったとき、その意思をGoogle側へ残せる新しい導線になります。

しかも実装はJavaScriptだけで完結し、独自のカスタムボタンも利用できます。

特定ジャンルの記事を継続して公開しているブログや専門サイトなら、記事末尾の新しいCTAとして試してみる価値はありそうです。

OJapp Tipsでもしばらく設置して、実際にどんな変化があるのか見ていこうと思います。ボタンは少し下にあります！
