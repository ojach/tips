ここまで5記事にわたって、2026年現在のPWAを昔から言われてきた常識と照らし合わせながら見直してきました。</p>

Service Workerはインストールの必須条件ではない。

Manifestだけでもホーム画面へのインストール、アイコン、名前、start_url、standalone表示まで作れる。

scopeはアプリのナビゲーション範囲を決め、idはアプリそのものの識別に使われる。

screenshotsを追加すれば、対応環境ではインストール前の見せ方まで拡張できます。

ここまで分かると、最後に1つ疑問が残ります。

**結局、manifest.jsonにはどこまで書けばいいのでしょうか。**

検索すると巨大なManifestのサンプルも出てきますが、最初から全部を書く必要はありません。

今回はこのシリーズのまとめとして、Manifestを「まず用意したい基本項目」「設計によって追加する項目」「必要な機能がある時だけ追加する項目」に分けて整理します。

## まず覚えておきたいのは「全部入りManifest」は必要ないこと

Web App Manifestには多くのメンバーがあります。

例えば、

```text
name
short_name
icons
start_url
display
id
scope
theme_color
background_color
description
screenshots
shortcuts
```

などがあります。

これだけ並ぶと、PWAを作るには全部設定しないといけないように見えます。

でも、そうではありません。

Manifestは「使う機能に応じて情報を追加していく」と考えた方が分かりやすいです。

## まずはPWAの基本情報から始める

最初に作るなら、例えば次のような小さなManifestから考えられます。

```json
{
  "name": "My App",
  "short_name": "My App",
  "start_url": "/",
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

名前。

アイコン。

起動するURL。

表示方法。

まずはこのあたりから考えれば、PWAの基本構造が見えやすくなります。

[PWA開発を一瞬で終わらせる「とりあえず入れるPWA」](https://tips.ojapp.app/minimal-pwa-quick-start/)でも、最初から機能を詰め込みすぎない構成を紹介しています。

## nameとshort_nameはAppの名前

`name` はPWAの名前です。

```text
"name": "OJapp PWA LAB"
```

`short_name` は、表示スペースが限られている場合に使える短い名前です。

```text
"short_name": "PWA LAB"
```

両方を設定しておけば、ブラウザやOSが利用できる表示領域に応じて扱えます。

ただし、Manifestへshort_nameを書けば全OSのホーム画面で必ずその文字列がそのまま表示される、という意味ではありません。

最終的な表示はプラットフォーム側にも依存します。

## iconsはホーム画面で最も目立つ部分

`icons` では、PWAで利用するアイコン画像を指定します。

```text
"icons": [
  {
    "src": "/icon-512.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "any"
  }
]
```

Androidも考えるなら、maskable用画像を別に用意する方法もあります。

```json
{
  "src": "/icon-maskable-512.png",
  "sizes": "512x512",
  "type": "image/png",
  "purpose": "maskable"
}
```

PWA LABでは、1枚の画像へ `any maskable` をまとめて指定するより、通常用とmaskable用を分けた方が端末ごとの切り抜きに対応しやすいケースを確認しています。

ホーム画面に置かれた後は、このアイコン自体が再訪の入口になります。

## start_urlは「どこから始めるAppなのか」を決める

`start_url` は、ホーム画面などからPWAを起動した時の入口です。

サイト全体を1つのAppにするなら、

```text
"start_url": "/"
```

特定のツールなら、

```text
"start_url": "/timer/"
```

という設計ができます。

私が1P1Aで使っている、

```text
"start_url": "."
```

という相対指定もあります。

ただし `.` は現在表示しているページを自動取得する特殊命令ではありません。ManifestのURLを基準に解決されるため、動的Manifestなど適切な構成と組み合わせて使います。

[PWAのstart_urlは何を指定すべき？トップ・現在ページ・専用URLの違い](https://tips.ojapp.app/pwa-start-url-top-current-page-dedicated-url/)では、この設計を詳しく整理しています。

## displayはまずstandaloneから考えやすい

PWAらしい表示にしたいなら、基本として扱いやすいのが、

```text
"display": "standalone"
```

です。

対応環境では通常のブラウザタブとは異なる、独立したアプリに近い表示で起動できます。

`fullscreen` もありますが、画面全体を使うこと自体に意味があるツールやゲームなどで検討すれば十分です。

Manifestに書いたdisplayが実際にどう表示されるかは、OSやブラウザによって差があります。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>最初からManifest全部盛りにしなくても、名前・アイコン・入口・表示方法から始めればいいんだね👻</div>
</div>

## ここから先はAppの設計によって変わる

基本部分を作った後は、「どんなPWAを作るのか」で必要な項目が変わります。

特に重要なのが `id` と `scope` です。

この2つは見た目を飾る設定ではありません。

PWAの識別と境界に関わります。

## idはAppの識別を安定させたい時に使う

例えば、

```text
"id": "/my-app/"
```

と設定すると、その値をPWAの識別子として使えます。

固定された1つのPWAを長く運用し、将来start_urlを変更する可能性があるなら、明示したidには意味があります。

一方、idは省略できます。

有効なidが指定されていない場合は、start_urlがアプリの識別に使われます。

そのため1P1Aのようなページ単位の動的PWAでは、start_urlによる識別を利用し、idをあえて増やさない設計もできます。

## scopeはAppのナビゲーション境界を決める

`scope` は、そのPWAとして扱うナビゲーション範囲を指定します。

```text
"scope": "/app/"
```

なら、`/app/` 以下をそのPWAの範囲として扱う設計です。

サイト全体を1つのAppにするなら、

```text
"scope": "/"
```

という設計も自然です。

一方、同じサイトへ複数PWAを作る場合、何となく全てへ `scope: "/"` を設定すると、アプリ境界が重なることがあります。

PWA LABではAndroidでこの問題を実際に経験しました。

scopeを省略する設計も含め、どこまでを1つのAppとして扱いたいかで決める項目です。

## id・start_url・scopeは3つに分けると分かりやすい

```text
id
↓
どのAppなのか

