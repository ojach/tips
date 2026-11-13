---
updated: 2026-11-05
---

Webサイトをスマホのホーム画面に追加して、アプリのように使えるようにしたい。アイコンや名前を設定したいし、できればオフラインでも開けるようにしたい。

そんなときに使うのがPWA（Progressive Web App）の仕組みです。

最初に触るのは、主に次の3つです。

- **Web App Manifest**：アプリ名、アイコン、起動URL、表示方法を指定する
- **Service Worker**：キャッシュやオフライン動作などを実装する
- **アイコン画像**：ホーム画面に表示する画像を用意する

ただし、ここは最初に区別しておきたいところです。**ホーム画面に追加することと、Service Workerを使ってオフライン対応することは別の話**です。Service Workerがなくてもホーム画面追加ができる環境はあります。反対に、manifestを置いただけでオフライン対応が完成するわけでもありません。

この記事では、まずホーム画面対応を作り、そのあと必要に応じてService Workerを追加する順番で解説します。

## 1. manifest.jsonを作る

まず、サイトの公開ディレクトリに `manifest.json` を用意します。

```json
{
  "name": "サンプルWebアプリ",
  "short_name": "サンプル",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

最初はこれくらいで十分です。`name` はアプリ名、`short_name` は短い表示名、`icons` はアイコン画像、`display` は起動時の表示モードを指定します。`standalone` は対応環境で通常のブラウザUIを省いた表示を目指す設定です。

特に注意したいのが `start_url` です。上の例では `/` を指定しているため、ホーム画面から起動するとサイトのルートを開きます。

特定のページを入口にしたい場合は、そのページのURLを指定します。`"start_url": "."` という相対指定も使えますが、**これは「今見ているページ」という意味ではありません**。manifestファイルのURLを基準に解決されます。サイト共通の `/manifest.json` に `"."` を書けば、通常はサイトのルートを指します。

ページごとに違う起動先を作りたいなら、manifestの配置や配信方法も含めて設計する必要があります。

## 2. HTMLからmanifestを読み込む

ページの `<head>` に次のタグを追加します。

```html
<link rel="manifest" href="/manifest.json">
```

ブラウザはこの指定を見てmanifestを取得します。ファイルのパスを間違えると読み込まれないので、まずは開発者ツールのApplication（またはManifest）画面やネットワークの応答を確認してください。

サーバーからは `application/manifest+json` など適切なJSON用MIMEタイプで返します。

## 3. ホーム画面用アイコンを用意する

例では次の2枚を使います。

- `/icons/icon-192.png`（192×192px）
- `/icons/icon-512.png`（512×512px）

これらは一般的な推奨サイズです。プラットフォームやブラウザによってアイコンの選び方、切り抜き方、インストール判定は異なります。Android向けには、必要に応じて `purpose: "maskable"` に対応した画像も用意するとよいでしょう。

iPhoneでは `apple-touch-icon` も確認しておくのが無難です。

```html
<link rel="apple-touch-icon" href="/icons/icon-512.png">
```

画像のパスが正しくても、ホーム画面に追加済みのアイコンがすぐ更新されるとは限りません。変更後の確認では、新しく追加したアイコンとの比較も役立ちます。

## 4. HTTPSで公開する

Service Workerは原則としてセキュアなコンテキストで動作します。公開サイトではHTTPSを使いましょう。ローカル開発用の `localhost` などは例外として扱われます。

manifestやホーム画面追加の対応状況はブラウザによって異なるため、HTTPSにしただけで必ず「インストール」ボタンが出るわけではありません。

## 5. Service Workerを登録する

ここからはキャッシュやオフライン対応を追加したい場合の手順です。`sw.js` をサイトのルートに作ります。

```js
self.addEventListener("install", () => {
  console.log("Service Worker installed");
});

self.addEventListener("activate", () => {
  console.log("Service Worker activated");
});
```

続いて、ページ側のJavaScriptで登録します。

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .catch((error) => console.error("SW registration failed:", error));
}
```

これで対応ブラウザではService Workerを登録できます。ただし、**このコードだけではオフライン対応にはなりません**。また、`display: "standalone"` が効くかどうかはService Workerの登録完了で決まるわけではありません。

## 6. 必要ならキャッシュを追加する

オフラインでもトップページを開けるようにしたいなら、例えば次のようにします。先ほどの `sw.js` を、以下のコードに置き換える例です。

```js
const CACHE_NAME = "sample-pwa-v1";
const OFFLINE_FILES = ["/", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_FILES))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key.startsWith("sample-pwa-") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
```

これは学習用のシンプルなCache Firstの例です。事前に保存した `/` は、ネットワークが切れていてもキャッシュから返せます。ただし、未保存のページまでオフラインで開けるわけではありません。

また、キャッシュしたファイルは更新後も古いものが表示される場合があります。実際の運用では、キャッシュ名の更新、削除方針、ページの更新頻度に応じた戦略を考える必要があります。

キャッシュの考え方は、[PWAのキャッシュ戦略](https://tips.ojapp.app/pwa-cache-strategy/)でも解説しています。

## 7. AndroidとiPhoneで実機確認する

ここまでできたら、実際のスマホで追加してみます。

AndroidではChromeなどのメニューから「インストール」または「ホーム画面に追加」を選びます。iPhoneではSafariの共有メニューから「ホーム画面に追加」を選びます。表示される文言や手順はOS・ブラウザのバージョンで変わることがあります。

確認するのは次の点です。

- アイコンと名前は想定どおりか
- ホーム画面から開いたURLは正しいか
- ブラウザUIの表示は意図どおりか
- `theme_color` などの色はどう反映されるか
- オフライン時に何が開けるか
- コードを更新したあと、古い画面が残らないか

manifestの指定が同じでも、AndroidとiPhoneで結果が一致するとは限りません。PCの開発者ツールでエラーがなくても、実機での確認は必要です。

## よくあるつまずき

**manifestが読み込まれない**：`href` のパス、JSONの構文、レスポンスの内容を確認します。

**アイコンが違う**：画像のURL、サイズ、`apple-touch-icon`、既存のホーム画面アイコンのキャッシュを確認します。

**起動するとトップページに戻る**：`start_url` の値と、manifestのURLを基準にした相対パスの解決を確認します。

**変更したのに古い画面が出る**：HTTPキャッシュだけでなく、Service WorkerとCache Storageも確認します。

**オフラインで開けない**：Service Workerを登録しただけでは不十分です。対象のページや必要なファイルが保存されているか確認します。

## まとめ：まずホーム画面対応、そのあと必要な機能を足す

PWAの作り方は、最初からすべての機能を盛り込むより、段階を分けた方が理解しやすいです。

まずmanifestとアイコンを用意してHTMLから読み込み、HTTPSで公開してホーム画面に追加する。次に、必要ならService Workerを登録し、キャッシュやオフライン対応を実装する。

特に `start_url`、アイコン、キャッシュの挙動は、実際に追加して初めて気づくことが多い部分です。

コードを書くところまでではなく、**AndroidとiPhoneのホーム画面から起動して確認するところまで**を、ひとつの作業として考えるのがおすすめです。
