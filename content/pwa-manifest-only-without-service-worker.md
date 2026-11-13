前回の記事では、「PWAにはService Workerが必須」という昔からよく言われてきた条件を2026年現在の環境で確認しました。</p>

結論として、現在のChromeでは**Service WorkerがなくてもPWAをインストールできます。**

では、ここでもう1つ疑問が出てきます。

**Service Workerを完全に使わず、Web App ManifestだけならどこまでPWAとして成立するのでしょうか。**

ホーム画面へ追加できるのか。専用アイコンは使えるのか。standaloneで開けるのか。起動ページは指定できるのか。

今回はPWA LABで実際に使ってきた構成をもとに、「Manifestだけでできること」と「Service Workerが必要になること」を分けて整理します。

## まずはService Workerを完全に外してみる

かなりシンプルな構成から始めます。

HTML側ではWeb App Manifestを読み込むだけです。

```html
<link rel="manifest" href="/manifest.json">
```

Service Workerの登録コードは書きません。

```text
// これは書かない
navigator.serviceWorker.register('/sw.js');
```

そしてManifestを用意します。

```json
{
  "name": "My PWA",
  "short_name": "My PWA",
  "start_url": ".",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

もちろんHTTPSなど、インストール可能性に必要な他の条件は満たしている前提です。

構成としてはこれだけです。

## ChromeではService Workerなしでもインストールできる

PWA LABでは、このようにService Workerを登録していない構成でも、条件を満たしたChrome環境からインストールできることを確認しています。

つまり、

```text
Manifestあり
Service Workerなし
↓
インストール可能
```

という構成が成立します。

前回の[PWAにService Workerは必須？2026年のChromeで実際に確認してみた](https://tips.ojapp.app/pwa-service-worker-required-2026/)でも整理した通り、現在はService Worker自体がインストールの必須条件ではありません。

ここだけを見ると、昔イメージしていたPWAよりかなり軽い構成です。

## ホーム画面のアイコンもManifestで指定できる

Service Workerがなくても、Manifestの `icons` は使えます。

```text
"icons": [
  {
    "src": "/icon-192.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "any"
  },
  {
    "src": "/icon-512.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any"
  }
]
```

つまり、ホーム画面へ置くための専用アイコンを設定することとService Workerは別の話です。

さらにAndroid向けにmaskableアイコンを用意するなら、

```json
{
  "src": "/icon-maskable-512.png",
  "sizes": "512x512",
  "type": "image/png",
  "purpose": "maskable"
}
```

のような指定もManifest側でできます。

ホーム画面上で「何のAppなのか」を見せる部分は、基本的にManifestの役割です。

## アプリ名もManifestで決められる

名前についても同じです。

```text
"name": "Image Compressor",
"short_name": "Compressor"
```

`name` や `short_name` を使って、PWAとしての名前を定義できます。

HTMLの `<title>` とは別に、ホーム画面の入口としての名前を持たせられます。

これもService Workerとは関係ありません。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>名前、アイコン、起動ページ、表示方法。ホーム画面Appの見た目はManifestだけでもかなり作れるんだよね👻</div>
</div>

## standalone表示もService Workerなしで使える

次に大きいのが `display` です。

```text
"display": "standalone"
```

これを指定すると、対応環境では通常のブラウザタブとは違うstandalone表示でPWAを起動できます。

PWA LABでも、Service Workerを使わない構成でホーム画面からstandaloneとして起動する形を使っています。

つまり、

```text
ホーム画面にアイコン
↓
タップ
↓
standaloneで起動
```

というPWAらしい基本体験にも、Service Workerは必須ではありません。

## start_urlもManifestだけで指定できる

ホーム画面から起動した時にどこを開くかは、`start_url` で指定します。

```text
"start_url": "/app/"
```

サイトトップなら、

```text
"start_url": "/"
```

という設計もできます。

私が1P1Aでよく使っているのは、

```text
"start_url": "."
```

です。

ただし `.` は「現在ブラウザで見ているページ」という特別な命令ではなく、ManifestのURLを基準に解決される相対URLです。

そのため、ページ単位の動的Manifestなど、相対URLが目的のページを指す構成と組み合わせることが重要です。

[start_url: “.” が最強説｜PWAで“入れたページに戻る”を成立させる考え方](https://tips.ojapp.app/pwa-start-url-dot-2/)では、この部分を詳しく検証しています。

## ここまで全部Service Workerなし

ここまでを一度まとめます。

<table>
<thead>
<tr><th>機能</th><th>Service Workerなし</th></tr>
</thead>
<tbody>
<tr><td>ChromeでのPWAインストール</td><td>可能</td></tr>
<tr><td>ホーム画面アイコン</td><td>可能</td></tr>
<tr><td>アプリ名の指定</td><td>可能</td></tr>
<tr><td>start_urlの指定</td><td>可能</td></tr>
<tr><td>standalone表示</td><td>可能</td></tr>
<tr><td>fullscreen指定</td><td>可能</td></tr>
</tbody>
</table>

「Webページをホーム画面へ置き、専用アイコンからアプリらしく起動する」というところまでなら、Manifestだけでもかなり実現できます。

## ではService Workerがないと何ができない？

ここからが重要です。

Manifestは、主にPWAの名前、アイコン、起動先、表示方法などをブラウザへ伝えるためのものです。

ネットワークリクエストそのものを制御するものではありません。

そのため、Service Workerを使わなければ、Service Workerによるオフラインキャッシュは作れません。

```text
ネット接続なし
↓
Service Workerがキャッシュ済みレスポンスを返す
```

という仕組みを実装したいならService Workerが必要です。

## Manifestだけではオフライン対応にはならない

ここは特に誤解しやすいところです。

ホーム画面に追加できた。

standaloneで開いた。

見た目は完全にアプリっぽい。

だからといって、そのPWAが自動的にオフライン対応になるわけではありません。

Manifestはキャッシュ戦略を作りません。

オフライン時にも確実に必要なコンテンツを提供したいなら、Service Workerなどを使ってその仕組みを実装する必要があります。

## Push通知もManifestを書くだけでは実装できない

Push通知についても同じです。

Manifestへ何か1行追加すればPush通知が完成するわけではありません。

Web PushではService Workerに加えて、Push API、通知処理、購読情報、サーバー側の送信処理などが関係します。

つまり、

```text
Manifest
↓
ホーム画面Appとしての情報