start_url
↓
どこから始まるのか

scope
↓
どこまでがAppなのか
```

この3つを別々に考えるだけでも、Manifestはかなり理解しやすくなります。

特に複数PWAを作るなら、前の記事[PWAのmanifest idとは？省略するとどうなる？複数インストールとの関係](https://tips.ojapp.app/pwa-manifest-id-multiple-install/)で扱ったidの意味も重要になります。

## theme_colorとbackground_colorは必要に応じて追加

色に関する項目もあります。

```text
"theme_color": "#111111",
"background_color": "#ffffff"
```

`theme_color` は対応するブラウザやOSのUIへテーマ色のヒントを与えます。

`background_color` は、対応環境でアプリ起動時などの背景色として利用されることがあります。

ブランドカラーを持つPWAなら設定しておくと統一感を作れます。

ただし、どこへどう反映されるかはブラウザやOSによって異なります。

## descriptionはAppの説明

Manifestには説明文も設定できます。

```text
"description": "A simple image compression tool that runs in your browser."
```

これはPWAが何をするものなのかを説明するメタデータです。

対応するインストールUIや配布環境で利用される可能性があります。

ユーザーにインストール前の情報をしっかり見せたいなら追加を検討できます。

## screenshotsはインストール前の見せ方を強化する

さらに、

```text
"screenshots": [
  {
    "src": "/screenshots/app.webp",
    "sizes": "1280x720",
    "type": "image/webp",
    "form_factor": "wide",
    "label": "App preview"
  }
]
```

のようにscreenshotsを追加できます。

これはPWAの必須項目ではありません。

対応するインストールUIなどで、PWAの画面や特徴を事前に見せるための情報です。

「インストールさせるための条件」というより「インストール前のプレゼンテーション」と考えると分かりやすいです。

## shortcutsはAppの中への近道を作る

Manifestには `shortcuts` もあります。

```text
"shortcuts": [
  {
    "name": "New Post",
    "url": "/new/"
  },
  {
    "name": "Analytics",
    "url": "/analytics/"
  }
]
```

対応するOSやブラウザでは、インストールされたPWAのアイコンから特定機能へのショートカットを提供できます。

これも全PWAに必要な機能ではありません。

よく使う機能への入口が複数あるAppなら追加する、という考え方で十分です。

## 用途別に考えるとManifestはもっと簡単になる

結局、Manifestに何を書くかはPWAの目的で決まります。

<table>
<thead>
<tr><th>用途</th><th>考えたい項目</th></tr>
</thead>
<tbody>
<tr><td>まずホーム画面Appを作る</td><td>name / short_name / icons / start_url / display</td></tr>
<tr><td>長期運用する固定PWA</td><td>基本項目 + id</td></tr>
<tr><td>サイト全体を1つのAppにする</td><td>基本項目 + id / scope</td></tr>
<tr><td>ページ単位で複数Appを作る</td><td>動的start_url / icons / name、id・scopeは設計に応じて判断</td></tr>
<tr><td>ブランド感を整える</td><td>theme_color / background_color</td></tr>
<tr><td>インストール前の説明を強化する</td><td>description / screenshots</td></tr>
<tr><td>App内の機能へ直接移動させる</td><td>shortcuts</td></tr>
<tr><td>オフライン対応する</td><td>ManifestではなくService Workerなどを別途実装</td></tr>
</tbody>
</table>

## Service Workerはmanifest.jsonの項目ではない

このシリーズで一番整理しておきたかったのがここです。

Service WorkerはManifestのメンバーではありません。

ManifestとService WorkerはPWAで一緒に使われることが多いですが、役割は別です。

```text
Web App Manifest
↓
名前
アイコン
起動URL
表示方法
Appの識別・境界
インストール前の情報

