PWAを作っていると、「今このページは普通のブラウザから見られているのか、それともホーム画面から開かれたのか」を判定したくなることがあります。</p>

例えば、ホーム画面から開いた時だけ案内を変えたり、PWA起動だけをアクセス解析したりする場合です。

この判定は、JavaScriptの `matchMedia()` を使うとかなり簡単にできます。

基本になるのが、<strong>`(display-mode: standalone)`</strong> です。

## 一番シンプルな判定方法

まずはこれだけです。

```js
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

if (isStandalone) {
  console.log('PWAとして起動');
} else {
  console.log('通常のWeb表示');
}
```

`window.matchMedia()` は、CSSのMedia Queryと同じような条件をJavaScriptから確認できる仕組みです。

ここでは、

```text
(display-mode: standalone)
```

という条件に現在の表示状態が一致しているかを見ています。

`.matches` が `true` ならstandalone表示、`false` ならそれ以外です。

## display-mode: standaloneとは？

PWAのWeb App Manifestでは、`display` を使って起動時の表示方法を指定できます。

```json
{
  "display": "standalone"
}
```

`standalone` は、通常のブラウザUIを減らし、独立したアプリのような画面でWebページを表示するモードです。

つまり、Manifest側でstandaloneを指定したPWAをホーム画面などから起動すると、JavaScript側でも `(display-mode: standalone)` に一致する状態になります。

表示モードそのものについては、[display: fullscreenは実用的なのか？iPhoneとAndroidで比較した記事](https://tips.ojapp.app/pwa-display-fullscreen-iphone-android/)でも実機で確認しています。

## PWA LABでは画面上に「PWA / WEB」を表示して確認した

私がPWA LABを作った時も、この判定をそのまま使いました。

ただconsoleへ出すだけでは確認しづらかったので、画面上へ現在の状態を表示するようにしています。

```js
const pwaStatus =
  document.getElementById('pwa-status');

const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches;

if (isStandalone) {
  pwaStatus.textContent = 'PWA';
} else {
  pwaStatus.textContent = 'WEB';
}
```

通常のブラウザから開けば、

```text
WEB
```

ホーム画面からstandaloneで起動すれば、

```text
PWA
```

と表示されます。

かなり単純なコードですが、実機検証ではこれが便利でした。

「PWAになっているはず」と思いながらデバッグするより、今どのモードで動いているのかを画面に出してしまった方が圧倒的に分かりやすいです。

PWAの状態確認については、[PWAの状態を確認する方法｜MODE・Service Worker・Installableの意味](https://tips.ojapp.app/pwa-status-check/)でもまとめています。

## iPhoneも考えるならnavigator.standaloneを追加する

iPhoneでのホーム画面起動も含めて判定するなら、もう1つ追加しておくと扱いやすくなります。

```js
const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches;

const isIOSPWA =
  window.navigator.standalone === true;

if (isStandalone || isIOSPWA) {
  console.log('ホーム画面側の表示');
} else {
  console.log('通常のブラウザ表示');
}
```

`navigator.standalone` はiOS系で使われてきた判定方法です。

そのため実際に使うコードでは、

```js
window.matchMedia('(display-mode: standalone)').matches
||
window.navigator.standalone === true
```

のように両方を見る形にしておくと分かりやすいです。

PWA LABでもこの2つを合わせて、iPhoneとそれ以外の環境をまとめて判定しています。

## 関数にしておくと使いやすい

何度か判定するなら、関数にしてしまうのが楽です。

```js
function isPWA() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  );
}

if (isPWA()) {
  console.log('PWA MODE');
} else {
  console.log('WEB MODE');
}
```

これなら後から、

```text
if (isPWA()) {
  // PWAの時だけ実行
}
```

という形で好きな処理へ使えます。

次に何をするかと、PWAかどうかを判定する処理を分けられるので、コードもかなり見やすくなります。

## これは「インストールされているか」を調べるコードではない

ここは結構重要です。

`(display-mode: standalone)` で分かるのは、**現在のページがstandalone表示として動いているか**です。

「このユーザーは過去にホーム画面へ追加したことがあるか」を調べているわけではありません。

例えば通常のブラウザで同じURLを開けば、端末にPWAが存在していても、そのブラウザタブ自体はstandaloneではありません。

逆にホーム画面やインストール済みWebアプリの入口から起動し、standaloneとして表示されていれば判定はtrueになります。

なので、

- ホーム画面へ追加済みかを記録する
- インストールされた回数を数える
- 誰がホーム画面へ置いているか調べる

といった用途とは別物です。

**「今、このページがどの表示モードで開かれているか」を判定するコード**と考えるのが正確です。

## 普通のWeb表示とPWA表示で処理を分けられる

この判定ができると、PWAの使い方が一気に広がります。

例えば、

- ブラウザでだけ「ホーム画面に追加」の案内を出す
- ホーム画面から開いたら案内を消す
- PWA起動時だけ専用メニューを表示する
- PWA起動だけアクセス解析へ送る
- ホーム画面ユーザーだけに限定案内を表示する

といった使い分けができます。

私自身、最初は単純に「PWAになっているか確認するため」にこの判定を入れました。

でも使ってみると、これはデバッグ用だけではなく、**Webから見た時とホーム画面から見た時でUXを変えるための入口**になることに気付きました。

Web App Manifestの `display` がどう効くのかは、[PWAに必要なmanifest.jsonの基本](https://tips.ojapp.app/pwa-manifest-json-basics/)も合わせて見ると分かりやすいと思います。

## 最後は実機で確認した方がいい

コード自体は数行ですが、PWAはOSやブラウザによって挙動が違います。

PWA LABでも、Android ChromeとiPhoneでは同じManifestを書いても表示結果がかなり違う場面がありました。

そのため判定コードを入れたら、

1. 通常のブラウザから開く
2. ホーム画面へ追加する
3. ホーム画面のアイコンから起動する
4. 判定結果を確認する

という流れで一度実機確認するのがおすすめです。

基本形はこれだけ覚えておけば十分です。

```js
const isStandalone =
  window.matchMedia('(display-mode: standalone)').matches;
```

iPhoneもまとめて扱うなら、

```js
const isPWA =
  window.matchMedia('(display-mode: standalone)').matches ||
  window.navigator.standalone === true;
```

**普通のWebなのか、ホーム画面から起動したPWAなのか。**

これを判定できるだけで、同じWebページでもホーム画面向けの体験をかなり作りやすくなります。
