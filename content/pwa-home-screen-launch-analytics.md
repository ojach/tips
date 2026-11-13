PWAをホーム画面に追加してもらったあと、本当にそこから再訪されているのか。</p>

これ、普通のアクセス解析だけを見ていると意外と分かりません。

ページビューは増えていても、Google検索から来たのか、ブックマークなのか、ホーム画面のアイコンを押して戻ってきたのかが混ざってしまいます。

そこで使えるのが、前の記事でも使った `display-mode: standalone` の判定です。**ホーム画面からPWAとして起動している時だけ、専用のイベントを送る**ようにすれば、通常のアクセスとは分けて計測できます。

## UTMだけではホーム画面起動を正確に分けにくい

アクセス元を分ける方法として、まず思い浮かぶのがUTMパラメータです。

```text
https://example.com/?utm_source=homescreen&utm_medium=pwa
```

これをPWAの `start_url` に入れておけば、ホーム画面から起動したアクセスへ印を付けることはできます。

ただし、UTMはあくまで**URLに付いている情報**です。

そのURLがコピーされたり、ブラウザから直接開かれたりすれば、PWA起動ではないアクセスにも同じUTMが付きます。

逆に、PWA内部で別ページへ移動した後のアクセスには、最初のUTMがそのままURLへ付いているとは限りません。

つまりUTMは「どのURLから入ったか」を見るには便利ですが、**今このページがホーム画面からPWAとして動いているか**を直接判定しているわけではありません。

<div class="balloon balloon-boder">
<figure class="balloon__img balloon__img-left">
<div><img src="/images/appin2.webp" alt=""></div>
<figcaption class="balloon__name">アッピン</figcaption></figure>

<div class='balloon__text balloon__text-right'>UTMは「URLについた名札」、standalone判定は「今どう開かれているか」の確認だよ。似てるけど役割が違う👻</div>
</div>

## ホーム画面起動はstandaloneで判定する

基本になる判定はこれです。

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;
```

`display-mode: standalone` に一致しているかを確認し、iPhone向けに `navigator.standalone` も合わせて見ています。

この判定を使えば、通常のブラウザ表示と、ホーム画面側のPWA表示を分けられます。

実際にPWA LABでも、通常のWeb表示では `WEB`、standalone状態では `PWA` と画面上へ表示する形で確認してきました。

判定そのものについては、[PWAの状態を確認する方法｜MODE・Service Worker・Installableの意味](https://tips.ojapp.app/pwa-status-check/)でも紹介しています。

## GA4へホーム画面起動イベントを送る

Google Analytics 4を使っているなら、standalone判定がtrueの時だけカスタムイベントを送れば分かりやすいです。

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

if (isPWA && typeof gtag === 'function') {
  gtag('event', 'pwa_home_launch', {
    page_path: location.pathname,
    page_title: document.title
  });
}
```

これでGA4側には、

```text
pwa_home_launch
```

というイベントが送られます。

通常のブラウザから開いた時はイベントを送らず、PWAとしてstandaloneで動いている時だけ送ります。

これならページビューとは別に、**ホーム画面を入口として使われたアクセス**を確認できます。

## ただし、そのままだとページ移動でもイベントが増えることがある

ここは実装するときに注意したいところです。

先ほどのコードをサイト内の全ページへ入れると、PWA内でページを移動するたびにJavaScriptが実行され、`pwa_home_launch` が送られる可能性があります。

でも本当に知りたいのが「ホーム画面のアイコンから起動された回数」なら、サイト内ページ移動まで全部起動回数として数えるのは違います。

簡単な対策として、1回の利用中は一度だけ送る方法があります。

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;

const alreadyTracked =
  sessionStorage.getItem('pwa_launch_tracked');

