---
updated: 2026-11-28
---

# manifest.jsonとは？PWAに必要な設定とiPhone・Androidでの違い

PWAを作るときに、まず出てくるのが`manifest.json`です。

名前だけ見ると少し難しそうですが、役割はかなりシンプルです。

**manifest.jsonは、そのWebページをホーム画面に追加したときの名前・アイコン・起動URL・表示方法をブラウザに伝える設定ファイル**です。

PWA LABでいろいろ試していて分かったことは、manifest.jsonは全部の項目を完璧に書くより、まず必要な項目を正しく書く方が大事ということです。

特にiPhoneとAndroidでは、効く項目や見え方に違いがあります。

この記事では、PWAに必要なmanifest.jsonの基本と、iPhone・Androidで実際にインストールするときに意識したい項目を整理していきます。

## manifest.jsonとは何か

manifest.jsonは、Webアプリの設定ファイルです。

普通のWebページは、ブラウザで開くだけならHTML、CSS、JavaScriptがあれば表示できます。

でも、ホーム画面に追加してアプリのように使う場合は、ブラウザに追加情報を渡す必要があります。

たとえば、次のような情報です。

- ホーム画面に表示する名前
- ホーム画面に表示するアイコン
- アイコンから起動したときに開くURL
- ブラウザ表示にするか、アプリ風表示にするか
- アプリとして扱うURLの範囲
- スプラッシュ画面やツールバーに使う色

これらをまとめて書くのがmanifest.jsonです。

## まずはこの形で十分

基本的な項目をそろえたmanifest.jsonは、次のような形です。

