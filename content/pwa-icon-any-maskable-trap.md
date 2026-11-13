# 【悲報】any maskable すら罠だった｜PWAアイコンは2つに分けて書くべき理由

PWAのアイコン指定では、`purpose: "maskable"` 単体よりも `purpose: "any maskable"` の方が認識されやすく、挙動が安定するという話を以前書きました。

実際、それに変えてからiPhone、Android、PC Chromeでの検証はかなりスムーズになったんです。

**……が、さらにディープに検証を進めると、新たな罠が待ち受けていました。**

> <strong>「any maskable は便利だけど、アイコンの『見た目』まで完璧に最適化してくれる魔法の呪文ではない」</strong>

ここを混同すると、AndroidとiPhoneで同じ画像を使い回したときに、どちらかの見た目が確実に崩れます。数時間を溶かして得た、その原因と解決策をシェアします。



## 🛠️ 最初は any maskable が正解だと思っていた

そもそも最初にハマったのは、`purpose: "maskable"` だけを指定していたことでした。
PC Chromeでのインストールが不安定になったり、iPhoneで想定外の古いアイコンが使われたり……。

そこで、次のように書き換えました。

```json
{
  "icons": [
    {
      "src": "/icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

これで一気に挙動が安定したため、「PWAアイコンはこれ1枚で完全攻略だ！」と確信しました。

しかし、これはあくまで<strong>「ブラウザに正しく認識されやすい」</strong>という技術的な話。
<strong>「それぞれのOSで一番美しく見えるか」</strong>は、全くの別問題だったのです。



## 🤖 Androidは「切り抜き前提」で少し小さく作る

Androidのmaskableアイコンは、端末やランチャーによって「丸」「角丸」「しずく型」「四角」と、形が自由に変形します。

どんな形に切り抜かれてもロゴや文字が欠けないよう、Androidの仕様では<strong>「中心の約80%の安全領域（セーフゾーン）に要素を収める」</strong>というルールがあります。つまり、最初から外側を「切られる前提」で余白を多めに、中央に小さく作る必要があります。

そうしないと、丸型に切り抜かれたときにロゴの端が削れ、かなり窮屈な見た目になってしまいます。



## 🍏 iPhoneは逆に、そのまま大きく見せたい

一方で、iPhone（iOS）のホーム画面アイコンは思想が異なります。

iPhoneでは、入稿された四角い画像をそのまま綺麗にマスク（角丸化）して表示します。Androidのmaskableのように、形状が激しく変わるわけではありません。

そのため、Android用に中央へ小さく寄せた（余白たっぷりの）アイコンをそのままiPhoneで使い回すと、**今度はロゴや顔のマークが中央に縮こまってしまい、めちゃくちゃ貧相に見える**のです。

- **1枚の画像で兼ねようとすると……**
  - Androidに合わせる ➡️ iPhoneで中央が小さく縮こまる
  - iPhoneに合わせる ➡️ Androidでロゴの端が切り取られる

 	
 	

 	

このデザイン上の矛盾を1枚の `any maskable` で解決するのは、物理的に不可能です。



## 💡 結論：manifest.jsonで2枚に分けろ

行き着いた結論はシンプルです。 **「通常表示用」と「Androidのmaskable用」で、manifest.jsonに2つのアイコンを別々に定義する。** これが一番確実で綺麗です。

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

- <strong>`/icon-512.png`（purpose: "any"）</strong>
  iPhoneやPCブラウザ用。余白を攻めて、ロゴを限界まで大きく見せる美しさ最優先のアイコン。
- <strong>`/icon-512-maskable.png`（purpose: "maskable"）</strong>
  Android専用。どんな形に切り抜かれても耐えられるよう、要素を中央8割に収めた安全性最優先のアイコン。

 	
 	

<table style="border-collapse: collapse; width: 100%; text-align: left;" border="1">
<thead>
<tr style="background-color: #f2f2f2;">
<th style="padding: 8px;">アイコンの種類</th>
<th style="padding: 8px;">主なターゲット</th>
<th style="padding: 8px;">デザインの考え方</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding: 8px;"><strong>通常アイコン (<code>any</code>)</strong></td>
<td style="padding: 8px;">iPhone / PC Chrome</td>
<td style="padding: 8px;">余白は少なめ。そのまま大きく綺麗に見せる</td>
</tr>
<tr>
<td style="padding: 8px; background-color: #fafafa;"><strong>Maskableアイコン (<code>maskable</code>)</strong></td>
<td style="padding: 8px; background-color: #fafafa;">Androidのホーム画面</td>
<td style="padding: 8px; background-color: #fafafa;">余白は多め。中央に少し小さく配置する</td>
</tr>
</tbody>
</table>



## ⚠️ apple-touch-icon を置くべきか否かの分岐点

ここでiOS対策として、HTML側の `<link rel="apple-touch-icon">` をどうするべきかという問題が出てきます。

```html
<link rel="apple-touch-icon" href="/icon-512.png">
```

ブログやコーポレートサイトのように、<strong>「全ページ共通の固定アイコン（ロゴなど）」</strong> で問題ないサービスであれば、これを記述して通常アイコン（`any`用）を指定しておくのが正解です。iPhone側で最優先で綺麗に拾ってくれます。

ただし、**OJappやPetalのように「ページごと、ユーザーごとにホーム画面のアイコンを動的に変えたい」サービスの場合は、大いなる罠になります。**

headタグに固定の `apple-touch-icon` が鎮座していると、各ユーザー固有のアイコン（名刺や個人の入口）をホーム画面に作ろうとした際、固定の共通ロゴに強制的に吸い取られて上書きされてしまう現象が起きます。

そのため、動的にアイコンを変える思想のプロダクトでは、 **「apple-touch-iconをページごとにJSで動的に書き換える」か、「あえて置かずにmanifestのany指定側に制御を任せる」** という割り切りが必要です。



## 🚀 今回のおすすめ完全構成

現時点で、仕様の落とし穴をすべて回避できる「僕のリアルな答え」がこの構成です。

**【manifest.json】**

```json
{
  "name": "Sample PWA",
  "short_name": "Sample",
  "start_url": ".",
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

**【HTML（※固定アイコンでいいサイト限定）】**

```html
<link rel="apple-touch-icon" href="/icon-512.png">
```

※動的にアイコンが変わるアプリでは、このHTML記述は慎重に外すか、動的制御を仕込んでください。ここを雑にやると、「manifestを修正したのにiPhoneだけ古いアイコンのまま直らない」という暗黒のキャッシュ地獄に突入します。



## 🏁 まとめ：any maskable は万能薬ではない

誤解のないように言うと、`any maskable` という仕様自体は素晴らしいものです。手軽に1枚の画像で「インストール可能なPWA」として体裁を整えたいだけなら、これほど便利な指定はありません。

しかし、**プロダクトの顔であるアイコンの美しさに1ミリも妥協したくない**のであれば、技術の都合（1枚で済ませる）にデザインを合わせるべきではありません。

OSごとのデザイン思想に敬意を払い、`any` と `maskable` の2枚にしっかり分けて作り込む。
これが、罠だらけのPWAアイコン宇宙をサバイブする、現在のベストプラクティスです。



### 🔗 関連記事

- [PWAとは？スマホのWebサイトを“アプリ化”する仕組みをわかりやすく解説](https://tips.ojapp.app/what-is-pwa/)
- [PWAの作り方｜manifest.json・Service Worker・ホーム画面対応を丁寧に解説](https://tips.ojapp.app/how-to-pwa/)
- [iPhoneのアイコンが更新されない理由｜Safariが保持する“影キャッシュ”の正体を徹底解説](https://tips.ojapp.app/icon-not-updating-shadow-cache/)
