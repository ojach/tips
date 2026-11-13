HTMLを書き始めると、最初の方に出てくる `<head>`。</p>

`title` や `meta`、favicon、OGPなど色々なものを書けますが、いざ自分でWebサイトを作ると「結局、何を書いておけばいいの？」となりがちな場所でもあります。

しかも昔のHTMLテンプレートを参考にすると、今ではほとんど意味のないmetaタグまで大量に入っていることがあります。

そこで今回は、**新しくWebサイトを作ったらheadに書いておきたい内容**を、実際に使いやすい形でまとめます。

## まずはheadの完成形

細かい説明の前に、まずは基本形を見てみます。

```html
<head>
  <meta charset="UTF-8">

  <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

  <title>ページタイトル</title>

  <meta name="description"
        content="このページの説明">

  <link rel="canonical"
        href="https://example.com/page/">

  <meta property="og:title"
        content="ページタイトル">

  <meta property="og:description"
        content="このページの説明">

  <meta property="og:image"
        content="https://example.com/ogp.jpg">

  <meta property="og:url"
        content="https://example.com/page/">

  <meta property="og:type"
        content="website">

  <meta name="twitter:card"
        content="summary_large_image">

  <link rel="icon"
        href="/favicon.ico">
</head>
```

もちろん、すべてのWebサイトでこの内容が必須というわけではありません。

サイトの用途によって必要なものを選べばOKです。

## まず書いておきたい基本設定

### 文字コードを指定するcharset

```html
<meta charset="UTF-8">
```

ページで使用する文字コードを指定します。

現在Webサイトを新しく作るなら、基本的には `UTF-8` で問題ありません。

日本語の文字化けを防ぐためにも、headのかなり上の方へ書いておきたい設定です。

### スマホ表示に重要なviewport

```html
<meta name="viewport"
      content="width=device-width, initial-scale=1.0">
```

スマートフォンなどでページをどのような幅・倍率で表示するかをブラウザへ伝えます。

レスポンシブなWebサイトを作るなら、ほぼ最初から入れておくものと考えていいでしょう。

これがないと、スマホで見たときにPC向けページを縮小したような表示になることがあります。

### ページ名を決めるtitle

```text
<title>ページタイトル</title>
```

`title` はブラウザのタブなどに表示されるページタイトルです。

検索エンジンがページの内容を理解するうえでも重要な情報なので、ページごとに内容の分かるタイトルを設定します。

全部のページを「〇〇公式サイト」のような同じタイトルにしてしまうより、それぞれのページ内容が分かるようにした方が親切です。

### ページ内容を説明するdescription

```html
<meta name="description"
      content="このページの説明">
```

ページの概要を伝えるmetaタグです。

検索結果の説明文として利用される場合もありますが、必ずそのまま表示されるわけではありません。

`title` と同じように、ページごとの内容に合わせて設定しておくといいでしょう。

## SEOを考えるならcanonicalも確認したい

```html
<link rel="canonical"
      href="https://example.com/page/">
```

`canonical` は、似たURLで同じようなコンテンツへアクセスできる場合などに「このページの代表URLはこちら」と検索エンジンへ伝えるために使います。

例えばQuery Parameterなどによって複数のURLからほぼ同じページが表示されるサイトでは、URLの整理に役立つことがあります。

ただし、とりあえず何でもトップページへcanonicalを向ければいいわけではありません。

基本的には、そのコンテンツの正規URLを指定します。

## SNSで共有されるならOGPも入れておきたい

WebページがSNSやメッセージサービスなどで共有されたとき、タイトルや画像を分かりやすく表示するために使われるのがOGPです。

```html
<meta property="og:title"
      content="ページタイトル">

<meta property="og:description"
      content="このページの説明">

<meta property="og:image"
      content="https://example.com/ogp.jpg">

<meta property="og:url"
      content="https://example.com/page/">

<meta property="og:type"
      content="website">
```

特に `og:image` は、リンクを共有したときの見た目を大きく左右します。

ブログなら記事ごとのアイキャッチ画像を指定するなど、ページごとに変更できるようにしておくと使いやすくなります。

### Xなどを考えるならTwitter Cardも

```html
<meta name="twitter:card"
      content="summary_large_image">
```

大きな画像付きカードとして表示させたい場合によく使われる指定です。

OGPと合わせて設定しておけば、SNSへURLを投稿したときの見栄えを整えやすくなります。