```json
{
  "name": "Sample PWA",
  "short_name": "Sample",
  "start_url": ".",
  "scope": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "icons": [
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

これはサイト全体をアプリ範囲にする例です。ページ単位で別々のアプリにする場合は、`scope: "/"`が適切とは限りません。これらの項目を用途に合わせて設定することが、Androidでインストール可能なPWAを作るための基本になります。ただし、インストール候補として表示されるかどうかは、ブラウザ側の条件にも左右されます。

その他の項目は、用途によっては必要ですが、基本的にはこのセットを正しく動かす方が大事です。

PWAは、1文字のパスミスやアイコン指定のズレだけで、インストール候補から外れたり、意図しないアイコンになったりします。

## HTMLからmanifest.jsonを読み込む

manifest.jsonは、HTMLの`head`内で読み込みます。

```html
<link rel="manifest" href="/manifest.json">
```

PWA LABでは、manifestの読み込みパスを間違えてハマりました。

`/lab/manifest.json`と書くべきところを、`/leb/manifest.json`にしていたことがあります。

たった1文字ですが、これだけでmanifestは読み込まれません。

ページ自体は普通に表示されるので、最初は気づきにくいので注意してください。

PWAでうまくいかないときは、まずmanifest.jsonが本当に読まれているかをDevToolsなどで確認しましょう。

## name と short_name

`name`は、Webアプリの正式な名前です。

`short_name`は、ホーム画面など狭い場所で使われる短い名前です。

```json
{
  "name": "OJapp PWA LAB",
  "short_name": "PWA LAB"
}
```

Androidでは、`name`がスプラッシュ画面などに使われることがあります。

iPhoneでは、`short_name`がホーム画面に表示される名前として意味を持ちます。ただし、ホーム画面上の名称にはOS側の挙動も関係します。

ホーム画面の名前は長すぎると省略されます。

なので、短くて分かりやすい名前を`short_name`に入れておくのが大事です。

## start_url

`start_url`は、ホーム画面のアイコンから起動したときに開くURLです。

```json
{
  "start_url": "."
}
```

PWA LABで試していて、特別な理由がないなら`start_url: "."`はかなり扱いやすいと感じました。

固定で`"/"`や`"/app/"`にすると、ユーザーが別ページをホーム画面に追加したつもりでも、起動時にトップへ戻されることがあります。

もちろん、必ずトップやダッシュボードから始めたいアプリなら固定URLで問題ありません。

ただ、OJappやPetalのように「今見ているページを入口にする」設計では、`start_url`を相対指定する考え方が重要です。

相対URLはmanifest.jsonのURLを基準に解決されるため、実際にどのページが起動するかはmanifestの配置や生成方法によって変わります。OJappでは、この性質を利用した設計を行っています。

複数のホーム画面アプリとして扱えるかどうかは、`id`やブラウザ・OS側の判定にも左右されます。

iPhoneでもAndroidでも、起動URLの考え方はかなり重要です。

## scope

`scope`は、そのPWAがアプリとして扱われるURL範囲を決める項目です。

```json
{
  "scope": "/lab/"
}
```

例えば`scope: "/lab/"`なら、`/lab/`配下のページはアプリ内として扱われます。

そこから外に出ると、ブラウザ扱いに近い表示になることがあります。

iOSでもscopeは意味があります。

scope外へ移動するとSafariのミニUIが出るような挙動が確認できています。

つまり、iPhoneでもscopeは無視されているわけではありません。

アプリ範囲を広く取りたいなら`scope: "/"`。

特定のツールだけをPWA扱いにしたいなら`scope: "/tool/"`のように小さくする。

この設計はかなり大事で、Androidでもアプリ内表示として扱われる範囲に関係します。

何に効いているか分かりにくく、少しややこしい項目ではあります。

## id：同じアプリとして扱うかを左右する識別子

`id`は、ブラウザがインストール済みWebアプリを識別するためのManifest項目です。`start_url`は起動先、`scope`はアプリの範囲、`id`はアプリの識別に関わります。3つは似て見えて役割が違います。

```json
{
  "id": "/app/",
  "start_url": "/app/",
  "scope": "/app/"
}
```

同じドメインの複数ページを別々のアプリとして追加したい場合、`id`の付け方や省略、ブラウザによる識別の違いが問題になります。OJappとPetalでは、AndroidとiPhoneで複数のホーム画面エントリを扱うため、`id`・`scope`・`start_url`を組み合わせて検証してきました。すべての環境で同じ結果になると決めつけず、インストール済みの状態まで確認する必要があります。

## display

`display`は、PWAをどんな表示モードで開くかを指定する項目です。

```json
{
  "display": "standalone"
}
```

基本は`standalone`でいいです。

Androidでは、`standalone`にするとアプリらしい表示になります。

iPhoneでも、ホーム画面から開いたときにアドレスバーなしのアプリ風表示にできます。

PWA LABでは`fullscreen`や`minimal-ui`も試しましたが、iPhoneでは大きな見た目の変化はほぼありませんでした。

Androidでは`fullscreen`にするとツールバーが表示されなくなり、よりアプリらしい見た目になります。ただし、どのようなサイトをPWAにするかによって`standalone`と使い分けることが重要です。

戻る操作やリロードなど、ユーザーに必要な操作を考えて選ぶのがいいと思います。

注意点として、`display: "browser"`にするとアプリ風表示にはならず、インストールUIの扱いもブラウザによって異なります。

迷ったら`standalone`です。

## background_color と theme_color

`background_color`は、主に起動時の背景色やスプラッシュ画面に関係します。

`theme_color`は、Android Chromeなどでツールバー色に反映されることがあります。

```json
{
  "background_color": "#ffffff",
  "theme_color": "#ffffff"
}
```

Androidでは、この2つは見た目にかなり影響します。

特に`theme_color`は、PWAを開いたときの上部バーの色に反映されることがあります。

一方で、iPhoneではAndroidほど素直には反映されません。

それでもAndroid対応を考えるなら、入れておいた方がいい項目です。

## icons

`icons`は、ホーム画面に表示されるアイコンを指定する項目です。

```json
{
  "icons": [
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

最低でも512×512のPNGを用意しておくと扱いやすいです。

Androidではmanifestの`icons`がかなり重要です。

iPhoneでもmanifestのiconsが使われる場合があります。

ただし、iPhoneではHTML側の`apple-touch-icon`が優先されることがあります。

```html
<link rel="apple-touch-icon" href="/icon-512.png">
```

固定アイコンのWebアプリなら、iPhone用に`apple-touch-icon`を入れるのは有効です。

一方で、ページごと・人ごとに違うアイコンを出したいサービスでは、固定の`apple-touch-icon`が邪魔になることもあります。

PetalやOJappのように、個別URLごとにアイコンを変えたい場合はここに注意が必要です。

## Androidではmaskableアイコンも考える

Android向けには、maskableアイコンも考えた方がいいです。

Androidのホーム画面アイコンは、端末やランチャーによって丸や角丸などに切り抜かれます。

そのため、重要な部分が端に寄っていると、アイコンが切れて見えることがあります。

おすすめは、通常アイコンとmaskableアイコンを分ける形です。

```json
{
  "icons": [
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

`any`は通常アイコン用。

`maskable`はAndroidで切り抜かれる前提のアイコン用。

1枚の`any maskable`で済ませる方法もありますが、見た目まできれいにしたいなら2枚に分けた方が安全です。

## iPhoneで必要なmanifest項目はこれくらい

iPhone向けだけを考えるなら、manifest.jsonで特に意識したいのは次の項目です。

- `short_name`：ホーム画面の名前
- `start_url`：起動時のURL
- `scope`：アプリ扱いの範囲
- `display: "standalone"`：アプリ風表示
- `icons`：ホーム画面アイコン候補

さらに、iPhone用の固定アイコンを使うならHTML側に`apple-touch-icon`を入れます。

```html
<link rel="apple-touch-icon" href="/icon-512.png">
```

iPhoneでは`theme_color`や`orientation`などがAndroidほど強く効くわけではありません。

なので、iPhone向けはまず「名前・起動URL・scope・standalone・アイコン」を整えるのが現実的です。

## Android Chromeでインストール候補にしたい場合

Android ChromeでPWAとしてインストール候補に乗せたいなら、manifest.jsonだけでなく、サイト全体の条件も関係します。

基本的には、次のあたりを整えます。

- HTTPSで配信する
- manifest.jsonを正しく読み込む
- `name`または`short_name`を設定する
- `start_url`を設定する
- `display`を`standalone`などのアプリ向け表示にする
- 十分なサイズのアイコンを用意する

PWA LABでは、manifest.json、Service Worker、icons、display、start_urlを整えた状態で、Chrome側のインストール判定を確認しました。

Chromeでは`beforeinstallprompt`が発生すると、その環境でインストールを促せる状態にあることが分かります。ただし、すべての環境で必ず発生するわけではありません。

なお、現在のChromeでは、インストール可能にするためにService Workerが必須とは限りません。オフライン対応のためにService Workerを使うかどうかは、別に考えられます。

ChromeはmanifestやService Workerのキャッシュが強く残ることがあります。

設定を直してもすぐ反映されない場合があるので、テスト時は再読み込み、キャッシュ削除、再インストールも必要です。

## Service Workerはmanifestとは別

ここは混同しやすいところです。

`manifest.json`は、ホーム画面に追加したときの名前、アイコン、起動URL、表示モードなどをブラウザに伝える設定ファイルです。

一方で、`Service Worker`は、キャッシュやオフライン対応に関わるJavaScriptです。

つまり、この2つは役割が違います。

- `manifest.json`：PWAの見た目や起動情報を伝える
- `Service Worker`：キャッシュやオフライン動作を制御する

ここで大事なのは、**PWAとしてホーム画面に追加したり、Chromeでインストール候補に表示させたりするだけなら、Service Workerが必ず必要とは限らない**という点です。

実際にPWA LABで検証しても、manifest.jsonが正しく設定されていれば、`sw.js`なしでもChromeでインストール表示が出ます。

つまり、最初の段階では「manifest.jsonを正しく書くこと」がかなり重要です。

ただし、オフライン対応までしたい場合は話が変わります。

通信がない状態でもページを開きたい、CSSやJavaScriptをキャッシュしたい、アプリのように安定して動かしたい場合は、Service Workerが必要になります。

さらに、Service Workerを登録しただけでオフライン対応が完成するわけでもありません。

`fetch`処理やキャッシュ戦略を書いていなければ、Service WorkerがACTIVEになっていても、オフラインでは期待通りに動かないことがあります。

なので、まずはこう分けて考えると分かりやすいです。

- ホーム画面追加・インストール表示を整える → `manifest.json`
- オフライン対応・キャッシュ制御をする → `Service Worker`

Service Workerについては、別記事で詳しく解説します。

## よくあるミス

manifest.jsonまわりでよくあるミスは次の通りです。

- manifestのパスが間違っている
- JSONのカンマが壊れている
- MIME typeが正しくない
- アイコンのパスが間違っている
- アイコンサイズが不足している
- `display`が`browser`になっている
- `start_url`が意図しないページになっている
- `scope`が狭すぎる
- 古いmanifestがキャッシュに残っている

特にmanifestは、壊れていてもページ自体は表示されます。

だから気づきにくいです。

「サイトは見えているのにPWAにならない」というときは、manifest.jsonの読み込みを最初に確認してください。


## Manifestの項目別・実機検証ガイド

Manifestの項目を知るだけでは、実機での違いまで分かりません。ここからは、設定ごとの詳しい解説とPWA LABの検証記事へ進めます。

### 最小構成と起動URL

- [PWAのmanifest.jsonはどこまで書けばいい？最低限・推奨・用途別で整理](https://tips.ojapp.app/pwa-manifest-minimum-recommended-fields/)
- [PWAのstart_urlは何を指定すべき？トップ・現在ページ・専用URLの違い](https://tips.ojapp.app/pwa-start-url-top-current-page-dedicated-url/)
- [start_url: "." が最強説｜PWAで“入れたページに戻る”を成立させる考え方](https://tips.ojapp.app/pwa-start-url-dot-2/)
- [ホーム画面に追加したページと違うページが開く原因は？PWAのstart_urlを解説](https://tips.ojapp.app/pwa-home-screen-wrong-page-start-url/)

### アプリの範囲と識別

- [PWAのscopeとは？設定すると何が変わるのかiPhone・Androidで比較](https://tips.ojapp.app/pwa-scope-iphone-android-difference/)
- [PWAのmanifest idとは？省略するとどうなる？複数インストールとの関係](https://tips.ojapp.app/pwa-manifest-id-multiple-install/)
- [PWAは同じドメインから複数インストールできる？id・scope・start_urlの関係](https://tips.ojapp.app/pwa-multiple-install-same-domain/)

### 表示・名前・アイコン

- [PWAのstandaloneとfullscreenの違い｜どっちを使うべき？](https://tips.ojapp.app/pwa-standalone-vs-fullscreen/)
- [PWAのホーム画面アイコンは何を設定すればいい？name・short_name・iconsの役割](https://tips.ojapp.app/pwa-home-screen-icon-name-short-name-icons/)
- [PWAアイコンは any maskable だけでは足りない？AndroidとiPhoneで崩れる理由](https://tips.ojapp.app/pwa-icon-any-maskable-trap/)
- [PWAのscreenshotsは何のため？Chromeのインストール画面を強化する方法](https://tips.ojapp.app/pwa-manifest-screenshots-install-ui/)

### Service Workerとの関係

- [manifest.jsonだけでPWAは作れる？Service Workerなしでどこまでできるか検証](https://tips.ojapp.app/pwa-manifest-only-without-service-worker/)

## 関連記事

PWAの全体像を先に知りたい場合は、[PWAとは？スマホのWebサイトを“アプリ化”する仕組みをわかりやすく解説](https://tips.ojapp.app/what-is-pwa/)が参考になります。

Service Workerやホーム画面対応を含めた作り方は、[PWAの作り方｜manifest.json・Service Worker・ホーム画面対応を丁寧に解説](https://tips.ojapp.app/how-to-pwa/)でまとめています。

iPhoneでPWAがどこまで使えるかは、[PWA×iOSでできること完全まとめ【2026年版】](https://tips.ojapp.app/pwa-ios-capabilities/)もあわせて読むと分かりやすいです。

## まとめ

manifest.jsonは、PWAの名前、アイコン、起動URL、表示方法をブラウザに伝えるための設定ファイルです。

最初に押さえるべき項目は、`name`、`short_name`、`start_url`、`scope`、`display`、`icons`です。

iPhoneでは、特に`short_name`、`start_url`、`scope`、`standalone`、アイコン指定が重要です。

Android Chromeでは、manifestに加えてHTTPSなどの配信条件を整え、必要に応じてService Workerも使います。

全部の項目を暗記する必要はありません。

まずは必要最低限のmanifestを書いて、実機でホーム画面に追加し、Chromeでインストール判定を確認する。

これが一番早いです。
