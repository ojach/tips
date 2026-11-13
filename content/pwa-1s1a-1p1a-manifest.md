たった `"/"` と `"."` の違いが、PWAの設計そのものを変える。

PWA（Progressive Web Apps）を作るとき、Web App Manifestには `name`、`start_url`、`scope`、`icons` など、アプリとして動作するための情報を設定します。

一般的なPWAでは、1つのWebサイトに対して1つのManifestを用意します。

しかし、Web App Manifestの設計を少し変えると、PWAには大きく2つの考え方を作ることができます。

- **1S1A（One Site. One App.）**
- **1P1A（One Page. One App.）**

1S1Aは「1サイトを1つのアプリとして考える設計」。

1P1Aは「1ページを1つのアプリとして考える設計」です。

どちらが正しいというものではありません。

違うのは、**何を1つのアプリとして設計するか**です。

そして実際にこの2つをWeb App Manifestで実装してみると、単に `start_url` や `scope` の値が違うだけではありません。

**Manifestそのものの管理方法まで変わります。**



## 従来のPWAは1S1A

まず、一般的なPWAの構成を考えてみます。

例えば、次のようなWebサイトがあるとします。

```text
/
├─ index.html
├─ manifest.json
└─ tools/
   ├─ index.html
   ├─ tool1/
   ├─ tool2/
   └─ tool3/
```

サイト全体で1つの `manifest.json` を使用します。

各ページの `<head>` から同じManifestを読み込みます。

```html
<link rel="manifest" href="/manifest.json">
```

Manifestは例えばこのような形です。