## faviconも忘れやすい

```html
<link rel="icon" href="/favicon.ico">
```

faviconは、ブラウザのタブやブックマークなどで使われるサイトのアイコンです。

サイト自体はfaviconがなくても動きますが、公開するWebサイトなら用意しておきたいところです。

小さな部分ですが、サイト名だけのタブよりアイコンがある方が見分けやすくなります。

## 逆に、昔のテンプレートにある「化石metaタグ」には注意

ここからがちょっと面白いところです。

古いHTMLテンプレートを検索したり、昔作られたWebサイトのheadを見たりすると、現在ではほとんど必要のないmetaタグが残っていることがあります。

昔必要だったからといって、今も全部コピペする必要はありません。

### meta keywords

```html
<meta name="keywords"
      content="Web制作,HTML,SEO,ホームページ">
```

昔のSEOではよく見かけたmetaタグです。

ページに関連する検索キーワードをカンマ区切りで大量に書いていた時代がありました。

しかし、現在Googleは `meta keywords` をWeb検索のランキングには使用していません。

SEO目的で「狙っているキーワードを全部ここへ書かなきゃ」と頑張る必要はありません。

### revisit-after

```html
<meta name="revisit-after"
      content="7 days">
```

「7日後にまたクロールしてください」のような意味を期待して使われていたmetaタグです。

これを書けばGooglebotが指定した間隔で来てくれる、というものではありません。

検索エンジンのクロール頻度をこのmetaタグで自由に指定できるわけではないので、新しくサイトを作るときに入れる必要はありません。

### distribution

```html
<meta name="distribution"
      content="global">
```

コンテンツの配布範囲を示す目的で見かけることがあったmetaタグです。

普通のWebサイトを作るうえで、現在わざわざ追加する必要はありません。

### rating

```html
<meta name="rating"
      content="general">
```

コンテンツの対象区分を示そうとする古い指定として残っていることがあります。

これも一般的なWebサイトのheadへ、とりあえず入れておくようなものではありません。

### generatorは必要なときだけ

```html
<meta name="generator"
      content="WordPress">
```

`generator` は少し種類が違って、完全に「使えないタグ」というわけではありません。

どのソフトウェアやツールでページを生成したのかを示すための情報です。

ただし、自分で静的なWebサイトを作るときに必須のmetaタグではありません。

使用しているCMSなどが自動出力することもあるため、「headにはこれを書くもの」と思って手動で追加する必要はないでしょう。

## metaタグは多ければ多いほど良いわけではない

headを勉強し始めると、色々なmetaタグを見つけて全部入れたくなることがあります。

でも、headは設定コレクションではありません。

**自分のページに必要な情報だけを書けば十分です。**

まずは、

- charset
- viewport
- title
- description

  
  
  
  

あたりを基本として、サイトに合わせてcanonical、OGP、faviconなどを追加していく。

そのくらいから始める方が分かりやすいと思います。

## ホーム画面への追加も考えるならmanifestもある

ここまでで、普通のWebサイトとして使うheadはかなり整ってきました。

そして、せっかくheadを触っているなら、もう1つ知っておいても面白いものがあります。

```html
<link rel="manifest"
      href="/manifest.json">
```

Web App Manifestです。

manifestを使うと、Webサイトをスマートフォンのホーム画面へ追加するときの名前、アイコン、起動URL、表示方法などを設定できます。

[PWAとは何かはこちらの記事で詳しく解説しています。](https://tips.ojapp.app/what-is-pwa/)

さらに「そこまで本格的なPWA開発はいらない」という場合は、[PWA開発を一瞬で終わらせる「とりあえず入れるPWA」](https://tips.ojapp.app/minimal-pwa-quick-start/)くらいの軽い始め方でも十分です。

## Webサイトを作ったらheadも一度見直してみよう

Webサイトはbodyの中身が目立つので、headは最初にテンプレートを作ったら放置しがちです。

でもheadには、文字コード、スマホ表示、検索結果、SNS共有、サイトアイコンなど、ページの外側で使われる大切な情報が集まっています。

逆に、昔のテンプレートをそのまま使っていると、現在では意味のないmetaタグが何年も残っていることもあります。

新しくWebサイトを作ったときは、昔のテンプレートを丸ごとコピーするのではなく、<strong>「これは今も何のために書いているのか？」</strong>を一度確認してみるといいと思います。
