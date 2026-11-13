![PWA Marketing で実際にホームに追加させたデモページ](img_1637.jpg)

PWA（Progressive Web Apps）という言葉を聞いたことはあっても、

「結局、WordPressで何ができるの？」

そう思ったことはありませんか？

最近ではWordPress向けのPWAプラグインも増えてきました。

しかし、実際に導入するメリットや、どんなサイトに向いているのかまで詳しく書かれている記事はあまり多くありません。

この記事では、PWAプラグインでできることや活用例、そして私が **OJapp PWA Marketing** を開発した理由について紹介します。



## PWAプラグインとは

PWAプラグインとは、

**WordPressサイトへPWA（Progressive Web Apps）機能を追加するプラグイン**です。

導入すると、

- ホーム画面へ追加
- アプリのような表示
- ホーム画面アイコン
- manifest.jsonの生成

など、PWAに必要な機能を簡単に導入できます。

これまでは手作業で設定する必要がありましたが、プラグインを使えば比較的簡単に導入できるようになります。



## 従来のWordPress PWAプラグインとOJapp PWA Marketingの違い

一般的なPWAは、

<strong data-start="173" data-end="192">サイト全体を一つのアプリにする</strong>

という考え方です。

例えばブログなら、ホーム画面へ追加すると、どの記事から追加してもトップページから始まることが多くあります。

これは企業サイトやポータルサイトには非常に相性の良い設計です。

一方で、WordPressのPWAプラグインは「PWAの仕組み」をそのまま設定するものが多く、初心者には少しハードルが高いという面もありました。

<div class="group TyagGW_tableContainer">
<div class="TyagGW_tableWrapper flex flex-col-reverse w-fit" tabindex="-1">

<table class="w-fit min-w-(--thread-content-width)" data-start="367" data-end="723">
<thead data-start="367" data-end="411">
<tr data-start="367" data-end="411">
<th class="last:pe-10" data-start="367" data-end="374" data-col-size="sm">比較項目</th>
<th class="last:pe-10" data-start="374" data-end="388" data-col-size="sm">従来のPWAプラグイン</th>
<th class="last:pe-10" data-start="388" data-end="411" data-col-size="sm">OJapp PWA Marketing</th>
</tr>
</thead>
<tbody data-start="468" data-end="723">
<tr data-start="468" data-end="507">
<td data-start="468" data-end="475" data-col-size="sm">基本設計</td>
<td data-col-size="sm" data-start="475" data-end="490">サイト全体を1つのアプリ</td>
<td data-col-size="sm" data-start="490" data-end="507">1ページごとを1つのアプリ</td>
</tr>
<tr data-start="508" data-end="537">
<td data-start="508" data-end="515" data-col-size="sm">アイコン</td>
<td data-col-size="sm" data-start="515" data-end="523">サイト共通</td>
<td data-col-size="sm" data-start="523" data-end="537">ページごとに自動生成</td>
</tr>
<tr data-start="538" data-end="576">
<td data-start="538" data-end="546" data-col-size="sm">起動ページ</td>
<td data-col-size="sm" data-start="546" data-end="558">トップページが中心</td>
<td data-col-size="sm" data-start="558" data-end="576">追加したページをそのまま起動</td>
</tr>
<tr data-start="577" data-end="633">
<td data-start="577" data-end="582" data-col-size="sm">設定</td>
<td data-col-size="sm" data-start="582" data-end="617">manifest・Service Workerなど専門用語が多い</td>
<td data-col-size="sm" data-start="617" data-end="633">投稿を書くだけで自動設定</td>
</tr>
<tr data-start="634" data-end="674">
<td data-start="634" data-end="643" data-col-size="sm">アイコン画像</td>
<td data-col-size="sm" data-start="643" data-end="658">自分で用意することが多い</td>
<td data-col-size="sm" data-start="658" data-end="674">アイキャッチから自動生成</td>
</tr>
<tr data-start="675" data-end="723">
<td data-start="675" data-end="690" data-col-size="sm">ホーム画面マーケティング</td>
<td data-col-size="sm" data-start="690" data-end="700">想定していない</td>
<td data-col-size="sm" data-start="700" data-end="723">ページ単位でリピーター獲得を目的に設計</td>
</tr>
</tbody>
</table>

</div>
</div>

そのため、PWAを導入したいだけなのに、

- `manifest.json`
- `Service Worker`
- `scope`
- `start_url`
- `display`

    
    
    
    
    

といった専門用語を理解する必要があり、初心者には少し難しく感じられることもありました。

OJapp PWA Marketingは、そうした設定を意識しなくても、WordPressの記事や固定ページをそのままホーム画面へ追加できるよう設計されています。



## OJapp PWA Marketingはページ単位で考える

私が開発した **OJapp PWA Marketing** は、

少し違う考え方で作っています。

例えば、

- ブログ記事
- 固定ページ
- WooCommerceの商品ページ

これらを、

**ページ単位でホーム画面へ追加**

