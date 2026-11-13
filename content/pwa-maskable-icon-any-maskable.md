
PWAのアイコンをAndroidで綺麗に表示したくて、`purpose: "maskable"` を試していました。

Androidでは、ホーム画面アイコンの形状（丸、角丸、しずく型、四角など）が端末やランチャーによって異なります。そのため、通常の正方形アイコンだけだと、端が切り取られたり、不自然な余白ができたりします。

![](スクリーンショット-2026-05-31-160043.png)

それを解決するのが**maskableアイコン（マスカブルアイコン）** です。名前の響きからして「Android向けPWAなら必須の指定だろう」と思い、さっそく実装したのですが……これが思った以上に深い沼でした。



## 【結論】1枚のアイコンで済ませるなら `any maskable` が最適解

結論から言うと、今回の検証では `purpose: "maskable"` 単体よりも、`purpose: "any maskable"` と指定した方が圧倒的に挙動が安定しました。

さらに、iOS（Safari）環境では `apple-touch-icon` の記述が予想以上に強く干渉するため、こちらも合わせて注意が必要です。



## 最初に試した書き方と、発生した怪現象

maskableアイコンについて調べると、よく次のような実装例が出てきます。

```json
{
  "icons": [
    {
      "src": "icon-192-maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

「なるほど、maskable専用のアイコンを用意して、`purpose: "maskable"` と書けばいいんだな」と、最初は誰もが素直に実装すると思います。今回の検証でも、まずは以下のように指定してみました。

```json
{
  "icons": [
    {
      "src": "/icon.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

しかし、この状態でiPhone、Android、PC Chromeでホーム画面追加やインストールを試すと、次のような不穏な挙動が発生したのです。

- **PC Chrome:** インストール（PWA化）の挙動が不安定になる
- **Android:** 既存の別アプリと同じアイコン扱いになるような奇妙な挙動が発生
- **iPhone:** まったく想定していない favicon などの別画像がアイコンに採用される

 	
 	
 	

「maskableを入れると、PWAの判定自体がおかしくなるのか？」と疑いましたが、原因は仕様の理解不足にありました。



## 原因：`maskable` 単体指定は「通常アイコン」を失う

検証を重ねた結果、次のように修正したことで、すべての環境で嘘のように安定しました。

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

問題はmaskableという仕組みそのものではなく、<strong>`purpose` の指定方法</strong>にありました。

`purpose: "maskable"` とだけ書くと、そのアイコンは<strong>「maskable対応の場所（Androidのホーム画面など）専用」</strong>として扱われます。
しかし、PWAのアイコンが使われる場所はホーム画面だけではありません。アプリ一覧、タスク切り替え画面、ブラウザ内の通知、インストールポップアップなど、多岐にわたります。

これらが「通常のアイコン（any）」を求めたとき、`maskable` 指定のアイコンしかないと、ブラウザ側が処理に困ってフォールバック（代替画像への切り替え）を起こしてしまうのです。

> **💡 本来の丁寧な書き方**
> 通常用とmaskable用で画像をそれぞれ用意し、複数指定するのが王道です。
> 
> 
> ```text
"icons": [
  { "src": "/icon.png", "sizes": "512x512", "purpose": "any" },
  { "src": "/icon-maskable.png", "sizes": "512x512", "purpose": "maskable" }
]
```

ただ、サービスによっては「ページごと」「ユーザーごと」にアイコンを動的に出し分けたいケースもあります。その場合、1つのアイコンに対して常に2枚の画像（any用・maskable用）を管理・生成するのはコストが高すぎます。

そのため、<strong>1枚の画像でどちらの用途も兼任させられる `purpose: "any maskable"`</strong> が、現実的な最適解になります。



## さらに時間を溶かした強敵：`apple-touch-icon` の罠

今回の検証で、maskable以上に厄介だったのが、iPhone（iOS Safari）における `apple-touch-icon` の挙動です。

HTMLの `<head>` 内に、昔からよくある以下の記述を残していないでしょうか？

```html
<link rel="apple-touch-icon" href="/icon.png">
```

検証した限り、iOSで「ホーム画面に追加」を行う際、アイコンの参照優先順位は以下のようになっている印象を受けました。

1. `apple-touch-icon` （最優先）
2. manifest.json の `icons`
3. その他のfaviconやルートの画像ファイル

 	
 	
 	

つまり、どれだけ `manifest.json` 側を書き換えて検証していても、HTML側にこのタグが1行残っているだけで、iPhoneは `manifest.json` を無視して `apple-touch-icon` で指定された画像を頑なに表示し続けます。

「manifestを修正したのにiPhoneだけアイコンが変わらない！」という泥沼にハマったら、まずこのタグの存在を疑ってください。



## 「固定アイコン」か「動的アイコン」かで使い分ける

もちろん、`apple-touch-icon` が悪者というわけではありません。一般的なブログやコーポレートサイト、アプリロゴが1つだけのシンプルなPWAであれば、このタグを書いておくことでiOSでの表示が最も安定します。

しかし、以下のような<strong>「ページやユーザーごとにホーム画面アイコンを動的に変えたい」</strong>という設計思想を持つサービスでは、この固定タグが致命的な足枷になります。

- **Petalのように：** サービス共通ロゴではなく、ユーザー個人の「デジタル名刺」や「専用の入り口」としてホーム画面に置かせたい場合
- **OJappのように：** 特定のURLやカテゴリーページを、独立したミニアプリのような感覚でホーム画面にピン留めさせたい場合

 	
 	

こうした動的なアプローチを取る場合、固定の `apple-touch-icon` が残っていると、どのページを追加してもすべて同じ共通ロゴに吸い上げられてしまいます。そのため、<strong>あえて `apple-touch-icon` を記述せず、manifest.json（または動的に書き換えるmanifest）の制御に一本化する</strong>という選択肢が重要になってきます。



## まとめ：今回行き着いた「一番安定した構成」

1枚のアイコン画像を使い回しつつ、各OSでの挙動を安定させ、かつ将来的な動的アイコン化にも対応できる構成がこちらです。

### 1. manifest.json

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

### 2. HTML (<head>内)

```html
<!-- 動的アイコンを阻害しないよう、固定の apple-touch-icon はあえて置かない -->
<!-- <link rel="apple-touch-icon" href="/icon.png"> -->
```

PWAのアイコン周りは、仕様書通りに書けば動くほど甘くなく、OSやブラウザ固有のキャッシュ、そして過去の遺物（レガシーなタグ）の優先度などが複雑に絡み合う非常に泥臭い領域です。

Android、iPhone、PC Chromeのすべてで実機検証を行う。これを怠ると、簡単に数時間が溶けるのでご注意を！



### 📢 PWA開発に役立つ関連記事

- [PWAとは？スマホのWebサイトを“アプリ化”する仕組みをわかりやすく解説](https://tips.ojapp.app/what-is-pwa/)
- [PWAの作り方｜manifest.json・Service Worker・ホーム画面対応を丁寧に解説](https://tips.ojapp.app/how-to-pwa/)
- [iPhoneのアイコンが更新されない理由｜Safariが保持する“影キャッシュ”の正体を徹底解説](https://tips.ojapp.app/icon-not-updating-shadow-cache/)