Service Workerなど
↓
オフライン・Push・バックグラウンド系の機能
```

と役割を分けて考えると分かりやすくなります。

## Service Workerなしでも普通のWeb機能はそのまま使える

当然ですが、Service Workerを使わなくても、そのページがもともと持っているWeb機能は普通に使えます。

JavaScriptも動きます。

localStorageも使えます。

API通信もできます。

ログイン機能も、通常のWebアプリとして実装できます。

ホーム画面からstandaloneで開いたからといって、別の技術基盤へ切り替わるわけではありません。

中身はあくまでWebです。

## ブラウザキャッシュも消えるわけではない

前回の記事でも触れましたが、Service Workerを使わないことと、キャッシュが一切存在しないことも別です。

Webブラウザには通常のHTTPキャッシュがあります。

Service Workerを使うと、その上で開発者がリクエストを横取りし、Cache APIなどを使って独自のキャッシュ戦略を組めます。

つまり、

```text
通常のWeb
↓
ブラウザ本来のキャッシュ

Service Workerあり
↓
さらにプログラム可能なネットワーク・キャッシュ制御
```

という違いです。

## 軽いPWAならManifest中心でも十分なケースがある

ここまで試してみると、PWAの用途によって必要な技術がかなり違うことが分かります。

例えば、

- プロフィールをホーム画面へ置く
- 特定の記事をすぐ開けるようにする
- オンライン前提のWebツールをホーム画面へ置く
- 商品ページへの入口を作る
- 予約ページを1タップで開く

といった用途なら、最初から複雑なService Workerを実装する必要がない場合があります。

まずManifestでホーム画面への入口を作る。

必要になった機能だけ後から追加する。

私はこのくらい軽くPWAを考える方が、今のWebには合っていると感じています。

## 1P1Aもこの軽さから生まれた

私が作っている[1P1A（One Page. One App.）](https://tips.ojapp.app/1p1a-2/)も、この考え方とかなり相性があります。

サイト全体へ大きなPWA構成を作るのではなく、ページごとに名前、アイコン、起動URLを持たせる。

```text
ページA
↓
アイコンA
↓
ページAへ起動

ページB
↓
アイコンB
↓
ページBへ起動
```

目的が「このページをホーム画面からすぐ開けるようにしたい」なら、まず必要なのはその入口を定義することです。

オフライン対応が必要なら、その後でService Workerを考えればいい。

## Manifestだけでできることは意外と多い

昔のPWA解説を読んでいると、Service Workerを書いて初めてPWA開発が始まるように感じることがあります。

でも2026年現在の環境で改めて分解してみると、ホーム画面Appとしての基本部分はManifestがかなり担当しています。

```text
名前
アイコン
起動URL
表示モード
↓
Web App Manifest
```

一方で、

```text
オフライン
高度なキャッシュ制御
Push
バックグラウンド処理
↓
Service Workerなど
```

という役割があります。

## 「PWAを作る」ではなく必要な機能を選べばいい

PWAという名前だけを見ると、何か決まった完成形があるように感じます。

でも実際には、Webへ必要な能力を少しずつ追加していく技術の集合として考えた方が分かりやすいです。

ホーム画面へ置きたいならManifest。

オフラインにしたいならService Worker。

Pushが必要ならPushの仕組み。

全部必要なら全部使う。

必要なければ使わない。

**Manifestだけでも、ホーム画面に置いてアプリらしく起動するところまでは作れます。**

これはPWAをかなり小さく始められるということでもあります。

次は、Manifestの中でも特に挙動を分かりにくくしている `scope` を取り上げます。iPhoneとAndroidで何が変わるのか、PWA LABの実機検証をもとに整理します。