できるようにしています。

つまり、

お気に入りの記事や商品ページを、そのままホーム画面へ置けるという考え方です。

私はこれを、

**One Page. One App.**

という設計思想で開発しています。

関連記事

<a href="https://tips.ojapp.app/pwa-1s1a-vs-1p1a/" target="_blank" rel="noopener">**PWAの二極化：トップへ還る「1S1A」と、全ページをアプリ化する「1P1A」** </a>



## ホーム画面へ追加できることで何が変わるのか

ここはサイトによって変わります。

### ブログ

お気に入りの記事をホーム画面へ追加できます。

検索し直す必要がなくなり、

読み返したい記事へすぐアクセスできます。



### ECサイト

気になる商品ページをホーム画面へ追加できます。

あとで購入したい商品や、

比較したい商品をすぐ開けます。



### 飲食店

ランチメニューやテイクアウトページをホーム画面へ。

何度も使うページとの相性は抜群です。



### 美容室・サロン

予約ページをホーム画面へ追加できます。

電話番号や営業時間を探す手間も減ります。



### SaaS・会員サイト

ログインページやダッシュボードをホーム画面へ追加できます。

毎日利用するサービスほど効果を感じやすいでしょう。



## マーケティングにはどう影響するのか

ここはまだ発展途上の分野ですが、とても面白い可能性があります。

ホーム画面へ追加されるということは、

検索結果でもなく、

ブックマークでもなく、

**スマートフォンのホーム画面**

という場所へ置かれることになります。

つまり、

ユーザーが再訪問するときの導線が一つ増えることになります。

もちろん、

それだけでCVR（コンバージョン率）が上がるとは言えません。

CVRは、

商品の魅力、

価格、

導線、

デザイン、

さまざまな要素が影響します。

しかし、

ホーム画面という日常的に目に入る場所へ配置されることで、

再訪問のきっかけが増える可能性は十分にあります。

私は、この考え方を

**ホーム画面マーケティング**

と呼んでいます。



## ホーム画面からのアクセス解析（GA4連携＆専用ダッシュボード）

「ホーム画面へ追加できるようにしたけれど、実際に使われているの？」

一般的なPWAプラグインの場合、起動URLにUTMパラメータ（`?utm_source=pwa` など）を付与してGA4でアクセス数だけをざっくり確認するくらいしかできません。しかし、これだけでは「インストール数（ホーム画面に追加された回数）」や「端末ごとの起動率」といった本当に知りたいデータまでは追えないのが現状です。

そこで OJapp PWA Marketing では、PRO機能として一歩踏み込んだ計測機能を備えています。

### 1. WordPress内の専用ダッシュボードで一目瞭然

GA4を開いて複雑なカスタムレポートを作らなくても、管理画面だけで以下のデータが直感的に分かります。
- **ホーム画面に追加された回数（インストール数）**
- **そこからの起動回数（起動率）**
- **OSごとの割合（iOS / Android）**
- **どのページ（商品）が一番ホーム画面に置かれているか**

### 2. GA4への自動カスタムイベント送信

UTMパラメータによる簡易計測にとどまらず、GA4に専用のカスタムイベント（`ojapp_pwa_launch` や `ojapp_pwa_installed`）を自動送信します。
OS判定データも一緒に記録されるため、いつものGA4レポート上で「ホーム画面から再訪問したユーザーのコンバージョン貢献度」まで細かく分析可能です。

単に「PWA化して終わり」ではなく、データを見ながら「どの商品ページがホーム画面に置かれやすいか」を把握し、サイト改善やマーケティング施策にしっかり活かすことができます。
![](img_1656.jpg)

## なぜOJapp PWA Marketingを作ったのか

最初は、

一般的なPWAのように

**サイト全体をアプリ化する**

ことを考えていました。

しかし、検証を重ねる中で気付いたことがあります。

実際のWebサイトでは、

サイト全体よりも、

**ページそのものに価値がある**

ケースが非常に多いということです。

例えば、

- お気に入りの記事
- よく見る商品
- 予約ページ
- ツールページ

これらは、

サイト全体ではなく、

**そのページだけをホーム画面へ置きたい**

ことが多くあります。

そこで、

ページ単位でホーム画面へ追加できるWordPressプラグインとして、

OJapp PWA Marketingを開発しました。
![](img_1657.jpg)

## WordPressサイトに新しい導線を

PWAは、

単に「アプリっぽくする技術」ではありません。

ホーム画面という、

ユーザーが毎日目にする場所へ、

Webページを届けるための技術でもあります。

記事、

商品、

予約ページ、

サービスページ。

ページ単位で考えることで、

これまでとは違ったWebサイトの使われ方が生まれるかもしれません。

もしWordPressでPWAを検討しているなら、

ぜひ一度 **OJapp PWA Marketing** を試してみてください。
[PWA Marketing WPプラグインページはこちら](https://ja.wordpress.org/plugins/ojapp-pwa-marketing/)