if (isPWA && !alreadyTracked && typeof gtag === 'function') {
  gtag('event', 'pwa_home_launch', {
    page_path: location.pathname,
    page_title: document.title
  });

  sessionStorage.setItem('pwa_launch_tracked', '1');
}
```

これなら同じセッション中にページを移動しても、何度もイベントを送るのを抑えられます。

ただし、これも「OSが記録している厳密なアプリアイコンタップ回数」を取得しているわけではありません。

**standalone状態で始まったWeb利用を、Web側から計測している**と考えるのが正確です。

## ページごとに計測すると1P1Aとも相性がいい

ホーム画面起動を計測する時、イベントと一緒に `page_path` を送っておくとかなり面白くなります。

```text
gtag('event', 'pwa_home_launch', {
  page_path: location.pathname,
  page_title: document.title
});
```

例えば、

- 商品ページAはホーム画面から50回起動された
- 予約ページは120回起動された
- Webツールは300回起動された
- 記事ページはほとんど起動されていない

といった違いが見えてきます。

これは、ページ単位でホーム画面へ置く[1P1A（One Page. One App.）](https://tips.ojapp.app/1p1a-2/)とも相性がいい考え方です。

単純なPVだけでは「どのページがホーム画面に残す価値を持っているか」は分かりにくいですが、ホーム画面起動をページ別に見ると、そのページが再訪の入口として実際に使われているかを確認できます。

## PVとホーム画面起動は意味が違う

例えば同じ100PVでも、意味はかなり違います。

<table>
<thead>
<tr><th>指標</th><th>分かること</th></tr>
</thead>
<tbody>
<tr><td>Page View</td><td>ページが表示された回数</td></tr>
<tr><td>流入元</td><td>検索・SNS・参照サイトなど、どこから来たか</td></tr>
<tr><td>UTM</td><td>指定したキャンペーンやURL経由のアクセス</td></tr>
<tr><td>PWA Home Launch</td><td>standalone状態でホーム画面側から利用された回数</td></tr>
</tbody>
</table>

検索から100回来たページと、ホーム画面から100回開かれたページでは、ユーザーとの関係がかなり違います。

後者は、一度そのページをホーム画面へ残し、あとから自分で戻ってきている可能性があります。

私はPWAを作っていく中で、PVだけを見るより<strong>「ホーム画面が本当に再訪入口になっているか」</strong>を見る方が、PWAの価値を測るには自然だと感じるようになりました。

## 自前APIへ送ればGA4を使わなくても計測できる

GA4を使わず、自分のAPIへ直接記録することもできます。

```text
if (isPWA) {
  fetch('/api/pwa-launch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: location.pathname,
      timestamp: Date.now()
    })
  });
}
```

サーバー側で記録すれば、独自のダッシュボードを作ったり、ページ別・OS別に集計したりできます。

OJapp PROでも、この考え方を発展させてHome Screen Launchesを計測しています。通常のアクセス解析ではなく、ホーム画面という入口に焦点を当てて「そこから戻ってきたか」を見るための指標です。

ホーム画面を単なるアイコン置き場ではなく再訪導線として考える考え方については、[ホーム画面マーケティングとは？PWAで「ページを届ける」という新しいWeb戦略](https://tips.ojapp.app/home-screen-marketing/)でも詳しく書いています。

## 個人を特定しなくても十分使える

ホーム画面起動を分析するからといって、必ずしも「誰が開いたか」まで記録する必要はありません。

例えば、

- 起動回数
- ページ
- OS
- 日時

程度でも、「ホーム画面という入口が実際に使われているか」を見るにはかなり役立ちます。

むしろPWAの再訪分析では、まず**ホーム画面に置かれたあと、本当にそこから戻ってきているのか**が分かれば十分なケースも多いと思います。

## ホーム画面は「置かれた数」より「戻ってきた数」を見たい

PWAをホーム画面へ追加してもらうと、どうしてもインストール数のような数字を知りたくなります。

でも個人的には、それ以上に重要なのがその後です。

ホーム画面に置かれても、一度も開かれなければ入口としては機能していません。

逆に、追加された数が少なくても、何度もそこから起動されているなら、そのページはホーム画面に残る価値を持っています。

UTMで「どこから来たか」を見る。

PVで「何回見られたか」を見る。

そしてstandalone判定で、 **「ホーム画面から戻ってきたか」を見る。**

PWAをホーム画面という再訪導線として使うなら、この3つは分けて考えた方が分かりやすいです。

ホーム画面へ追加できるだけで終わらせず、その入口が本当に使われているかまで見えるようになると、PWAの運用はかなり面白くなってきます。
