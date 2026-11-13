<div align="center">

# OJapp Tips

### Webを、もっと自由に。  
**Exploring PWAs, home screen apps, and the open web.**

[PWA・Web技術の記事を読む](https://tips.ojapp.app/) · [OJapp](https://ojapp.app/) · [OJapp Blog Kit](https://blogkit.ojapp.app/)

**日本語** | [English](#english)

</div>

---

## OJapp Tipsとは

**[OJapp Tips](https://tips.ojapp.app/)** は、PWA（Progressive Web Apps）、ホーム画面への追加、Webアプリの動作や設計を、実際に試しながら記録する技術ブログです。

「Webページはどこまでアプリになれるのか？」

ブラウザやOSごとの違い、Web App Manifestの挙動、インストール時の落とし穴などを、実装と実機検証を通して掘り下げています。成功例だけでなく、思ったとおりに動かなかったことも残しています。

### 主なテーマ

- **PWAとホーム画面** — iOS・Androidでの追加方法、起動、表示、アイコンの挙動
- **Web App Manifest** — `start_url`、`scope`、`id`、アイコンなどの設計と検証
- **1P1A / UDA** — 1ページを1アプリにする考え方、URLをアプリの入口として扱う発想
- **Web制作と実装** — JavaScript、HTML、CSS、静的サイト、軽量なツール作り
- **開発の記録** — 実験、仕様変更、トラブルとその解決過程

記事はこちら：**https://tips.ojapp.app/**

---

## Built with OJapp Blog Kit

このTipsは、**自作の静的ブログエンジン「OJapp Blog Kit」** で構築しています。

以前はWordPressで運営していましたが、記事を書くことに集中できる、もっと小さくて自由な仕組みが欲しくなり、Blog Kitを作りました。

> **Write freely. Own what you build.**  
> 自由に書く。積み重ねた価値は、自分のものにする。

Blog Kitは、WordPressのすべてを置き換えるためのものではありません。Markdownで記事を書き、自分のドメインで公開するための、シンプルなブログエンジンです。

- MarkdownとJSONで記事を管理
- Node.jsで静的HTMLを生成
- GitHubへのPushをきっかけにCloudflare Pagesで自動ビルド・公開
- 日本語・英語の記事に対応
- 検索、RSS、サイトマップ、OGP画像など、ブログに必要な機能を搭載
- データベースやWordPressの管理画面に依存しない構成

**このリポジトリは、Blog Kitを実際の技術ブログで運用している例でもあります。**

Blog Kitに興味がある方は、[OJapp Blog Kit](https://blogkit.ojapp.app/) をご覧ください。自分のブログを自分のドメインで持ちたい人のために公開しています。

> **補足：** このリポジトリはTipsの運営用です。Blog Kitの配布用テンプレートとは別です。

---

## OJapp Projects

OJappでは、「Webをもっと自由に使えるようにする」ことを軸に、さまざまなツールやサービスを作っています。

| プロジェクト | できること |
| --- | --- |
| **[OJapp FREE](https://ojapp.app/ojapp/)** | Webページやサイトを、スクリプト1行からホーム画面アプリとして扱う |
| **[OJapp PRO](https://ojapp.app/ojapp/)** | ホーム画面からの起動計測やオファー表示など、運用向け機能を追加する |
| **[OJapp Maker](https://ojapp.app/)** | URLをホーム画面から開くための入口を作る |
| **[MyApp](https://ojapp.app/)** | 自分のリンクやコンテンツをまとめたアプリ風ページを作る |
| **[Petal](https://ojapp.app/petal/)** | デジタル名刺と個人ページを中心にした、ゆるやかなつながりのサービス |
| **[OJapp Blog Kit](https://blogkit.ojapp.app/)** | Markdownで書いて、自分のドメインで公開する軽量ブログエンジン |

各プロジェクトの最新情報は [OJapp公式サイト](https://ojapp.app/) をご覧ください。

---

## このリポジトリについて

このリポジトリには、TipsのMarkdown記事、ページ、テンプレート、ビルドスクリプトなどが含まれています。

主な構成：

```text
content/        記事のMarkdown
pages/          固定ページ
public/         公開用アセット
templates/      HTMLテンプレート
scripts/        ビルド処理
articles.json   記事のメタ情報
site.json       サイト設定
```

公開サイトはGitHubとCloudflare Pagesを連携して運用しています。変更をPushすると、Cloudflare Pagesでビルドして反映されます。

記事はWebサイトでも公開しています。読む場合は [OJapp Tips](https://tips.ojapp.app/) のほうが見やすくなっています。

---

## ⭐ Support OJapp Tips

Tipsの記事や検証が参考になったら、**このリポジトリにStarを付けてもらえるとうれしいです。**

記事ごとの「いいね」の代わりに、Tipsという活動全体への応援として受け取ります。

新しい記事や検証結果は、引き続き [tips.ojapp.app](https://tips.ojapp.app/) で公開していきます。

---

<a id="english"></a>

## English

**[OJapp Tips](https://tips.ojapp.app/)** is an independent technical blog about Progressive Web Apps, home screen experiences, Web App Manifests, and practical web development.

I explore how websites behave as apps across browsers and operating systems, document real-world tests, and share both successful implementations and unexpected behavior.

### Built with OJapp Blog Kit

This site runs on **OJapp Blog Kit**, a lightweight static blog engine I built for publishing Markdown articles on my own domain.

The goal isn't to replace every feature of WordPress. It's to make writing and publishing simpler while keeping ownership of the content, code, and website.

**Write freely. Own what you build.**

Learn more: [OJapp Blog Kit](https://blogkit.ojapp.app/)

### Explore OJapp

OJapp also develops tools for turning web pages into home screen apps, building personal app-like pages, and experimenting with new ways to use the web.

- [OJapp official website](https://ojapp.app/)
- [OJapp Tips](https://tips.ojapp.app/)
- [Petal](https://ojapp.app/petal/)

### ⭐ Star this repository

If you find the articles or experiments useful, **please consider starring this repository**. Think of it as a like for the entire Tips project rather than for a single article.

---

<div align="center">

**OJapp Tips** · [Read the blog](https://tips.ojapp.app/) · [Explore OJapp](https://ojapp.app/)

*Write freely. Own what you build.*

</div>
