はてなブログを、スマートフォンやPCへインストールできるアプリのようにしてみました。</p>

必要なのは、はてなブログの設定画面へアイコン指定とスクリプトの2行を追加するだけです。`manifest.json`を作成したり、サーバーへファイルをアップロードしたりする必要はありません。

この記事では、無料で利用できるOJapp FREEを使って、開いている記事をそのままPWAとしてホーム画面へ追加できるようにする手順を紹介します。

## 完成するとどうなる？

設定後に対応ブラウザでブログを開くと、インストールボタンからブログをアプリとして追加できるようになります。

<figure>
  <img src="/images/tips-20260906-103144.webp" alt="はてなブログにOJappを導入した後のアプリインストール画面">

<figcaption>はてなブログで実際に表示されたインストール画面</figcaption>

</figure>

インストール後は、設定した名前とアイコンでホーム画面やアプリ一覧から起動できます。

## 設定方法

### 1. はてなブログの設定を開く

はてなブログの管理画面から「設定」を開き、「詳細設定」を選択します。

<figure>
  <img src="/images/tips-20260906-103231.webp" alt="はてなブログ管理画面の設定と詳細設定">

<figcaption>「設定」から「詳細設定」を開きます</figcaption>

</figure>

### 2. headへスクリプトを追加する

詳細設定ページを下へ進むと、「&lt;head&gt;要素にメタデータを追加」という入力欄があります。

アイコン画像のURLを指定するmetaタグと、OJappのスクリプトを貼り付けます。

```html
<meta name="ojapp:icon" content="https://example.com/icon.png">
<script src="https://ojapp.app/js/ojapp_1p1a.js"></script>
```

`https://example.com/icon.png`の部分は、自分で用意した正方形画像のURLへ置き換えてください。はてなブログではこのアイコン指定が必要です。

<figure>
  <img src="/images/tips-20260906-103246.webp" alt="はてなブログのhead要素にOJappのコードを追加する画面">

<figcaption>「&lt;head&gt;要素にメタデータを追加」へOJappのコードを貼り付けます</figcaption>

</figure>

貼り付けたら、ページ下部の「変更する」を押して保存します。これで基本設定は完了です。

## アプリ名も指定できる

アプリ名も指定したい場合は、OJappのスクリプトより前に`ojapp:title`を追加します。

```html
<meta name="ojapp:title" content="ブログのアプリ名">
<meta name="ojapp:icon" content="https://example.com/icon.png">
<script src="https://ojapp.app/js/ojapp_1p1a.js"></script>
```

`ojapp:title`にはアプリとして表示したい名前、`ojapp:icon`には必須の正方形画像のURLを指定します。

画像は、自分が権利を持っているもの、または利用許可を得ているものを使用してください。安定して表示するためにも、自分で管理している画像URLの利用をおすすめします。

## インストールできるか確認する

保存後にブログを開き、ブラウザの再読み込みを行います。PC版Chromeではアドレスバー付近のインストールボタン、Androidではブラウザメニューなどから確認できます。

iPhoneではSafariの共有メニューから「ホーム画面に追加」を選択します。端末やブラウザによって、追加ボタンの位置やインストール画面の表示は異なります。

## はてなブログでは1P1Aがおすすめ

1P1A（One Page. One App.）は、現在開いているページをアプリの起動ページにします。

```html
<meta name="ojapp:icon" content="https://example.com/icon.png">
<script src="https://ojapp.app/js/ojapp_1p1a.js"></script>
```

そのため、記事を読んでいる状態でホーム画面へ追加すると、あとからそのアイコンを開いたときも同じ記事から再開できます。

サイト全体を1つのアプリにする1S1Aでは、どの記事から保存しても起動先がブログのトップページになります。読んでいた記事をそのまま残したい場合は、1P1Aの方がはてなブログと相性のよい使い方です。

ただし、詳細設定のhead欄へ書いたコードやアプリ名、アイコンはブログ全体に共通で出力されます。また、トップページを先にアプリとして追加すると、ブラウザによっては配下の記事も同じアプリ領域として扱われ、記事ごとに複数追加しにくくなる場合があります。記事を個別に残したい場合は、追加したい記事を直接開いてホーム画面へ追加してください。

### 記事の概要欄へmetaタグを書いても個別設定にはならない

<figure>
  <img src="/images/tips-20260906-105404.webp" alt="はてなブログの記事編集画面にあるSEO・SNS向け設定の記事の概要欄">

<figcaption>「記事の概要」は任意のmetaタグを追加する欄ではありません</figcaption>

</figure>

記事編集画面の「SEO・SNS向け設定」にある「記事の概要」は、検索結果やSNSで使われる説明文を設定する欄です。ここへ`<meta name="ojapp:icon" ...>`を書いても、OJapp用のmetaタグとしてheadへ追加されるわけではありません。

また、記事ごとに設定したアイキャッチ画像はSNS向けの`og:image`には反映されますが、OJappの`ojapp:icon`として自動的に利用されません。

今回の方法では、アプリ名とアイコンはブログ共通のまま、起動ページだけを記事ごとに変える使い方になります。

## はてなブログは2行でPWA化できる

はてなブログには、headへmetaタグやスクリプトを追加するための設定が公式に用意されています。そのため、アイコン指定とOJapp FREEのスクリプトを追加するだけで、好きな記事をその記事から起動するPWAとしてホーム画面へ置けるようになります。

```html
<meta name="ojapp:icon" content="https://example.com/icon.png">
<script src="https://ojapp.app/js/ojapp_1p1a.js"></script>
```

静的な`manifest.json`の作成、ビルド作業、外部APIへの登録は不要です。まずは自分のブログで、実際のインストール表示を確認してみてください。

OJapp FREEの詳しい仕様やオプションは、以下のページで確認できます。

[OJapp FREEの詳細を見る](https://ojapp.app/one-page-one-app/)

ホーム画面からの起動解析や、再訪した読者への新着記事・限定案内の表示には、OJapp PROを利用できます。

[OJapp PROの詳細を見る](https://ojapp.app/pro/)
