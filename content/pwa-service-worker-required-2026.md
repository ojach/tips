PWAの作り方を調べると、昔からよく出てくる構成があります。</p>

```text
Web App Manifest
+
Service Worker
+
HTTPS
=
PWA
```

私も長い間、Service WorkerはPWAを成立させるための基本セットのようなものだと思っていました。

ところがPWA LABでいろいろな構成を実機検証していると、Service Workerを登録していないページでもChromeからインストールできることに気付きました。

「あれ？ Service WorkerってPWAに必須じゃなかったっけ？」

そこで2026年現在の仕様も改めて確認してみると、現在のMDNにも**PWAのインストールにService Workerは必須ではない**ことが明記されています。

今回は、昔からよく言われてきた「PWAにはService Workerが必須」という認識を、2026年の環境でもう一度整理します。

## 結論：Service WorkerがなくてもPWAはインストールできる

先に結論です。

**2026年現在、Service WorkerはPWAをインストールするための必須条件ではありません。**

MDNのPWAガイドでも、Service Workerについて「PWAがインストール可能であるための要件ではない」と説明されています。

Chromium系ブラウザーでインストールを促進するためのManifest側の主な条件として、現在MDNでは次の項目が挙げられています。

- `name` または `short_name`
- 192pxと512pxの `icons`
- `start_url`
- `display` または `display_override`
- `prefer_related_applications` がfalse、または未指定

さらにHTTPS、またはlocalhostなどのローカル開発環境で配信されている必要があります。

このインストール要件の中に、Service Workerは入っていません。

参考：[MDN - Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)

## PWA LABでもService Workerなしで確認できた

仕様だけではなく、PWA LABでもService Workerを使わない構成を何度も試しています。

例えば、ページ側からWeb App Manifestを読み込み、そこにアプリ名、アイコン、start_url、displayなどを設定します。

```html
<link rel="manifest" href="/manifest.json">
```

Manifestは例えば次のような構成です。

```json
{
  "name": "My App",
  "short_name": "My App",
  "start_url": ".",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

ここにService Workerの登録処理はありません。

それでも、条件を満たした環境ではChromeからインストールし、ホーム画面やアプリ一覧からstandalone表示で起動できることを確認しています。

つまり、少なくとも「Service Workerを書かないとPWAとしてホーム画面へインストールできない」という理解は、現在のChromeでは当てはまりません。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>昔のPWA記事を読んでると、Service Workerがないと始まらない感じに見えるんだよね👻</div>
</div>

## では、なぜ「Service Worker必須」と言われてきたのか

ここが少しややこしいところです。

Service Workerは、PWAと非常に深い関係があります。

Service Workerを使えば、ネットワークリクエストを制御し、Cache APIなどと組み合わせてオフライン対応を実装できます。

さらにバックグラウンド処理やPush通知など、Webアプリをよりアプリらしくする機能にも関わります。

そのため長い間、PWAの代表的な構成としてManifestとService Workerがセットで説明されてきました。

過去のChromeでは、インストール可能性を判定する条件としてService Workerが要求されていた時期もありました。

その頃に書かれた解説やチュートリアルが現在も検索結果に残っているため、「Service Worker = PWAの必須条件」という認識も残りやすいのだと思います。

## Service Workerが不要になったわけではない

ここはかなり重要です。

**インストールに必須ではないことと、Service Workerが不要なことは別です。**

Service Workerは現在でもPWAの重要な技術です。

例えば、

- オフラインでもページを開きたい
- ネットワークが不安定でもキャッシュから表示したい
- 静的ファイルを明示的にキャッシュしたい
- Push通知を実装したい
- バックグラウンド処理を使いたい

といった機能ではService Workerが必要、または重要な役割を持ちます。

MDNでも、PWAのインストールにService Workerは必須ではない一方、多くのPWAがオフライン体験を提供するためにService Workerを利用すると説明されています。

## 「PWAに必要」ではなく「その機能に必要」と考える

私は今、この考え方で整理するのが一番分かりやすいと思っています。

```text
PWAだからService Workerを書く

