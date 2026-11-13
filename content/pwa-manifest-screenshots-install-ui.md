Web App Manifestには `screenshots` という項目があります。</p>

名前の通り、PWAのスクリーンショット画像をManifestへ登録するための機能です。

でも最初に見た時、私は少し疑問でした。

<strong>「今まさにWebサイトを見ているのに、インストール画面でもスクリーンショットを見せる必要ある？」</strong>

実際、PWAを成立させるためにscreenshotsが必須なわけではありません。

なくてもPWAはインストールできますし、ホーム画面から普通に起動できます。

では何のためにあるのか。

2026年現在の仕様と、実際にOJappのWordPressプラグインへ実装して確認した経験をもとに整理してみます。

## screenshotsはPWAのプレビュー画像

Web App Manifestでは、次のように `screenshots` を指定できます。

```json
{
  "name": "My App",
  "screenshots": [
    {
      "src": "/images/pwa-preview.webp",
      "sizes": "1280x720",
      "type": "image/webp",
      "form_factor": "wide",
      "label": "My App preview"
    }
  ]
}
```

MDNでは、screenshotsはWebアプリのインターフェイスや機能をユーザーへプレビューしてもらうためのManifestメンバーとして定義されています。

つまり役割としては、アプリストアの商品画像に近いものです。

アイコンだけでは分からない、

- どんな画面なのか
- 何ができるのか
- どんな雰囲気のアプリなのか

といった情報を画像で伝えられます。

## screenshotsはPWAの必須項目ではない

ここは先に押さえておきたいところです。

`screenshots` はオプションです。

Chromium系ブラウザでPWAとしてインストール可能にするための主要なManifest条件には、`name` または `short_name`、`icons`、`start_url`、`display` などがありますが、screenshotsは含まれていません。

つまり、

```text
screenshotsなし
↓
PWAとしてインストール可能

screenshotsあり
↓
対応するインストールUIなどへ
追加のプレビュー情報を渡せる
```

という位置付けです。