Service Worker
↓
ネットワーク制御
オフライン
明示的なキャッシュ戦略
Pushなどに必要なバックグラウンド処理
```

そして2026年現在、Service WorkerはPWAをインストールするためだけの必須条件ではありません。

必要な機能がある時に追加する技術として考えた方が、PWA全体を理解しやすくなります。

## 私なら最初はこれくらいから始める

普通のWebページやWebツールをPWA化するなら、私はまず次の程度から始めます。

```json
{
  "name": "My App",
  "short_name": "My App",
  "start_url": "/",
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
    },
    {
      "src": "/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

そこから必要に応じて、

```text
id
scope
theme_color
background_color
description
screenshots
shortcuts
```

を足していきます。

最初から巨大なManifestをコピーするより、「この1行は何のために必要なのか」を理解しながら増やした方が、後から挙動がおかしくなった時にも原因を追いやすくなります。

## 昔のPWAチェックリストから一度離れてみる

PWAには長い歴史があります。

その中で、

```text
Manifestを書く
Service Workerを書く
オフライン対応する
Push通知を付ける
インストールできるようにする
```

という一式が、PWAの完成形として語られることも多くありました。

でも2026年現在、PWAを作る時に全部を最初から背負う必要はありません。

ホーム画面への入口だけ欲しいなら、そこから始める。

オフラインが必要ならService Workerを追加する。

固定されたAppの識別を安定させたいならidを使う。

Appの範囲を明示したいならscopeを使う。

インストール前の見せ方を作り込みたいならscreenshotsを使う。

**Manifestは「全部書く設定ファイル」ではなく、「そのWeb Appに必要な情報を書く設定ファイル」です。**

この考え方に変えるだけで、PWAはかなり小さく、分かりやすく始められます。

## 2026年のPWAは必要なものから作ればいい

今回の6記事では、昔から言われてきたPWAの常識を現在の環境でもう一度確認してきました。

Service Workerはインストールだけなら必須ではない。

Manifestだけでもかなりの部分まで作れる。

scopeはAppの境界を作る。

idはAppを識別する。

screenshotsはインストール前の見せ方を拡張する。

そしてmanifest.jsonは、全部入りにする必要はない。

PWAという名前に合わせて機能を増やすのではなく、作りたいWeb Appに必要な機能を選ぶ。

私は実機でPWAを触り続けてきて、この考え方が一番シンプルだと感じています。

昔のサンプルをそのままコピーするのではなく、今のブラウザで試しながら必要な項目だけを選ぶ。

2026年のPWAは、そのくらい軽いところから始めてもいいと思います。