ではなく

オフライン対応が必要
↓
Service Workerを使う
```

例えば、単純なプロフィールページをホーム画面へ置きたいだけならどうでしょう。

ネットにつながっている時に最新情報を表示できれば十分なら、複雑なキャッシュ処理まで追加する必要はないかもしれません。

一方、地下や機内でも使いたいツールなら、Service Workerによるオフライン対応には大きな意味があります。

目的によって必要な構成が変わります。

## Service Workerを入れると管理するものも増える

Service Workerには大きなメリットがありますが、入れれば終わりではありません。

PWA LABではService Workerのキャッシュも何度も検証していますが、キャッシュ戦略を間違えると、更新したHTMLやJavaScriptがなかなか反映されないことがあります。

特にcache-firstを強く使うと、オフラインには強くなる一方で、古いキャッシュをどう更新するかまで設計する必要があります。

Service Workerのscopeを広くしすぎれば、意図していないページまで制御対象になることもあります。

Service Workerは強力だからこそ、使うなら「何のために使うのか」を決めておいた方が扱いやすいです。

キャッシュ戦略については、[PWAのキャッシュ戦略を比較｜cache-first・network-first・stale-while-revalidateの違い](https://tips.ojapp.app/pwa-cache-strategy/)でも詳しくまとめています。

## 普通のブラウザキャッシュとService Workerは別物

Service Workerを使わないと、Webページが毎回すべてゼロから読み込まれるわけでもありません。

通常のWebページには、HTTPキャッシュなどブラウザ本来のキャッシュ機構があります。

Service Workerはそこへさらに介入し、開発者側でリクエストやキャッシュ戦略を明示的に制御できる仕組みです。

そのため、

```text
Service Workerなし
=
キャッシュなし
```

ではありません。

このあたりも、PWAを学び始めた時には混同しやすい部分です。

## ホーム画面への入口を作るだけなら構成はもっと軽くできる

私が1P1Aを作り始めてから、特にこの違いを意識するようになりました。

1P1Aでは、Webページをページ単位でホーム画面の入口として扱います。

その目的だけなら、必ずしも全ページへService Workerを用意する必要はありません。

Manifestで名前、アイコン、起動URL、表示方法を定義し、そのページをホーム画面から直接開けるようにする。

まずはそこまで。

必要になった時にオフライン対応などを追加する。

こう考えるとPWAの導入はかなり軽くなります。

[PWA開発を一瞬で終わらせる「とりあえず入れるPWA」](https://tips.ojapp.app/minimal-pwa-quick-start/)でも、この最小構成から始める考え方を紹介しています。

## 2026年のPWAは「全部入り」から始めなくていい

PWAという言葉から、

```text
Manifest
Service Worker
オフライン対応
Push通知
インストールUI
キャッシュ戦略
```

まで全部実装しないといけないように感じることがあります。

でも現在は、必要な機能を必要な分だけ追加していく考え方でも構いません。

まずホーム画面へ置けるWebアプリを作る。

オフラインが必要ならService Workerを追加する。

Push通知が必要なら、そのための仕組みを追加する。

全部を最初から背負う必要はありません。

## 昔のPWA常識は一度確認し直した方がいい

Web技術は変わります。

昔は正しかった説明が、そのまま現在の必須条件とは限りません。

Service Workerはその分かりやすい例でした。

2026年現在、Service WorkerはPWAをインストールするための必須条件ではありません。

しかし、オフライン対応やバックグラウンド機能を実現するための重要な技術であることは変わりません。

**「PWAだからService Workerが必要」ではなく、「実現したい機能にService Workerが必要か」を考える。**

今のPWAを理解するなら、この考え方の方が実装もしやすく、構成もシンプルになります。

次は、さらに一歩進めて「Service Workerなしで、manifest.jsonだけならどこまでPWAとして成立するのか」を実際の構成から見ていきます。