Manifestの基本については、[PWAのmanifest.jsonとは？基本の書き方と役割を解説](https://tips.ojapp.app/pwa-manifest-json-basics/)でもまとめています。

## Android Chromeではインストール画面を充実させられる

screenshotsが分かりやすく使われる例の1つが、Android ChromeのインストールUIです。

MDNでは、通常のインストールプロンプトにはPWAの名前とアイコンが表示され、Manifestに `description` と `screenshots` を指定すると、Androidではそれらを使った追加情報をインストールプロンプトに表示できると説明されています。

つまり通常は、

```text
アイコン
アプリ名
↓
インストールする？
```

だったところへ、対応するUIでは、

```text
アイコン
アプリ名
説明
スクリーンショット
↓
どんなPWAなのか確認してインストール
```

という、よりアプリストアに近い見せ方を作れます。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>インストールに必要な画像じゃなくて、「このAppこんな感じだよ」を見せる画像なんだね👻</div>
</div>

## 実際にWordPressプラグインへ追加してみた

私はOJappのWordPressプラグインにもscreenshotsを追加しました。

目的は、Chromeのインストール画面へサイト共通のプロモーション画像を表示することです。

例えば、

```text
最新情報を
ホーム画面から。
```

というメッセージを入れた16:9の画像を用意し、それをManifestのscreenshotsへ登録しました。

Manifestとしては、考え方は次のような形です。

```text
"screenshots": [
  {
    "src": "https://example.com/pwa-promo.webp",
    "sizes": "1280x720",
    "type": "image/webp",
    "form_factor": "wide",
    "label": "Add this site to your home screen"
  }
]
```

実際に追加してみると、インストールUIの中では画像が想像していたより小さく表示されるケースもありました。

そこで気付いたのが、screenshots用画像は普通の記事画像とは少し考え方を変えた方がいいということです。

## screenshotsでは細かい文字を入れすぎない

16:9の画像だからといって、広告バナーのように大量の説明を詰め込むと読みにくくなる可能性があります。

インストールUIの中では画像が縮小されることがあるからです。

そのため私は、

- 短いキャッチコピー
- 大きな文字
- 一目で意味が分かるビジュアル

くらいの方が向いていると感じました。

スクリーンショットという名前ですが、必ずしも画面をそのまま撮影した画像だけを使う必要はありません。

サービスの内容を正しく表現する範囲で、機能やメリットが伝わるプレビュー画像として設計できます。

## src以外にも指定できる項目がある

現在のWeb App Manifestでは、screenshotsの各画像に複数の情報を持たせられます。

```json
{
  "src": "/screenshots/home.webp",
  "sizes": "1280x720",
  "type": "image/webp",
  "form_factor": "wide",
  "label": "Home screen showing the main features"
}
```

主な項目は次の通りです。

<table>
<thead>
<tr><th>項目</th><th>役割</th></tr>
</thead>
<tbody>
<tr><td>src</td><td>画像ファイルのURL</td></tr>
<tr><td>sizes</td><td>画像サイズ</td></tr>
<tr><td>type</td><td>画像のMIMEタイプ</td></tr>
<tr><td>form_factor</td><td>wide / narrowなど対象画面の形</td></tr>
<tr><td>label</td><td>画像内容を説明するアクセシブルな名前</td></tr>
<tr><td>platform</td><td>特定のOSや配布プラットフォーム向けの指定</td></tr>
</tbody>
</table>

このうちManifest仕様上screenshotsオブジェクトで必須なのは `src` です。

ただし、利用する配布先やブラウザによって表示条件や推奨値は変わるため、実際に使う環境で確認するのが安全です。

## wideとnarrowを使い分けられる

`form_factor` には、主に `wide` と `narrow` を指定できます。

例えばPC向けなら、

```json
{
  "src": "/screenshots/desktop.webp",
  "sizes": "1280x720",
  "form_factor": "wide"
}
```

スマートフォン向けなら、

```json
{
  "src": "/screenshots/mobile.webp",
  "sizes": "750x1334",
  "form_factor": "narrow"
}
```

のように分けられます。

レスポンシブWebなら同じサービスでもPCとスマートフォンで画面構成が大きく違うことがあります。

その場合、それぞれに適した画像を用意できるわけです。

## labelも付けておきたい

`label` はスクリーンショットを説明するテキストです。

```text
"label": "Dashboard showing website analytics"
```

MDNではアクセシビリティのため、各スクリーンショットに説明的なlabelを付けることを推奨しています。

画像だけで意味を持たせるのではなく、その画像が何を表しているのかテキストでも説明しておくという考え方です。

## platformで対象プラットフォームも指定できる

現在のscreenshotsでは `platform` も指定できます。

例えば値として、

```text
android
ios
ipados
macos
windows
chromeos
```

などがあります。

特定のプラットフォームにだけ適した画像なら、この情報をManifestへ持たせることができます。

ただし、Manifestに書いたからといってすべてのブラウザが必ずその画像を表示するわけではありません。

screenshotsはあくまでプレビュー用のメタデータであり、どの画像をどう表示するかは利用するブラウザや配布プラットフォーム側にも依存します。

## iPhoneの「ホーム画面に追加」とは分けて考える

ここも重要です。

Android Chromeでscreenshotsを使ったインストールUIがあるからといって、iPhoneのSafariでも同じ画面になるわけではありません。

iOS Safariでは「ホーム画面に追加」という別のインストールフローが使われます。

MDNが説明しているdescriptionとscreenshotsによるインストールプロンプトの拡張も、Android向けのものです。

つまり、

```text
Manifestにscreenshotsを書いた
↓
全OSで同じインストール画面になる
```

ではありません。

PWAはこのあたりもブラウザ・OSごとの差が大きいので、実際の端末で確認した方が確実です。

## ページごとに画像を変えることもできる

ここからは1P1Aとも相性が良くなってきます。

動的にManifestを生成するなら、ページごとにscreenshotsを変えることもできます。

```text
記事A
↓
記事Aのプレビュー

商品B
↓
商品Bのプレビュー

ツールC
↓
ツールCの使い方画像
```

サイト全体で1枚の共通画像を使う必要はありません。

ページごとにManifestを変える[1P1A（One Page. One App.）](https://tips.ojapp.app/1p1a-2/)なら、名前やアイコンだけでなく、インストール前のプレビューまでページ単位で設計できます。

## 英語ページと日本語ページで画像を変えることもできる

私のWordPressプラグインでは、ここも実際に問題になりました。

日本語記事用のプロモーション画像を作った後で、英語記事を開くと当然そこでも日本語画像が出てしまいます。

そこで日本語ページと英語ページでscreenshotsを出し分けるようにしました。

```text
日本語記事
↓
日本語のscreenshots

英語記事
↓
英語のscreenshots
```

Manifestを動的に生成できるなら、こうした言語別の出し分けもできます。

screenshotsを単なる「スクリーンショット保存場所」ではなく、PWAのインストール前UIとして考えると、この使い方はかなり自然です。

## screenshotsを追加してもPWAの動作は速くならない

screenshotsは見せ方を強化するための情報です。

追加したからオフラインになるわけではありません。

キャッシュが速くなるわけでもありません。

standaloneの動作が変わるわけでもありません。

前回まで扱ってきた `id` や `scope` のようにアプリ識別やナビゲーション境界へ関わるものとも違います。

screenshotsはもっとシンプルに、<strong>「このPWAはどんなものかをインストール前に見せるための情報」</strong>と考えると分かりやすいです。

## Web App Manifestはインストール後だけの設定ではない

Manifestというと、アイコンやstandalone表示など「インストールされた後」の設定に目が行きがちです。

でもscreenshotsやdescriptionを見ると、Manifestはインストール前の体験にも使えることが分かります。

```text
name
↓
何というAppか

icons
↓
どんなアイコンか

description
↓
何をするAppか

screenshots
↓
どんなAppなのか画像で見せる
```

これはかなりアプリストアに近い考え方です。

Webから直接インストールするPWAでも、インストール前に「何がホーム画面へ追加されるのか」をユーザーへ伝えられます。

## 必須ではない。でも見せ方を作り込むなら面白い

`screenshots` は、PWAを作る時に最初から必ず設定する項目ではありません。

名前、アイコン、start_url、displayなどを先に整えれば、PWAの基本構成は作れます。

その上で、インストールする前のユーザーへもう少し情報を見せたい時にscreenshotsを追加する。

特にAndroid ChromeのようにインストールUIで利用される環境では、ただ「インストールしますか？」と聞くだけではなく、そのPWAをホーム画面へ置く意味まで見せられます。

**screenshotsはPWAを成立させる機能ではなく、PWAを選んでもらうための機能。**

私は実際にプラグインへ追加してみて、そんな位置付けが一番しっくりきました。

次はこのシリーズの最後として、ここまで見てきたManifestの項目をまとめます。「結局manifest.jsonはどこまで書けばいいのか」を、最低限・推奨・用途別に整理してみます。
