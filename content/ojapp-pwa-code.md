WebサイトをPWAとしてホーム画面に追加できるようにしたい。

でも、そのために `manifest.json` を作って、アイコンを用意して、各種設定を書いて……となると、正直ちょっと面倒ですよね。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class="balloon__text balloon__text-right">これが簡単にできて、登録不要、無料です</div>
</div>

OJappでは、HTMLにJavaScriptを1行追加するだけでWeb App Manifestを動的に生成できます。

## サイト全体を1つのアプリにする

サイト全体を1つのアプリとしてホーム画面へ追加したい場合は、**1S1A（One Site. One App.）** を使います。

HTMLの `<head>` にこれを追加します。

```html
<script src="https://ojapp.app/js/ojapp_1s1a.js"></script>
```

これだけです。

サイト内のどのページからホーム画面へ追加しても、サイトトップを起点とする1つのWebアプリとして扱われます。

1S1Aでは内部的に、サイトのOriginから、

```text
https://example.com/
```

を作り、このURLをManifestの `id`、`start_url`、`scope` に設定しています。

つまり、

```text
One Site. One App.
```

という構成です。

## ページごとに別のアプリにする

商品ページ、記事、プロフィール、予約ページなどを、それぞれ別のアプリとしてホーム画面へ追加したい場合は、**1P1A（One Page. One App.）** を使います。

```html
<script src="https://ojapp.app/js/ojapp_1p1a.js"></script>
```

これも、置くだけです。

1P1Aでは現在開いているページのURLから、

```js
window.location.origin + window.location.pathname
```

を取得し、そのページ専用のManifestを生成します。

たとえば、

```text
https://example.com/product/wallet/
https://example.com/product/bag/
https://example.com/product/shoes/
```

という3つの商品ページがあれば、それぞれを別のホーム画面アイコンとして追加できる構造になります。

```text
商品A → アプリA
商品B → アプリB
商品C → アプリC
```

これが **One Page. One App.** です。

## 1S1Aと1P1Aの違い

違いはかなりシンプルです。

1S1Aは、

```text
サイト = 1アプリ
```

1P1Aは、

```text
ページ = 1アプリ
```

です。

普通の企業サイトやサービスサイトなど、サイトそのものを1つのアプリとして扱いたい場合は1S1A。

ECの商品ページ、ブログ記事、プロフィール、予約ページなど、「このページをホーム画面に残してほしい」という使い方なら1P1Aが向いています。

どちらも使っているのは同じWeb App Manifestです。

違うのは、<strong>「何を1つのアプリとして定義するか」</strong>だけです。

## manifest.jsonを作らなくてもいい

一般的なPWAでは、HTMLから次のようなファイルを読み込みます。

```html
<link rel="manifest" href="/manifest.json">
```

そしてサーバーには、

```text
/manifest.json
```

というファイルを用意します。

OJappでは、このManifestをJavaScriptがブラウザ上で動的に生成します。

大まかな流れはこうです。

```text
Webページを開く
↓
OJappのJavaScriptを実行
↓
URL・タイトル・アイコンを取得
↓
Web App Manifestを生成
↓
<link rel="manifest"> をHTMLへ追加
```

そのため、`manifest.json` を直接設置できないサービスでも、HTMLへJavaScriptを追加できればPWA用のManifestを生成できます。

もちろん、自由にファイルを設置できるWebサイトでも使えます。

## タイトルやアイコンも自動で取得する

1P1Aでは、基本的に現在のページの `<title>` がアプリ名として使用されます。

そのため、

```html
<title>レザーミニウォレット</title>
```

という商品ページなら、そのタイトルをそのままホーム画面のアプリ名として使えます。

さらに、明示的に指定したい場合はOJapp独自のmetaタグも使えます。

```html
<meta name="ojapp:title" content="ミニウォレット">
```

アイコンも同様です。

```html
<meta name="ojapp:icon" content="https://example.com/wallet.png">
```

と書けば、その画像をホーム画面用アイコンとしてManifestへ設定できます。

現在の1P1Aでは、指定がない場合に既存の画像情報やfaviconなどからアイコン候補を取得する仕組みになっています。

つまり最低限、

```html
<script src="https://ojapp.app/js/ojapp_1p1a.js"></script>
```

だけでも動き、必要なページだけ後からタイトルやアイコンを調整できます。

## アプリ化したくないページは除外できる

1P1Aをサイト共通の `<head>` に入れると、サイト内のすべてのページでスクリプトが読み込まれます。

ただし、トップページやカテゴリ一覧など、「ここはページ単位のアプリにしたくない」という場所もあります。

この『アプリにしたくないページ』というのが少しPWAの罠というか癖があります。
詳しくは[PWAの二極化：トップへ還る「1S1A」と、全ページをアプリ化する「1P1A」](https://tips.ojapp.app/pwa-1s1a-vs-1p1a/)をご覧ください。

ページを除外する場合は、そのページだけ次のmetaタグを追加します。

```html
<meta name="ojapp:exclude" content="true">
```

このタグを検出すると、1P1AはManifest生成処理そのものを停止します。

そのため、

```text
トップページ → 除外
カテゴリページ → 除外
商品ページ → 1P1A
記事ページ → 1P1A
```

といった使い分けもできます。

## Service Workerを用意しなくても、ホームに追加するだけでメリットがある

「PWA」というと、Service Workerまで必ず自分で書かなければいけないイメージがあるかもしれません。

しかし、OJappのこの仕組みが担当しているのは、Webページをホーム画面から起動できる形にするためのWeb App Manifestの生成です。

1S1Aも1P1Aも、中心になっているのはManifestです。

実は、Service Workerによる複雑なキャッシュ制御を書かなくても、ホーム画面に追加されたWebアプリはOS（ブラウザ）標準の強力なキャッシュ領域で管理されます。そのため、2回目以降のアクセスではアセットが瞬時に読み込まれ、事故リスクゼロで爆速のアプリ体験を提供できます。

なのでOJappは、Manifestだけを1行のJavaScriptから生成しています。

## まとめ

Webサイトをホーム画面から起動できる形にしたいだけなら、かなり小さな実装で始められます。

サイト全体を1つのアプリにするなら、

```html
<script src="https://ojapp.app/js/ojapp_1s1a.js"></script>
```

ページごとにアプリ化するなら、

```html
<script src="https://ojapp.app/js/ojapp_1p1a.js"></script>
```

基本はこれだけです。

1S1Aは、

```text
One Site. One App.
```

1P1Aは、

```text
One Page. One App.
```

Web App Manifestそのものは同じでも、<strong>「何を1つのアプリとして扱うか」</strong>でPWAの使い方は大きく変わります。

PWAを大掛かりな機能として考えるのではなく、まずはWebサイトに「ホーム画面から開ける入口を作る」くらいの感覚で導入してみるのが、一番分かりやすい使い方です。

## 関連記事やリンク

- [PWAを導入する？検討する意味すらない理由｜今や「令和版apple-touch-icon」です](https://tips.ojapp.app/pwa-no-need-to-consider/)
- [1P1A（One Page. One App.）というPWA設計思想](https://tips.ojapp.app/1p1a-2/)
- [PWAとは？2026年最新！ホーム画面に追加できるWebサイトの仕組みと最も簡単な実装方法](https://tips.ojapp.app/pwa-explained/)
- [ホーム画面マーケティングとは？PWAで「ページを届ける」という新しいWeb戦略](https://tips.ojapp.app/home-screen-marketing/)
- [OJapp One Page.One App.公式サイト](https://ojapp.app/one-page-one-app/)