```json
{
  "name": "My Tools",
  "short_name": "My Tools",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "icons": [
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

この設計では、

```text
/
├─ index.html       → /manifest.json
├─ tools/           → /manifest.json
│  ├─ tool1/        → /manifest.json
│  ├─ tool2/        → /manifest.json
│  └─ tool3/        → /manifest.json
```

というように、すべてのページが同じManifestを参照できます。

どのページからホーム画面へ追加しても、Manifestが定義しているのは同じアプリです。

これが、

**One Site. One App.（1S1A）**

という考え方です。

サイト全体を1つのアプリとして設計するため、Manifestも基本的には1つで済みます。



## 1P1Aでは「ページ」がアプリになる

では、考え方を変えてみます。

サイト全体ではなく、

```text
/tool1/
/tool2/
/tool3/
```

それぞれを独立したアプリとしてホーム画面へ追加したいとします。

例えば、

`tool1` は「画像圧縮ツール」。

`tool2` は「文字数カウンター」。

`tool3` は「QRコード生成ツール」。

それぞれ違う名前、違うアイコンを持ったアプリとしてホーム画面に置く設計です。

これが、

**One Page. One App.（1P1A）**

です。

ここで重要になるのがWeb App Manifestです。



## 1P1Aでは1つのManifestを共有できない

1S1Aでは、サイト全体で同じManifestを使えました。

しかし1P1Aでは事情が変わります。

例えば `tool1` のManifestは、

```json
{
  "name": "画像圧縮ツール",
  "start_url": ".",
  "scope": ".",
  "display": "standalone",
  "icons": [
    {
      "src": "/images/tool1.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

`tool2` なら、

```json
{
  "name": "文字数カウンター",
  "start_url": ".",
  "scope": ".",
  "display": "standalone",
  "icons": [
    {
      "src": "/images/tool2.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

となります。

当然ですが、

- `name`
- `short_name`
- `start_url`
- `scope`
- `icons`

などの値がページごとに変わります。

つまり、1P1Aを通常の静的なManifestで作ろうとすると、

```text
/
├─ index.html
│
├─ tool1/
│  ├─ index.html
│  └─ manifest.json
│
├─ tool2/
│  ├─ index.html
│  └─ manifest.json
│
└─ tool3/
   ├─ index.html
   └─ manifest.json
```

という構成になっていきます。

各ページから、それぞれ専用のManifestを読み込みます。

```html
<!-- tool1 -->
<link rel="manifest" href="/tool1/manifest.json">
```

```html
<!-- tool2 -->
<link rel="manifest" href="/tool2/manifest.json">
```

```html
<!-- tool3 -->
<link rel="manifest" href="/tool3/manifest.json">
```

3ページなら3つ。

10ページなら10個。

100ページをそれぞれアプリ化するなら、100ページ分のManifest情報を管理する必要があります。

> 実装だけを見ると、違いはかなり小さく見える！
>   1S1Aは、`"start_url": "/"`
>   1P1Aは、`"start_url": "."`

しかし、この小さな違いによって「サイト全体を1つのアプリとして扱うのか」「ページごとに別のアプリとして扱うのか」が変わり、Manifestの管理方法まで変わってきます。



## 1S1Aと1P1AではManifestの管理方法まで変わる

こうして比べてみると、違いがかなり分かりやすくなります。

### 1S1A

`"start_url": "/"`

```text
1サイト
   ↓
1つのManifest
   ↓
1つのアプリ
```

### 1P1A

`"start_url": "."`

```text
ページA → Manifest A → アプリA
ページB → Manifest B → アプリB
ページC → Manifest C → アプリC
```

1S1AではManifestをサイト単位で考えます。

1P1AではManifestをページ単位で考える必要があります。

つまり1P1Aは、単純に `start_url` を変えれば終わりという話ではありません。

**アプリの単位をサイトからページへ変えることで、Manifestを管理する単位そのものも変わる。**

これが実際に1P1Aを実装すると見えてくる大きな違いです。



## 1P1Aでは、Manifestをページごとに作らなければいい

ここで1つ問題があります。

ページごとにアプリを作れるのは面白い。

でも、ページが増えるたびにManifestを作るのは面倒です。

そこで別の方法を考えました。

**Manifestファイルを最初から作らず、ページを開いたときに生成すればいい。**

これが、OJapp 1P1Aで採用している方法です。

OJapp 1P1Aは、HTMLに1行追加するだけで利用できる無料のスクリプトです。フリーで公開しているため、どなたでもご利用いただけます。

OJapp 1P1Aでは、共通のJavaScriptを読み込ませます。

```html
<script src="https://ojapp.app/js/ojapp_1p1a.js"></script>
```

そして必要に応じて、各ページの `<head>` にタイトルとアイコンを指定します。

```html
<meta name="ojapp:title" content="画像圧縮ツール">
<meta name="ojapp:icon" content="/images/tool1.png">
```

別のページなら、

```html
<meta name="ojapp:title" content="文字数カウンター">
<meta name="ojapp:icon" content="/images/tool2.png">
```

これだけです。

JavaScript側が現在のページURLやタイトル、指定されたアイコンなどを取得し、そのページ専用のWeb App Manifestを動的に生成します。

そのため、

```text
/
├─ index.html
├─ tool1/
│  └─ index.html
├─ tool2/
│  └─ index.html
└─ tool3/
   └─ index.html
```

という普通のページ構成のまま、それぞれを別のアプリとして設計できます。

`tool1_manifest.json`

`tool2_manifest.json`

`tool3_manifest.json`

といったファイルを用意する必要はありません。



## 100ページでもManifestファイルは0個

この違いは、ページ数が増えるほど大きくなります。

従来の静的な方法で100ページをそれぞれ別アプリとして設計するなら、それぞれに異なるManifest情報が必要になります。

OJapp 1P1Aでは、それをファイルとして持ちません。

各ページには共通スクリプトを読み込ませ、必要ならページ固有の情報だけを指定します。

```html
<meta name="ojapp:title" content="アプリ名">
<meta name="ojapp:icon" content="/icon.png">

<script src="https://ojapp.app/js/ojapp_1p1a.js"></script>
```

ページが100個あっても、

<strong>静的な `manifest.json` は0個です。</strong>

ページ自身が持っている情報から、そのページ専用のManifestをその場で作るからです。



## PWAの設計単位は「サイト」だけではない

これまでPWAは、

**Webサイトをアプリ化する技術**

として説明されることが多くありました。

その考え方なら、1サイトに1つのManifestを置く構成はとても自然です。

しかしWeb App Manifestをページ単位で設計すると、

**Webページをアプリ化する**

という別の使い方が見えてきます。

サイトを1つのアプリとして扱うなら、1S1A。

ページを1つのアプリとして扱うなら、1P1A。

そして、この違いを実際に実装すると、

**Manifestをどの単位で管理するか**

という設計そのものまで変わります。

1P1Aの難しさは、ページをアプリにすること自体ではありません。

ページごとに異なるManifestをどう管理するかです。

だからOJapp 1P1Aでは、Manifestを大量に作るのではなく、**ページごとに動的生成する方法**を選びました。

PWAを「サイトをアプリにするもの」と決めてしまう必要はありません。

Web App Manifestの設計次第で、

**One Site. One App.**

にも、

**One Page. One App.**

にもできます。

これが、Web App Manifestから考える2つのPWA設計です。
