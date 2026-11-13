PWAがホーム画面から開かれたか判定できるようになると、その次にやりたくなるのが<strong>「ホーム画面から開いた時だけ表示を変える」</strong>ことです。</p>

通常のブラウザでは普通のWebサイト。でもホーム画面のアイコンから開いた時だけ、専用メニューを出したり、「おかえりなさい」と表示したり、限定案内を見せたりする。

実装自体は難しくありません。前回使った `display-mode: standalone` の判定結果を、そのまま表示切り替えに使えます。

私も最初はPWAかどうかを確認するためだけにこの判定を使っていましたが、実際に触っていると「判定できるなら、ホーム画面から戻ってきた人だけ体験を変えられるやん」となりました。ここからPWAの使い方がかなり面白くなります。

## まずはホーム画面起動を判定する

基本になるコードはこれです。

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;
```

`matchMedia('(display-mode: standalone)')` でstandalone表示を確認し、iPhone向けとして `navigator.standalone` も合わせています。

この判定については、[PWAの状態を確認する方法｜MODE・Service Worker・Installableの意味](https://tips.ojapp.app/pwa-status-check/)でも実機確認を含めて紹介しています。

あとは `isPWA` がtrueの時だけ、好きな処理を実行すればOKです。

## ホーム画面から開いた時だけ要素を表示する

例えば、こんな案内を用意するとします。

```html
<div id='pwa-message' hidden>
  ホーム画面からのアクセスありがとうございます！
</div>
```

最初は `hidden` を付けて非表示にしておきます。

そしてJavaScript側で、PWAとして開かれている時だけ表示します。

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  document.getElementById('pwa-message').hidden = false;
}
```

これだけです。

通常のSafariやChromeからページを開いても表示されません。

ホーム画面へ追加したPWAをstandalone状態で起動すると、その時だけメッセージが現れます。

<div class="balloon balloon-boder">
  

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>
  <div class="balloon__text balloon__text-right">
    ここがポイント！「PWA専用ページ」を別に作らなくても、同じページの中で表示するものだけ変えられるよ👻
  </div>
</div>

## ブラウザでは「ホーム画面に追加」、PWAでは消すこともできる

逆の使い方もできます。

例えば通常のWeb表示では、

```html
<div id='install-guide'>
  このページをホーム画面に追加するとすぐ開けます。
</div>
```

という案内を出しておきます。

すでにPWAとして起動している時は、この案内を消します。

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  document.getElementById('install-guide').hidden = true;
}
```

これはかなり自然な使い方です。

すでにホーム画面から開いている人に「ホーム画面に追加してください」と表示しても意味がありません。

通常のWebユーザーには追加案内を見せて、ホーム画面ユーザーには消す。同じページでも入口によってUIを変えられます。

## 限定案内やクーポンにも使える

もう少し応用すると、ホーム画面から戻ってきたユーザーだけに案内を出すこともできます。

```html
<div id='home-offer' hidden>
  ホーム画面からのアクセス限定：次回使えるクーポンはこちら
</div>
```

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  document.getElementById('home-offer').hidden = false;
}
```

使い方としては、

- ホーム画面ユーザー向けのクーポン
- 再訪した人への限定案内
- 新しい機能のお知らせ
- 予約ページへのショートカット
- お気に入りユーザー向けのメッセージ
- PWA専用ナビゲーション

などが考えられます。

ホーム画面へ置くこと自体を顧客との接点として考える方法については、[ホーム画面マーケティングとは？PWAで「ページを届ける」という新しいWeb戦略](https://tips.ojapp.app/home-screen-marketing/)でも書いています。

## 「通知を送る」のとは少し違う

この方法の面白いところは、こちらからユーザーを呼び戻す必要がないことです。

Push通知なら、サービス側からユーザーへ情報を送ります。

今回の方法は逆です。

1. ユーザーがページをホーム画面へ置く
2. 必要になった時に自分でアイコンをタップする
3. その起動を判定する
4. 戻ってきた瞬間だけ案内を出す

つまり、ユーザーが自分から戻ってきた時だけ表示する仕組みです。

OJapp PROでもこの考え方を使っていて、通常のWeb訪問者全員へポップアップを出すのではなく、ホーム画面からPWAとして起動した時だけOfferを表示する設計にしています。

Pushのように「こちらから届ける」のではなく、**戻ってきた人にその場で何かを返す**という考え方です。

## CSSのclassを切り替えるとページ全体も変えられる

1つの要素だけではなく、ページ全体のデザインを変えたい場合は、`body` にclassを付ける方法も便利です。

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  document.body.classList.add('pwa-mode');
}
```

そしてCSS側で、

```css
.pwa-only {
  display: none;
}

.pwa-mode .pwa-only {
  display: block;
}

.pwa-mode .web-only {
  display: none;
}
```

とすれば、HTML側は、

```html
<div class='web-only'>
  ブラウザでだけ表示
</div>

<div class='pwa-only'>
  PWAでだけ表示
</div>
```

のように書けます。

表示箇所が増えてくると、要素を1個ずつJavaScriptで操作するより、この方法の方が管理しやすいです。

## ただし「秘密の情報」を隠す方法には使わない

ここはかなり重要です。

`display-mode` を使った表示切り替えは、UXを変えるためのものです。

**セキュリティ機能ではありません。**

例えばHTML内に本物のクーポンコードや非公開情報を書いて、CSSやJavaScriptで見えなくしているだけなら、ページのソースや開発者ツールなどから内容を確認できる可能性があります。

そのため、

- 絶対に漏れてはいけないクーポン
- 会員限定データ
- 個人情報
- 認証が必要なコンテンツ

などを守る目的でこの判定を使ってはいけません。

本当にアクセス制御が必要なら、ログイン状態やサーバー側の認証など別の仕組みが必要です。

`isPWA` はあくまで、 **「今どう開かれているか」に合わせて見せ方を変えるための条件**です。

## ホーム画面ユーザーだけ少し違う体験にできる

PWAをホーム画面へ追加するメリットは、単にアイコンが置けることだけではありません。

ホーム画面から起動していることを判定できれば、通常のWeb訪問とは少し違う体験を作れます。

個人的には、ここがかなり面白い部分だと思っています。

検索から初めて来た人と、一度ページを気に入ってホーム画面へ置き、後日自分から戻ってきた人。この2人にまったく同じ案内を見せる必要はありません。

[PWAのメリットをユーザー側から考える記事](https://tips.ojapp.app/pwa-user-benefits/)でも触れていますが、ホーム画面は「また使いたい」という意思を残せる場所でもあります。

基本はたったこれだけです。

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA) {
  // ホーム画面側だけで実行したい処理
}
```

この数行から、ホーム画面だけのメニュー、案内、クーポン、起動時メッセージなど色々な使い方へ広げられます。

**WebとPWAで別々のページを作らなくてもいい。同じページを、入口に合わせて少しだけ変える。**

これができると、PWAは「ホーム画面にアイコンを置く機能」から、その先のUXを作る仕組みに変わってきます。
